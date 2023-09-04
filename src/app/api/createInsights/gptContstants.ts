const chartTypes = ["lineChart", "pieChart", "doughtnutChart", "radarChart", "barChart"];

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
        insights: {
          type: "array",
          description: "AT LEAST 6 to 10 ITEMS. Each must be completely unique and should stand alone independently.",
          items: {
            type: "object",
            description: "A unique takeaway or insight from the data that could be visualized.",
            properties: {
              insight: {
                type: "string",
                description: "2 proper sentences. A unique takeaway or insight from the data that could potentially be visualized.",
              },
              chartType: {
                type: "string",
                enum: chartTypes,
                description: "What type of chart would you use to visualize the insight?",
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
