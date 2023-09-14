"use server";

import { NextRequest, NextResponse } from "next/server";

import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { CreateViewOpenAiProps, OpenAiUsageProps } from "@/types/general";
import { getInsightsGPTFunction, getInsightsSysPrompt } from "./gptContstants";
import { uploadStringToS3 } from "./uploadS3";
import { FormProps } from "@/types/form";
import { countChatTokens } from "@/lib/tokenCounter";
import { saveToSupabase } from "./supabase";

// export const runtime = "edge";

const MODEL_NAME = "gpt-3.5-turbo-16k";
const TEMPERATURE = 0.5;
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

type RequestBody = FormProps;

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { textData, fileData, summary, purpose }: RequestBody = await req.json();

    validateInput(textData, fileData, summary, purpose);
    let data = fileData ? decodeString(fileData.data) : textData;

    let { tokensUsed, openAiResponse } = await fetchChatCompletionFromOpenAI({ summary, purpose, data });

    const { fileName, fileURL } = await uploadStringToS3(data);

    let viewID = await saveToSupabase({ openai: openAiResponse, summary, purpose, fileName, fileURL, tokens: tokensUsed });
    return NextResponse.json({ data: viewID }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500, statusText: error.message });
  }
}

/*
  ***************************************************
  Validates input data and metadata before processing.
  ***************************************************
*/
function validateInput(textData: string, fileData: any, summary: string, purpose: string): void {
  if (!textData && !fileData) {
    throw new Error("Please submit either a file or text.");
  }

  if (textData && fileData) {
    throw new Error("Please select only 1 file or text data.");
  }

  if (!summary) {
    throw new Error("Please describe your data.");
  }

  if (!purpose) {
    throw new Error("Please write what you want to learn.");
  }
}

/*
  ***************************************************
  Fetches chat completions from OpenAI and handles data.
  ***************************************************
*/
async function fetchChatCompletionFromOpenAI({
  summary,
  purpose,
  data,
}: {
  summary: string;
  purpose: string;
  data: string;
}): Promise<{ tokensUsed: OpenAiUsageProps; openAiResponse: CreateViewOpenAiProps }> {
  const messages = formatMessagesForOpenAI(summary, purpose, data);
  const tokenEstimate = countChatTokens(messages);

  const openaiResponse = await openai.createChatCompletion({
    model: MODEL_NAME,
    temperature: TEMPERATURE,
    stream: false,
    messages: messages,
    functions: getInsightsGPTFunction,
    function_call: { name: "getViewInsights" },
  });

  const tokensUsed: OpenAiUsageProps = openaiResponse?.data?.usage as OpenAiUsageProps;
  const openAiLastMessage = openaiResponse?.data?.choices[0]?.message;

  if (!openAiLastMessage?.function_call?.arguments) {
    throw new Error("No content from openai");
  }

  const openAiFormattedResponse: CreateViewOpenAiProps = JSON.parse(openAiLastMessage.function_call.arguments) as CreateViewOpenAiProps;
  console.log("TOKENS USED: ", tokensUsed);
  return { tokensUsed, openAiResponse: openAiFormattedResponse };
}

/*
  *************************
  Formats chat messages for OpenAI.
  *************************
*/
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

/*
  *************************
  Decodes a base64-encoded string.
  *************************
*/
const decodeString = (encodedSt: string) => {
  const base64EncodedString = encodedSt.split(",")[1];
  return atob(base64EncodedString);
};
