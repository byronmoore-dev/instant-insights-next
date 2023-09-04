"use server";

import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { CreateInsightsOpenAiProps, GenerateVizType } from "@/types/fx";
import { getInsightsGPTFunction, getInsightsSysPrompt } from "./gptContstants";
import { uploadStringToS3 } from "./uploadS3";
import { redirect } from "next/navigation";

// export const runtime = "edge";

const OPENAI_MODEL = "gpt-3.5-turbo-16k";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { textData, fileData, summary, purpose } = await req.json();
    // Initial Message Prompt
    let data = textData;

    validateInput(textData, fileData, summary, purpose);

    let { tokensUsed, openAiResponse } = await fetchChatCompletionFromOpenAI({ summary, purpose, data });

    const { fileName, fileURL } = await uploadStringToS3(data);

    let viewID = await saveToSupabase({ openai: openAiResponse, summary, purpose, fileName, fileURL, tokens: tokensUsed });
    return NextResponse.json({ data: viewID }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500, statusText: error });
  }
}

function validateInput(textData: string, fileData: string, summary: string, purpose: string): void {
  if (!textData && !fileData) {
    throw new Error("Please submit either a file or text.");
  }

  if (!summary) {
    throw new Error("Please describe your data.");
  }

  if (!purpose) {
    throw new Error("Please write what you want to learn.");
  }
}

async function fetchChatCompletionFromOpenAI({
  summary,
  purpose,
  data,
}: {
  summary: string;
  purpose: string;
  data: string;
}): Promise<{ tokensUsed: number; openAiResponse: CreateInsightsOpenAiProps }> {
  const openaiResponse = await openai.createChatCompletion({
    model: OPENAI_MODEL,
    temperature: 0.8,
    stream: false,
    messages: formatMessagesForOpenAI(summary, purpose, data),
    functions: getInsightsGPTFunction,
    function_call: { name: "getInsights" },
  });

  const tokensUsed = openaiResponse?.data?.usage?.total_tokens as number;
  const openAiLastMessage = openaiResponse?.data?.choices[0]?.message;

  if (!openAiLastMessage?.function_call?.arguments) {
    throw new Error("No content from openai");
  }

  const openAiFormattedResponse: CreateInsightsOpenAiProps = JSON.parse(openAiLastMessage.function_call.arguments);

  return { tokensUsed, openAiResponse: openAiFormattedResponse };
}

const saveToSupabase = async ({ openai, summary, purpose, fileName, fileURL, tokens }: any) => {
  const supabase = createRouteHandlerClient({ cookies });
  const sqlData = {
    input_summary: summary,
    input_purpose: purpose,
    input_data_url: fileURL,
    input_data_name: fileName,
    title: openai.title,
    subtitle: openai.subtitle,
    insights: openai.insights,
  };

  const supaRes = await supabase.from("view").insert(sqlData).select("id").limit(1);
  return supaRes?.data?.[0].id;
};

function formatMessagesForOpenAI(summary: string, purpose: string, data: string): ChatCompletionRequestMessage[] {
  return [
    {
      role: "system",
      content: getInsightsSysPrompt,
    },
    {
      role: "user",
      content: `SUMMARY: ${summary}\nPURPOSE: ${purpose}\nDATA: ${data}`,
    },
  ];
}