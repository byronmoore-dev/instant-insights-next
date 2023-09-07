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
  {
    name: "lineChart",
    description: "",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Create a name for this visualization. Short and about the data.",
        },
        context: {
          type: "string",
          description: "Tell me more about the insight this visualization is based off of. At least 3 sentences.",
        },
        data: {
          type: "array",
          description: "A line chart is used to visualize data points in a time sequence or any sequential order.",
          items: {
            type: "object",
            description: "",
            properties: {
              label: {
                type: "string",
                description: "Represents the x-axis value or the name of the data point.",
              },
              value: {
                type: "number",
                description: "Represents the y-axis value or the data point's value.",
              },
            },
          },
        },
      },
      required: ["title", "context", "data"],
    },
  },
  {
    name: "barChart",
    description: "",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Create a name for this visualization. Short and about the data.",
        },
        context: {
          type: "string",
          description: "Tell me more about the insight this visualization is based off of. At least 3 sentences.",
        },
        data: {
          type: "array",
          description:
            "A bar chart is used to compare individual categories. It displays rectangular bars with lengths proportional to the values they represent.",
          items: {
            type: "object",
            description: "",
            properties: {
              label: {
                type: "string",
                description: "Represents the category or the name of the data point.",
              },
              value: {
                type: "number",
                description: "Represents the height of the bar or the data point's value.",
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
