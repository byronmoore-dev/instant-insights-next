"use client";
import React from "react";
import { motion } from "framer-motion";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import PieChartComponent from "./visualizations/pieChart";
import { GenerateVizType } from "@/types/fx";
import SpiderChartComponent from "./visualizations/spiderChart";
import DoughnutChart from "./visualizations/doughtnutChart";

export const dynamic = "force-dynamic";

const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-foreground flex asp justify-center items-center w-full p-4 border-[1.5px] border-border rounded-2xl">{children}</div>;
};

export default function DisplayInsights({ query, queryType }: { query: any; queryType: "mutate" | "query" }) {
  // OOF
  let typedQuery;
  if (queryType == "mutate") {
    typedQuery = query as UseMutationResult<GenerateVizType>;
  } else {
    typedQuery = query as UseQueryResult<GenerateVizType>;
  }
  const { data } = typedQuery;

  return (
    <motion.div initial={{}} className="w-full">
      <section className="max-w-2xl mx-auto mb-28">
        <h1 className="w-full text-xl font-semibold text-color-main sm:text-6xl font-header tracking-wide mb-3">{data?.title}</h1>
        <h2 className="w-full text-color-second sm:text-lg font-body sm:leading-snug">{data?.subtitle}</h2>
        <div className="h-[2px] w-3/4 bg-color-second/0 rounded-md mt-0" />
      </section>
      <section className="w-full flex justify-between mb-12 gap-8 xl:gap-28">
        {data?.insights.map((item: string, index: number) => (
          <div key={index} className="flex flex-col p-4 max-w-full">
            <h3 className="font-medium text-5xl text-color-second mb-2">{index + 1}</h3>
            <h6 className="w-full font-light text-color-second sm:text-lg sm:leading-tight max-w-md">{item}</h6>
          </div>
        ))}
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-3 justify-between w-full h-auto sm:h-80 gap-8 xl:gap-20 ">
        {data ? (
          <Card>
            <PieChartComponent data={data.viz1.data} />
          </Card>
        ) : null}
        {data ? (
          <Card>
            <SpiderChartComponent data={data.viz2.data} />
          </Card>
        ) : null}
        {data ? (
          <Card>
            <DoughnutChart data={data.viz3.data} />
          </Card>
        ) : null}
      </section>
    </motion.div>
  );
}
