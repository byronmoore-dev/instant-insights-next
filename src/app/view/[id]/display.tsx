"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery, useMutation } from "@tanstack/react-query";
import DisplayInsights from "@/components/displayInsights";

export const dynamic = "force-dynamic";

const getView = async (id: string) => {
  const supabase = createClientComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No valid user logged in");
  let res = await supabase.from("view").select("*").eq("id", id);
  return res.data ? res.data[0] : {};
};

export default function ViewDisplay({ id }: { id: string }) {
  const query = useQuery<any>({
    queryKey: ["get_view", id],
    queryFn: async () => await getView(id),
    onSuccess: (result: any) => {
      console.log("DATA: ", result);
    },
  });
  const { status } = query;

  if (status != "success") return <p className="text-5xl text-white">loading SLUTTT</p>;

  return <DisplayInsights query={query} queryType="query" />;
}
