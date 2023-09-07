import { GPTChartTypes } from "@/types/general";

export const getInsightsGPTFunction = [
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
          description: "2 SENTENCE SUBTITLE, PROPER PUNCTUATION. Create a subtitle supporting your title and describing the overall data.",
        },
        stats: {
          type: "array",
          description: "Please provide 4 to 6 key statistics to summarize this dataset.",
          items: {
            type: "object",
            description: "4 to 6 items.",
            properties: {
              label: {
                type: "string",
                description: "2 to 3 word label. MAX 3 words.",
              },
              value: {
                type: "number" || "string",
                description: "The statistic you have chosen to display.",
              },
            },
          },
        },
        insights: {
          type: "array",
          description: "AT LEAST 6 to 10 ITEMS. Each must be completely unique and should stand alone independently.",
          items: {
            type: "object",
            description: "A unique takeaway or insight from the data that could be visualized.",
            properties: {
              insight: {
                type: "string",
                description: "2 proper sentences. A unique takeaway or insight from the data that could be visualized.",
              },
              chartType: {
                type: "string",
                enum: GPTChartTypes,
                description: "What type of chart would you use to visualize the insight? Try to have a diverse set of chart types if it makes sense.",
              },
            },
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

export const getInsightsSysPrompt = `You are an expert data analyst. You will analyze your received data for interesting insights, topics, and hidden themes. Each insight needs to be visualized via some sort of traditional graph or chart.`;
