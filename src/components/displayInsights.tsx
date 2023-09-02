"use client";
import React from "react";
import { motion } from "framer-motion";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import PieChartComponent from "./visualizations/pieChart";
import { GenerateVizType } from "@/types/fx";
import SpiderChartComponent from "./visualizations/spiderChart";
import DoughnutChart from "./visualizations/doughtnutChart";
import { AddIcon } from "@/assets/icons";

export const dynamic = "force-dynamic";

const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-foreground asp border-border flex w-full items-center justify-center rounded-2xl border-[1.5px] p-4">{children}</div>;
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
      <section className="mb-28 mr-auto flex items-center">
        {/*<AddIcon className="h-6 w-6 stroke-white" />*/}
        <div className="max-w-3xl flex-grow pl-4">
          <h1 className="text-color-main mb-1 w-full  font-header text-xl font-semibold tracking-wide text-l-text-main dark:text-d-text-main sm:text-2xl">
            {data?.title}
          </h1>
          <h2 className="w-full font-body text-l-text-second dark:text-d-text-second sm:leading-snug">{data?.subtitle}</h2>
        </div>
      </section>
      <section className="mb-12 flex w-full justify-between gap-8 xl:gap-28">
        {data?.insights.map((item: string, index: number) => (
          <div key={index} className="flex max-w-full flex-col p-4">
            <h3 className="text-color-second mb-2 text-5xl font-medium">{index + 1}</h3>
            <h6 className="text-color-second w-full max-w-md font-light sm:text-lg sm:leading-tight">{item}</h6>
          </div>
        ))}
      </section>
      <section className="grid h-auto w-full grid-cols-1 justify-between gap-8 sm:h-80 sm:grid-cols-3 xl:gap-20 ">
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
