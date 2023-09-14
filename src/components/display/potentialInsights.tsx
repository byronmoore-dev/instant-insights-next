"use client";

import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getView } from "@/app/actions";
import { InsightProps, PotentialInsightProps, ViewProps } from "@/types/general";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animConstants";

const createChartFromInsight = async ({ item, viewData }: any): Promise<any> => {
  try {
    const res = await fetch("/api/createChart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item, viewData }),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const PiTile = ({ item }: { item: PotentialInsightProps }) => {
  return (
    <motion.div className="absolute left-0 top-0 h-full w-full rounded-xl border-[1px] border-d-border">
      <h6 className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full p-6 font-light text-l-text-second dark:text-d-text-second sm:text-base sm:leading-snug">
        {item?.insight}
        {item?.chartType}
      </h6>
      <motion.div
        className="absolute left-0 top-0 z-0 h-full w-full rounded-xl border-[1.5px] border-d-border bg-d-foreground opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

export default function PotentialInsights({ pi, viewID }: { pi: PotentialInsightProps[]; viewID: string }) {
  const queryClient = useQueryClient();

  const viewQuery = useQuery<ViewProps, Error>(["get-view", viewID], () => getView(viewID));

  const { mutateAsync } = useMutation<InsightProps, Error, { item: PotentialInsightProps; viewData: ViewProps }>({
    mutationFn: createChartFromInsight,
    onSuccess: () => {
      queryClient.invalidateQueries(["get-insights", viewID]);
      queryClient.invalidateQueries(["user-token-usage"]);
    },
  });

  if (!pi || pi.length < 0 || !viewQuery.data) {
    return <p>error</p>;
  }

  return (
    <motion.section initial="hidden" animate="show" variants={staggerContainer} className="mb-16 flex w-full flex-wrap justify-between gap-6">
      {pi
        ? pi.map((item: PotentialInsightProps, index: number) => (
            <motion.button
              variants={staggerItem}
              key={index}
              className="relative z-10 flex h-full w-full max-w-[280px] flex-col"
              onClick={() => mutateAsync({ item, viewData: viewQuery.data })}
            >
              <h6 className="h-auto w-full p-6 font-light opacity-0 sm:text-base sm:leading-snug">
                {item?.insight}
                {item?.chartType}
              </h6>
              <PiTile item={item} />
            </motion.button>
          ))
        : null}
    </motion.section>
  );
}
