"use server";

import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { GenerateVizType } from "@/types/fx";
import { getInsightsGPTFunction, getInsightsSysPrompt } from "./gptContstants";

// export const runtime = "edge";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request, res: NextResponse) {
  console.log("--- getInsights()");

  //To read request data
  const json = await req.json();
  let { textData, fileData, summary, purpose } = json;
  // Initial Message Prompt
  let data = textData;

  if (!textData && !fileData) {
    return NextResponse.json({ error: "Please submit either a file or text." }, { status: 400, statusText: "Please submit either a file or text." });
  }

  if (!summary || summary == "") {
    return NextResponse.json({ error: "Please describe your data." }, { status: 400, statusText: "Please describe your data." });
  }

  if (!purpose || purpose == "") {
    return NextResponse.json({ error: "Please write what you want to learn." }, { status: 400, statusText: "Please write what you want to learn." });
  }

  try {
    let { tokensUsed, openAiResponse } = await getChatCompletion({ summary, purpose, data });

    await saveToSupabase({ openai: openAiResponse, summary, purpose, fileURL: "", tokens: tokensUsed });

    return NextResponse.json({ data: openAiResponse }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500, statusText: error.message });
  }
}

// Helpers

// Chat GPT
const getChatCompletion = async ({ summary, purpose, data }: any) => {
  const openai_res_insights = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    temperature: 0.8,
    stream: false,
    messages: getMessageFormat(summary, purpose, data),
    functions: getInsightsGPTFunction,
    function_call: { name: "getInsights" },
  });

  let tokensUsed = openai_res_insights?.data?.usage?.total_tokens;
  let openaiLastMessage = openai_res_insights?.data?.choices[0]?.message;
  if (!openaiLastMessage?.function_call?.arguments) throw new Error("No content from openai");
  const openAiResponse: GenerateVizType = JSON.parse(openaiLastMessage.function_call.arguments);

  return { tokensUsed, openAiResponse };
};

// AWS S3
const saveFileToS3 = (): string => {
  const fileURL: string = "";
  return fileURL;
};

// Supabase
const saveToSupabase = async ({ openai, summary, purpose, fileURL, tokens }: any) => {
  // Init supabase
  const supabase = createRouteHandlerClient({ cookies });

  const sqlData = {
    input_summary: summary,
    input_purpose: purpose,
    input_data_url: fileURL,
    title: openai.title,
    subtitle: openai.subtitle,
    insights: openai.insights,
  };

  let supabaseRes = await supabase.from("view").insert(sqlData);
};

const getMessageFormat = (summary: string, purpose: string, data: string): ChatCompletionRequestMessage[] => {
  return [
    {
      role: "system",
      content: getInsightsSysPrompt,
    },
    {
      role: "user",
      content: `SUMMARY: ${summary}
                PURPOSE: ${purpose}
                DATA: ${data}`,
    },
  ];
};
