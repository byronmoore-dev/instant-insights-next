export type GenerateVizType = {
  title: string;
  subtitle: string;
  insights: Array<string>;
};

export type InsightProps = {
  insight: string;
  chartType: string;
};

export type ViewProps = {
  id: string;
  input_data_url: string;
  input_data_name: string;
  input_purpose: string;
  input_summary: string;
  title: string;
  subtitle: string;
  insights: Array<string> | Array<InsightProps>;
};

export type ChartInsight = {
  title: string;
  context: string;
  data: any;
};

export type ChartType = "lineChart" | "pieChart" | "doughnutChart" | "radarChart" | "barChart";

export type CreateInsightsOpenAiProps = {
  title: string;
  subtitle: string;
  insights: Array<InsightProps>;
};

// Straight from Supabase
export type InsightsProps = {
  id: string;
  user_id: string;
  view_id: string;
  title: string;
  context: string;
  data: any;
};
