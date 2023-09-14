"use server";

import { NextResponse } from "next/server";

import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { ChartType, CreateChartOpenAiProps, OpenAiUsageProps, PotentialInsightProps, ViewProps } from "@/types/general";
import { getChartGPTFunction, getChartSysPrompt } from "./gptContstants";
import { fetchFileFromS3 } from "./fetchS3";
import { saveToSupabase } from "./supabase";

// export const runtime = "edge";

const MODEL_NAME = "gpt-3.5-turbo-16k";
const TEMPERATURE = 0.5;
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

type GPTCompletionProp = {
  insight: string;
  chartType: ChartType;
  data: any;
};

type RequestBody = {
  item: PotentialInsightProps;
  viewData: ViewProps;
};

/*
  ***************************************************
  Handles HTTP POST requests.
  ***************************************************
*/
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

/*
  ***************************************************
  Fetches chat completion from OpenAI based on provided data.
  ***************************************************
*/
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

  const tokensUsed: OpenAiUsageProps = openai_res_insights?.data?.usage as OpenAiUsageProps;
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

/*
  ***************************************************
  Formats chat messages for OpenAI.
  ***************************************************
*/
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
