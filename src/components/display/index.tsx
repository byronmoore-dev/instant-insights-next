"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getView } from "@/app/actions";
import Insights from "./insights";
import { PotentialInsightProps, ViewProps } from "@/types/general";
import PotentialInsights from "./potentialInsights";

export default function ViewDisplay({ viewID }: { viewID: string }) {
  const viewQuery = useQuery<ViewProps, Error>(["get-view", viewID], () => getView(viewID), {});

  const possibleInsights: PotentialInsightProps[] = (viewQuery?.data?.insights || []).map((str: string) => JSON.parse(str));

  if (viewQuery.status === "loading") return <p className="text-5xl text-white">loading</p>;

  return (
    <motion.div initial={{}} className="w-full">
      <section className="mb-16 mr-auto flex items-center">
        <div className="max-w-3xl flex-grow pl-4">
          <h1 className="text-color-main mb-1 w-full  font-header text-xl font-semibold tracking-wide text-l-text-main dark:text-d-text-main sm:text-2xl">
            {viewQuery.data?.title}
          </h1>
          <h2 className="w-full font-body text-l-text-second dark:text-d-text-second sm:leading-snug">{viewQuery.data?.subtitle}</h2>
        </div>
      </section>

      <PotentialInsights pi={possibleInsights} viewID={viewID} />
      <Insights viewData={viewQuery.data as ViewProps} />
    </motion.div>
  );
}
