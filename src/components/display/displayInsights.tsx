"use client";
import React from "react";
import { motion } from "framer-motion";
import { UseMutationResult, UseQueryResult, useMutation } from "@tanstack/react-query";
import { GenerateVizType, InsightProps, ViewProps } from "@/types/fx";
import Insights from "./charts";

export const dynamic = "force-dynamic";

export default function DisplayInsights({ query, queryType }: { query: any; queryType: "mutate" | "query" }) {
  const typedQuery = queryType === "mutate" ? (query as UseMutationResult<GenerateVizType>) : (query as UseQueryResult<GenerateVizType>); // oof
  const { data } = typedQuery;
  const insights = queryType === "mutate" ? data?.insights : data?.insights.map((str: string) => JSON.parse(str)); // oof

  return (
    <motion.div initial={{}} className="w-full">
      <section className="mb-28 mr-auto flex items-center">
        <div className="max-w-3xl flex-grow pl-4">
          <h1 className="text-color-main mb-1 w-full  font-header text-xl font-semibold tracking-wide text-l-text-main dark:text-d-text-main sm:text-2xl">
            {data?.title}
          </h1>
          <h2 className="w-full font-body text-l-text-second dark:text-d-text-second sm:leading-snug">{data?.subtitle}</h2>
        </div>
      </section>

      <Insights insights={insights} viewData={data as ViewProps} />
    </motion.div>
  );
}
