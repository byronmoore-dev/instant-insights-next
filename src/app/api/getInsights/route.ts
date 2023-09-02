"use server";

import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Configuration, OpenAIApi } from "openai";
import { systemPrompt } from "@/lib/promptText";
import { GenerateVizType } from "@/types/fx";

// export const runtime = "edge";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request, res: NextResponse) {
  console.log("RUNNING 222...");

  // Init supabase
  const supabase = createRouteHandlerClient({ cookies });

  //To read request data
  const json = await req.json();
  let { textData, fileData, summary, purpose } = json;

  if (!textData && !fileData) {
    return NextResponse.json({ error: "Data is invalid" }, { status: 400, statusText: "Data is invalid" });
  }

  if (!summary || summary == "") {
    return NextResponse.json({ error: "Summary is invalid" }, { status: 400, statusText: "Summary is invalid" });
  }

  // Initial Message Prompt
  let data = textData;
  let messages: any = getMessageFormat(summary, purpose, data);

  try {
    const openai_res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-16k",
      temperature: 0.8,
      stream: false,
      messages,
      functions: functionInsight,
      function_call: "auto",
    });

    console.log("OPENAI: ", openai_res);

    let openai_last_message = openai_res?.data["choices"][0]["message"];

    if (!openai_last_message?.function_call?.arguments) throw new Error("No content from openai");
    const resJson: GenerateVizType = JSON.parse(openai_last_message.function_call.arguments);

    const openai_res2 = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-16k",
      temperature: 0.8,
      stream: false,
      messages,
      functions: functionViz,
      function_call: "auto",
    });

    let openai_last_message2 = openai_res2?.data["choices"][0]["message"];

    if (!openai_last_message2?.function_call?.arguments) throw new Error("No content from openai");
    const resJson2: GenerateVizType = JSON.parse(openai_last_message2.function_call.arguments);

    console.log("JSON: ", resJson2);

    return NextResponse.json({ data: resJson }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500, statusText: error.message });
  }
}

const getMessageFormat = (summary: string, purpose: string, data: string) => {
  return [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: `SUMMARY: ${summary}
                PURPOSE: ${purpose}
                DATA: ${data}`,
    },
  ];
};

let functionInsight = [
  {
    name: "getInsights",
    description: "I need a list of interesting insights and ideas from this data.",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "3 to 6 word title about the data. No punctuation.",
        },
        subtitle: {
          type: "string",
          description: "This is a 1 sentence subtitle supporting your title and describing the overall data. Use proper punctuation.",
        },
        insights: {
          type: "array",
          description: "4 to 10 items that are completely distinct and should stand alone independently.",
          items: {
            type: "string",
            description: "1 proper sentence of a unique takeaway or insight from the data that could potentially be visualized.",
          },
        },
        success: {
          type: "number",
          description: "Return 0 if the other tasks were impossible. Return 1 if success.",
        },
      },
      required: ["title", "subtitle", "insights", "success"],
    },
  },
];


let functionViz = [
  {
    name: "getViz",
    description: "I need a potential",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "3 to 6 word title for the visualization. No punctuation.",
        },
        insights: {
          type: "array",
          description: "4 to 10 items that are completely distinct and should stand alone independently.",
          items: {
            type: "string",
            description: "1 proper sentence of a unique takeaway or insight from the data that could potentially be visualized.",
          },
        },
        success: {
          type: "number",
          description: "Return 0 if the other tasks were impossible. Return 1 if success.",
        },
      },
      required: ["title", "subtitle", "insights", "success"],
    },
  },
];
