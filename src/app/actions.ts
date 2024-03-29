"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../types/supabase";
import { PostgrestMaybeSingleResponse } from "@supabase/supabase-js";
import { removeObjectFromS3 } from "@/lib/removeFromS3";
import { AccountProps, AllViewsProps, InsightProps, ViewProps } from "@/types/general";

export async function getAllViews(): Promise<AllViewsProps[]> {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    if (!user) throw new Error("No valid user logged in");

    const views: PostgrestMaybeSingleResponse<any[]> = await supabase
      .from("view")
      .select("id, title, updated_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (!views?.data) throw new Error("Error getting all views.");

    const sorted = views.data.sort((a, b) => b.updated_at - a.updated_at);
    return sorted || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCurrentTokensUsed(): Promise<number> {
  const supabase = createServerActionClient({ cookies });
  console.log("getting tokens");
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    if (!user) throw new Error("No valid user logged in");

    const account: PostgrestMaybeSingleResponse<AccountProps> = await supabase.from("account").select("*").eq("user_id", user.id).single();

    if (!account?.data) throw new Error("Error getting account data.");

    console.log("USAGE: ", account);

    return account?.data?.total_open_ai_tokens_used || 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getInsights(viewID: string): Promise<InsightProps[]> {
  const supabase = createServerActionClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User is not authenticated.");

  const res: PostgrestMaybeSingleResponse<InsightProps[]> = await supabase.from("insights").select("*").eq("view_id", viewID);
  if (!res?.data) throw new Error("Error getting insights table.");
  return res?.data;
}

/*
    Get one view
*/
export async function getView(view_id: string): Promise<ViewProps> {
  const supabase = createServerActionClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User is not authenticated.");

  const res: PostgrestMaybeSingleResponse<ViewProps> = await supabase.from("view").select("*").eq("id", view_id).eq("user_id", user.id).single();
  if (!res?.data) throw new Error("Error getting view table.");

  return res.data;
}

/*
    Remove view
*/
export async function removeView(id: string) {
  try {
    const supabase = createServerActionClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("User not authenticated.");

    const { data: selectData, error: selectError } = await supabase.from("view").select("input_data_name").eq("id", id).single();
    if (selectError) throw selectError;

    const { data: insightData, error: insightError } = await supabase.from("insights").delete().eq("view_id", id).eq("user_id", user.id);
    if (insightError) throw insightError;

    await removeObjectFromS3(selectData?.input_data_name);

    const response = await supabase.from("view").delete().eq("id", id).eq("user_id", user.id);
    return response;
  } catch (e) {
    console.error(e);
  }
}
