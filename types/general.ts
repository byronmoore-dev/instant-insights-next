import { Database } from "@/types/supabase";

export type ViewProps = Database["public"]["Tables"]["view"]["Row"];
export type InsightProps = Database["public"]["Tables"]["insights"]["Row"];

export type ChartType = "lineChart" | "pieChart" | "doughnutChart" | "radarChart" | "barChart";
export const GPTChartTypes = ["lineChart", "pieChart", "doughtnutChart", "radarChart", "barChart"];
export const GPTStatTypes = ["average", "outlier", "popular", "random", "??"];

export type PotentialInsightProps = {
  insight: string;
  chartType: ChartType;
};

export type CreateInsightsOpenAiProps = {
  title: string;
  subtitle: string;
  insights: Array<InsightProps>;
  success: number;
};

export type CreateChartOpenAiProps = {
  title: string;
  context: string;
  data: unknown;
};
