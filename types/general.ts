import { Database } from "@/types/supabase";

export type ViewProps = Database["public"]["Tables"]["view"]["Row"];
export type InsightProps = Database["public"]["Tables"]["insights"]["Row"];
export type UsageProps = Database["public"]["Tables"]["usage"]["Row"];

export type ChartType = "lineChart" | "pieChart" | "doughnutChart" | "radarChart" | "barChart";
export const GPTChartTypes = ["lineChart", "pieChart", "doughtnutChart", "radarChart", "barChart"];
export const GPTStatTypes = ["average", "outlier", "popular", "random", "??"];

export type AllViewsProps = {
  id: string;
  title: string;
  updated_at: any;
};

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

export type OpenAiUsageProps = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

export type SupabaseSaveInsightProps = {
  openai: CreateViewOpenAiProps;
  summary: string;
  purpose: string;
  fileName: string;
  fileURL: string;
  tokens: OpenAiUsageProps;
};

export type CreateViewOpenAiProps = {
  title: string;
  subtitle: string;
  insights: Array<string>;
  success: number;
};
