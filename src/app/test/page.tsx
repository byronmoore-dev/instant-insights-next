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
    queryKey: ["get_view"],
    queryFn: async () => await getView(),
  });

  useEffect(() => {
    setInitialDelay(0);
  }, []);

  if (status !== "success") return null;

  return (
    <div
      style={{ perspective: "1000px" }}
      className="absolute z-20 top-0 left-0 w-full h-screen bg-white flex justify-center items-center flex-col overflow-hidden"
    >
      <AnimatePresence>
        {fade && (
          <motion.div
            initial={{ transform: "translateZ(500px)", opacity: 0 }}
            animate={{ transform: "translateZ(0px)", opacity: 1 }}
            exit={{ transform: "translateZ(-100px)", opacity: 0 }}
            transition={{ duration: 0.3, delay: initialDelay }}
            style={{ willChange: "transform, opacity" }}
            className="relative w-auto p-12 h-auto bg-neutral-100 rounded-md shadow-xl"
          >
            <h6 className="w-full text-xl font-bold text-neutral-800 sm:text-2xl">Output</h6>
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
              className="flex w-full h-auto bg-white rounded-md"
            >
              {data ? <PieChartComponent data={data.viz1.data} /> : null}
              {data ? <SpiderChartComponent data={data.viz2.data} /> : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="bg-black p-2 rounded absolute top-2 left-2" onClick={() => setFade(!fade)}>
        FADE
      </button>
    </div>
  );
}

// don't judge my any type :(
const getView = async (): Promise<any> => {
  return exampleResponse;
};
