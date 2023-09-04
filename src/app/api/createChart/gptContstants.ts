const chartTypes = ["lineChart", "pieChart", "doughtnutChart", "radarChart", "barChart"];

export const getChartGPTFunction = [
  {
    name: "pieChart",
    description: "",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Create a name for this visualizaiton. Short and about the data.",
        },
        context: {
          type: "string",
          description: "Tell me more about the insight this visualization is based off of. At least 3 sentences.",
        },
        data: {
          type: "array",
          description: "a pie chart is best for showing the proportional distribution of a few categories, representing parts of a whole.",
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
      required: ["title", "context", "data"],
    },
  },
  {
    name: "doughnutChart",
    description: "",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Create a name for this visualizaiton. Short and about the data.",
        },
        context: {
          type: "string",
          description: "Tell me more about the insight this visualization is based off of. At least 3 sentences.",
        },

        data: {
          type: "array",
          description: "A radar chart is used to display multivariate data by comparing three or more quantitative variables from a central point.",
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
      required: ["title", "context", "data"],
    },
  },
  {
    name: "radarChart",
    description: "",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Create a name for this visualizaiton. Short and about the data.",
        },
        context: {
          type: "string",
          description: "Tell me more about the insight this visualization is based off of. At least 3 sentences.",
        },
        data: {
          type: "array",
          description: "A radar chart is used to display multivariate data by comparing three or more quantitative variables from a central point.",
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
      required: ["title", "context", "data"],
    },
  },
];

export const getChartSysPrompt = `You are an expert data analyst. You will analyze your received data for interesting insights, topics, and hidden themes. Each insight needs to be visualized via some sort of traditional graph or chart.`;
