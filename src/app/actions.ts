"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../types/supabase";
import { PostgrestMaybeSingleResponse } from "@supabase/supabase-js";

type ViewRow = Database["public"]["Tables"]["view"]["Row"];
type MessageRow = Database["public"]["Tables"]["message"]["Row"];

export async function getAllViews(): Promise<ViewRow[]> {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    if (!user) throw new Error("No valid user logged in");

    const views: PostgrestMaybeSingleResponse<ViewRow[]> = await supabase.from("view").select("*").eq("user_id", user.id);
    return views?.data || [];
  } catch (error) {
    throw error;
  }
}

/*
    Get one view
*/
export async function getView(view_id: string): Promise<PostgrestMaybeSingleResponse<ViewRow> | null> {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    if (!user) throw new Error("");

    // Get the convo root
    const view: PostgrestMaybeSingleResponse<ViewRow> = await supabase.from("view").select("*").eq("id", view_id).eq("user_id", user.id).single();

    if (!view) throw new Error("Error getting view table.");

    // Get all messages from with the convo id
    const messages: PostgrestMaybeSingleResponse<MessageRow[]> = await supabase
      .from("message")
      .select("*")
      .eq("user_id", user.id)
      .eq("view_id", view_id);

    if (!messages) throw new Error("Error getting messages.");

    return view;
  } catch (error) {
    return null;
  }
}

/*
    Remove view
*/
export async function removeView(id: string) {
  const supabase = createServerActionClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    if (!user) throw new Error("");
    let res1 = await supabase.from("view").select("*").eq("id", id).eq("user_id", user.id);
    console.log("1", res1);
    const response = await supabase.from("view").delete().eq("id", id).eq("user_id", user.id);
    console.log("RES: ", response);

    let res2 = await supabase.from("view").select("*").eq("id", id).eq("user_id", user.id);
    console.log("2:", res2);
    return response;
  } catch (e) {
    console.log("error: ", e);
  }
}
