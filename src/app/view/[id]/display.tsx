"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery, useMutation } from "@tanstack/react-query";
import SpiderChartComponent from "@/components/spiderChart";
import PieChartComponent from "@/components/pieChart";

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
  const { data, status } = useQuery<any>({
    queryKey: ["get_view", id],
    queryFn: async () => await getView(id),
    onSuccess: (result: any) => {
      console.log("DATA: ", result);
    },
  });

  if (status != "success") return <p>loading</p>;

  return (
    <div className="mx-auto w-[90%] sm:w-3/4 pt-28">
      <h6 className="w-full text-xl font-bold text-white sm:text-2xl">Output</h6>

      <h6 className="w-full text-xl font-bold text-white sm:text-2xl">{data?.title}</h6>
      {data?.insights.map((item: string, index: number) => (
        <h6 key={index} className="w-full text-xl font-bold text-white sm:text-2xl">
          {item}
        </h6>
      ))}
      <div className="flex w-full h-72 bg-gray-800">
        {data ? <PieChartComponent data={data.viz1.data} /> : null}
        {data ? <SpiderChartComponent data={data.viz2.data} /> : null}
      </div>
    </div>
  );
}
