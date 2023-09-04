"use client";
import React from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChartInsight, GenerateVizType, InsightProps, InsightsProps, ViewProps } from "@/types/fx";
import PieChartComponent from "../visualizations/pieChart";
import { getViewInsights } from "@/app/actions";

export const dynamic = "force-dynamic";

const createChartFromInsight = async ({ item, viewData }: any): Promise<any> => {
  try {
    const res = await fetch("/api/createChart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: item, viewData: viewData }),
    });

    if (res.ok) {
      const resJson = await res.json(); // Get the JSON data from the response
      return resJson.data;
    } else {
      throw new Error(res.statusText);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default function Insights({ insights, viewData }: { insights: any; viewData: ViewProps }) {
  const { data, error, isLoading, refetch } = useQuery<InsightsProps[]>({
    queryKey: ["view-insights", viewData?.id],
    queryFn: () => getViewInsights(viewData?.id),
    refetchOnWindowFocus: false,
    enabled: !viewData?.id,
  });

  const { mutateAsync } = useMutation<ChartInsight, Error, { item: InsightProps; viewData: ViewProps }>({
    mutationFn: createChartFromInsight,
    onSuccess: () => {
      refetch();
    },
  });

  const createInsight = async (item: InsightProps) => {
    await mutateAsync({ item, viewData });
  };

  console.log("insights data", data);

  return (
    <>
      <section className="mb-12 flex w-full justify-between gap-8 xl:gap-28">
        {insights
          ? insights.map((item: InsightProps, index: number) => (
              <button key={index} className="flex max-w-full flex-col p-4" onClick={() => createInsight(item)}>
                <h6 className="text-color-second w-full max-w-md font-light sm:text-lg sm:leading-tight">{item?.insight}</h6>
                <h6 className="text-color-second w-full max-w-md font-light sm:text-lg sm:leading-tight">{item?.chartType}</h6>
              </button>
            ))
          : null}
      </section>
      {data &&
        data?.map((item: InsightsProps, index: number) => (
          <div key={item.id} className="flex h-48 w-full bg-red-100">
            <h2>{item?.title}</h2>
            <h2>{item?.context}</h2>
            <PieChartComponent data={item?.data} />
          </div>
        ))}
    </>
  );
}
