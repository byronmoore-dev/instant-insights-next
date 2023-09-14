import { OpenAiUsageProps, PotentialInsightProps } from "@/types/general";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

type SaveToSupabaseProps = {
  openai: any;
  summary: string;
  purpose: string;
  fileName: string;
  fileURL: string;
  tokens: OpenAiUsageProps;
};

/*
  ***************************************************
  Saves data to Supabase including insights and usage.
  ***************************************************
*/
export const saveToSupabase = async (props: SaveToSupabaseProps): Promise<string | null> => {
  const supabase = createRouteHandlerClient({ cookies });
  const curTime = new Date().getTime();

  const viewID = await saveViewData(supabase, props, curTime);
  await saveUsageData(supabase, props, curTime);
  await updateUserAccount(supabase, props);

  return viewID;
};

const saveViewData = async (supabase: any, props: SaveToSupabaseProps, curTime: number): Promise<string | null> => {
  const { openai, summary, purpose, fileName, fileURL } = props;

  const viewData = {
    input_summary: summary,
    input_purpose: purpose,
    input_data_url: fileURL,
    input_data_name: fileName,
    title: openai.title,
    subtitle: openai.subtitle,
    insights: openai.insights,
    updated_at: curTime,
    created_at: curTime,
  };

  const response = await supabase.from("view").insert(viewData).select("id").limit(1);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data?.[0]?.id || null;
};

const saveUsageData = async (supabase: any, props: SaveToSupabaseProps, curTime: number) => {
  const { tokens } = props;

  const usageData = {
    prompt_tokens: tokens.prompt_tokens,
    completion_tokens: tokens.completion_tokens,
    total_tokens: tokens.total_tokens,
    used_at: curTime,
    action: "insight",
  };

  const response = await supabase.from("usage").insert(usageData);

  if (response.error) {
    throw new Error(response.error.message);
  }
};

const updateUserAccount = async (supabase: any, props: SaveToSupabaseProps) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User is not authenticated.");

  const getAccountRes = await supabase.from("account").select("*").eq("user_id", user.id).single();

  if (getAccountRes.data) {
    await updateAccount(supabase, user.id, getAccountRes.data, props.tokens);
  } else {
    await insertAccount(supabase, user.id, props.tokens);
  }
};

const updateAccount = async (supabase: any, userId: string, accountData: any, tokens: any) => {
  const prevActionCount = accountData.total_actions || 0;
  const prevTokenCount = accountData.total_open_ai_tokens_used || 0;

  const updateData = {
    total_open_ai_tokens_used: prevTokenCount + tokens.total_tokens,
    total_actions: prevActionCount + 1,
  };

  const response = await supabase.from("account").update(updateData).eq("user_id", userId);

  // Optionally log the response
  if (response.error) {
    console.error("Update Supabase: ", response);
  }
};

const insertAccount = async (supabase: any, userId: string, tokens: any) => {
  const insertData = {
    user_id: userId,
    total_open_ai_tokens_used: tokens.total_tokens,
    total_actions: 1,
  };

  const response = await supabase.from("account").insert(insertData);

  // Optionally log the response
  if (response.error) {
    console.error("Insert Supabase: ", response);
  }
};
