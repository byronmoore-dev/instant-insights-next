"use server";

import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { ChartType, CreateChartOpenAiProps, PotentialInsightProps, ViewProps } from "@/types/general";
import { getChartGPTFunction, getChartSysPrompt } from "./gptContstants";
import { fetchFileFromS3 } from "./fetchS3";

// export const runtime = "edge";

const MODEL_NAME = "gpt-3.5-turbo-16k";
const TEMPERATURE = 0.8;

type GPTCompletionProp = {
  insight: string;
  chartType: ChartType;
  data: any;
};

type RequestBody = {
  item: PotentialInsightProps;
  viewData: ViewProps;
};

type SaveToSupabaseProps = { openai: any; viewID: string; tokens: any; baseInsight: PotentialInsightProps };

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

export async function POST(req: Request, res: NextResponse) {
  try {
    const json: RequestBody = await req.json();

    if (!json.viewData.input_data_name) throw Error("Missing view data name.");

    const stringified_data = await fetchFileFromS3(json.viewData.input_data_name);
    const { tokensUsed, openAiResponse } = await fetchChatCompletionFromOpenAI({
      insight: json.item.insight,
      chartType: json.item.chartType,
      data: stringified_data,
    });

    await saveToSupabase({
      openai: openAiResponse,
      viewID: json.viewData.id,
      tokens: tokensUsed,
      baseInsight: json.item,
    });

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500, statusText: error.message });
  }
}

const fetchChatCompletionFromOpenAI = async ({ insight, chartType, data }: GPTCompletionProp) => {
  const gptFunction = getChartGPTFunction.find((chart) => chart.name === chartType);

  if (!gptFunction) throw new Error("Invalid chart type.");

  const openai_res_insights = await openai.createChatCompletion({
    model: MODEL_NAME,
    temperature: TEMPERATURE,
    stream: false,
    messages: getMessageFormat(insight, chartType, data),
    functions: [gptFunction],
    function_call: { name: chartType },
  });

  const tokensUsed = openai_res_insights?.data?.usage?.total_tokens;
  const openaiLastMessage = openai_res_insights?.data?.choices[0]?.message;

  if (!openaiLastMessage?.function_call?.arguments) {
    throw new Error("No content from openai");
  }

  const openAiParsedResponse: CreateChartOpenAiProps = JSON.parse(openaiLastMessage.function_call.arguments) as CreateChartOpenAiProps;

  return {
    tokensUsed,
    openAiResponse: openAiParsedResponse,
  };
};

const saveToSupabase = async ({ openai, viewID, tokens, baseInsight }: SaveToSupabaseProps) => {
  const supabase = createRouteHandlerClient({ cookies });
  const sqlData = {
    view_id: viewID,
    title: openai.title,
    context: openai.context,
    data: openai.data,
    chart_type: baseInsight.chartType,
    base_insight: baseInsight.insight,
  };

  const supabaseRes = await supabase.from("insights").insert(sqlData);
  if (supabaseRes.error) {
    throw new Error(supabaseRes.error.message);
  }
};

const getMessageFormat = (insight: string, chartType: string, data: string): ChatCompletionRequestMessage[] => {
  return [
    {
      role: "system",
      content: getChartSysPrompt,
    },
    {
      role: "user",
      content: `insight: ${insight}
                chartType: ${chartType}
                DATA: ${data}`,
    },
  ];
};
