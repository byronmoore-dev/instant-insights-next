"use server";

import { NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { nanoid } from "@/lib/utils";

import { Configuration, OpenAIApi } from "openai";
import { systemPrompt } from "@/lib/promptText";
import { GenerateVizType } from "@/types/fx";

// export const runtime = "edge";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request, res: NextResponse) {
  console.log("RUNNING...");

  // Init supabase
  const supabase = createRouteHandlerClient({ cookies });

  //To read request data
  const json = await req.json();
  let { data, summary } = json;

  if (!data) {
    return NextResponse.json({ error: "Data is invalid" }, { status: 400, statusText: "Data is invalid" });
  }

  if (!summary) {
    return NextResponse.json({ error: "Summary is invalid" }, { status: 400, statusText: "Summary is invalid" });
  }

  // Initial Message Prompt
  let messages: any = getMessageFormat(summary, data);

  try {
    const openai_res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-16k",
      temperature: 0.6,
      stream: false,
      messages,
      functions: functions,
      function_call: "auto",
    });

    let openai_last_message = openai_res?.data["choices"][0]["message"];

    if (!openai_last_message?.function_call?.arguments) throw new Error("No content from openai");
    const resJson: GenerateVizType = JSON.parse(openai_last_message.function_call.arguments);

    const sqlData = {
      input_data_type: "text",
      input_data: data,
      input_summary: summary,
      title: resJson.title,
      insights: resJson.insights,
      viz1: resJson.viz1,
      viz2: resJson.viz2,
    };

    let supabaseRes = await supabase.from("view").insert(sqlData);
    if (supabaseRes.status != 201) throw new Error("Error in supabase");

    console.log("SQL Response", supabaseRes);
    return NextResponse.json({ data: resJson }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500, statusText: error.message });
  }
}

const getMessageFormat = (summary: string, data: string) => {
  return [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: `SUMMARY: ${summary}
                DATA: ${data}`,
    },
  ];
};

const timeMyFx = () => {
  let timeThen = Date.now();

  let timeNow = Date.now();
  let elapsedMilliseconds = timeNow - timeThen;
  let elapsedSeconds = elapsedMilliseconds / 1000;

  console.log("TIME ELAPSED: ", elapsedSeconds, "seconds");
};

let functions = [
  {
    name: "generateViz",
    description: "",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "3 to 10 word describing the data.",
        },
        insights: {
          type: "array",
          description: "3 items, each describing a unique insight about the data.",
          items: {
            type: "string",
            description: "",
          },
        },
        viz1: {
          type: "object",
          description: "a pie chart is best for showing the proportional distribution of a few categories, representing parts of a whole.",
          properties: {
            title: {
              type: "string",
              description: "Create a name for this visualizaiton. Short and about the data.",
            },
            vizType: {
              type: "string",
              enum: ["pie", "barchart", "spider"],
              description: "",
            },
            data: {
              type: "array",
              description: "",
              items: {
                type: "object",
                description: "",
                properties: {
                  label: {
                    type: "string",
                    description: "",
                  },
                  value: {
                    type: "number",
                    description: "",
                  },
                },
              },
            },
          },
        },
        viz2: {
          type: "object",
          description: "A radar chart is used to display multivariate data by comparing three or more quantitative variables from a central point.",
          properties: {
            title: {
              type: "string",
              description: "Create a name for this visualizaiton. Short and about the data.",
            },
            vizType: {
              type: "string",
              enum: ["pie", "barchart", "spider"],
              description: "pick spider chart",
            },
            data: {
              type: "array",
              description:
                "A radar chart is used to display multivariate data by comparing three or more quantitative variables from a central point.",
              items: {
                type: "object",
                description: "",
                properties: {
                  label: {
                    type: "string",
                    description: "",
                  },
                  value: {
                    type: "number",
                    description: "",
                  },
                  max: {
                    type: "number",
                    description: "",
                  },
                },
              },
            },
          },
        },
      },
      required: ["title", "insights", "viz1"],
    },
  },
];
