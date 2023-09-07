"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import PieChartComponent from "@/components/visualizations/pieChart";
import SpiderChartComponent from "@/components/visualizations/spiderChart";
import { exampleResponse } from "@/lib/promptText";

export default function GPTForm() {
  const [fade, setFade] = useState<boolean>(true);
  const [initialDelay, setInitialDelay] = useState<number>(0.5);

  const { data, status } = useQuery<any>({
    queryKey: ["get-view"],
    queryFn: async () => await getView(),
  });

  useEffect(() => {
    setInitialDelay(0);
  }, []);

  if (status !== "success") return null;

  return (
    <div
      style={{ perspective: "1000px" }}
      className="absolute left-0 top-0 z-20 flex h-screen w-full flex-col items-center justify-center bg-red-400"
    >
      <AnimatePresence>
        {fade && (
          <motion.div
            initial={{ transform: "translateZ(500px)", opacity: 0 }}
            animate={{ transform: "translateZ(0px)", opacity: 1 }}
            exit={{ transform: "translateZ(-100px)", opacity: 0 }}
            transition={{ duration: 0.3, delay: initialDelay }}
            style={{ willChange: "transform, opacity" }}
            className="relative h-auto w-auto rounded-md bg-neutral-100 p-12 shadow-xl"
          >
            <h6 className="w-full text-lg font-medium text-neutral-600 sm:text-2xl">{data?.title}</h6>
            {data?.insights.map((item: string, index: number) => (
              <h6 key={index} className="w-full text-lg text-neutral-600 sm:text-2xl">
                {item}
              </h6>
            ))}
            <motion.div
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: initialDelay + 0.6 }}
              className="flex h-auto w-full rounded-md bg-white"
            >
              {data ? <PieChartComponent data={data.viz1.data} /> : null}
              {data ? <SpiderChartComponent data={data.viz2.data} /> : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="absolute left-2 top-2 rounded bg-black p-2" onClick={() => setFade(!fade)}>
        FADE
      </button>
    </div>
  );
}

// don't judge my any type :(
const getView = async (): Promise<any> => {
  return exampleResponse;
};
