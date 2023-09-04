"use server";

import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { GenerateVizType, InsightProps, ViewProps } from "@/types/fx";
import { getChartGPTFunction, getChartSysPrompt } from "./gptContstants";
import { fetchFileFromS3 } from "./fetchS3";

// export const runtime = "edge";

type GPTCompletionProp = {
  insight: string;
  chartType: string;
  data: any;
};

type RequestBody = {
  item: InsightProps;
  viewData: ViewProps;
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request, res: NextResponse) {
  console.log("-- createChart()");

  //To read request data
  const json: RequestBody = await req.json();
  let { item, viewData } = json;

  try {
    console.log("FILE NAME: ", viewData?.input_data_name);
    const stringified_data = await fetchFileFromS3(viewData?.input_data_name);
    let { tokensUsed, openAiResponse } = await getChatCompletion({ insight: item.insight, chartType: item.chartType, data: stringified_data });
    let supaRes = await saveToSupabase({ openai: openAiResponse, viewID: viewData.id, tokens: tokensUsed });

    if (supaRes.error) throw Error(`${supaRes?.error}`);

    return NextResponse.json({ data: openAiResponse }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500, statusText: error.message });
  }
}

// Chat GPT
const getChatCompletion = async ({ insight, chartType, data }: GPTCompletionProp) => {
  let gptFunction: any = [getChartGPTFunction.find((chart) => chart.name === chartType)];
  const openai_res_insights = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    temperature: 0.8,
    stream: false,
    messages: getMessageFormat(insight, chartType, data),
    functions: gptFunction,
    function_call: { name: chartType },
  });

  let tokensUsed = openai_res_insights?.data?.usage?.total_tokens;
  let openaiLastMessage = openai_res_insights?.data?.choices[0]?.message;
  if (!openaiLastMessage?.function_call?.arguments) throw new Error("No content from openai");
  const openAiResponse: GenerateVizType = JSON.parse(openaiLastMessage.function_call.arguments);

  return { tokensUsed, openAiResponse };
};

// Supabase
const saveToSupabase = async ({ openai, viewID, tokens }: any) => {
  // Init supabase
  const supabase = createRouteHandlerClient({ cookies });

  const sqlData = {
    view_id: viewID,
    title: openai.title,
    context: openai.context,
    data: openai.data,
  };

  let supabaseRes = await supabase.from("insights").insert(sqlData);
  return supabaseRes;
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
