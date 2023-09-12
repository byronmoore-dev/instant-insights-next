import { promptTokensEstimate } from "openai-chat-tokens";
import { getInsightsGPTFunction } from "@/app/api/createView/gptContstants";

export const countChatTokens = (messages: any): number => {
  const estimate = promptTokensEstimate({
    messages: messages,
    functions: getInsightsGPTFunction,
  });
  console.log("TOKENS USED ESTIMATE ", estimate);

  return estimate;
};
