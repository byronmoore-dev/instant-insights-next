import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

import { nanoid } from "@/lib/utils";

export const runtime = "edge";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  const json = await req.json();
  const { messages, previewToken, userId } = json;

  if (!userId) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  if (previewToken) {
    configuration.apiKey = previewToken;
  }

  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    messages,
    temperature: 0.7,
    stream: true,
  });

  try {
    const stream = OpenAIStream(res, {
      async onCompletion(completion) {
        const title = json.messages[0].content.substring(0, 100);
        const id = json.id ?? nanoid();
        const createdAt = Date.now();
        const path = `/chat/${id}`;
        const payload = {
          id,
          title,
          userId,
          createdAt,
          path,
          messages: [
            ...messages,
            {
              content: completion,
              role: "assistant",
            },
          ],
        };
        /*
        await kv.hmset(`chat:${id}`, payload);
        await kv.zadd(`user:chat:${userId}`, {
          score: createdAt,
          member: `chat:${id}`,
        });
        */
      },
    });

    console.log("RES: " + stream);
    return new StreamingTextResponse(stream);
  } catch (e) {
    console.log("Error: " + e);
    return null;
  }
}
