"use client";

import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChartType, InsightProps, ViewProps } from "@/types/general";
import PieChartComponent from "../visualizations/pieChart";
import { getInsights } from "@/app/actions";
import DoughnutChart from "../visualizations/doughtnutChart";
import SpiderChartComponent from "../visualizations/spiderChart";
import { AnimatePresence, motion } from "framer-motion";
import BarChartComponent from "../visualizations/barChart";
import LineChartComponent from "../visualizations/lineChart";
import { dropStaggerItem, staggerContainer, staggerItem } from "@/lib/animConstants";

export async function getInsights2(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = [
        {
          id: "40eb3f25-dbc7-467c-a859-7ed14ea00091",
          user_id: "bae4972e-600d-4475-83eb-b9a0041222c9",
          view_id: "6102d335-6072-4e2f-a0dc-06647ace50a5",
          data: [
            { label: "Sunday", value: 385 },
            { label: "Monday", value: 497.25 },
            { label: "Tuesday", value: 470.25 },
            { label: "Wednesday", value: 438.75 },
            { label: "Thursday", value: 315.5 },
            { label: "Friday", value: 353.25 },
            { label: "Saturday", value: 436 },
          ],
          title: "Sales by Day of Week",
          context: "This line chart shows the sales of different products by the day of the week.",
          chart_type: "lineChart",
          base_insight: "Sales were highest on Saturdays",
        },
        {
          id: "ea9182ee-cfbd-42e9-a5eb-efc17bfe1056",
          user_id: "bae4972e-600d-4475-83eb-b9a0041222c9",
          view_id: "6102d335-6072-4e2f-a0dc-06647ace50a5",
          data: [
            { max: 47, label: "Medium", value: 9 },
            { max: 55, label: "Large", value: 7 },
            { max: 31, label: "Small", value: 6 },
          ],
          title: "Popularity of Drink Sizes",
          context: "Based on the data, medium-sized drinks were the most popular among customers.",
          chart_type: "doughnutChart",
          base_insight: "Medium-sized drinks were the most popular",
        },
        {
          id: "56c0aa1e-0599-49fd-85df-a6b6989a837f",
          user_id: "bae4972e-600d-4475-83eb-b9a0041222c9",
          view_id: "6102d335-6072-4e2f-a0dc-06647ace50a5",
          data: [
            { label: "Cappuccino", value: 6 },
            { label: "Black Coffee", value: 4 },
            { label: "Mocha", value: 4 },
            { label: "Latte", value: 5 },
            { label: "Espresso", value: 4 },
            { label: "Americano", value: 4 },
            { label: "Flat White", value: 3 },
          ],
          title: "Distribution of Product Sales",
          context:
            "The pie chart shows the proportional distribution of sales for different products. The data is based on the number of units sold for each product.",
          chart_type: "pieChart",
          base_insight: "Mocha was the most popular product",
        },
        {
          id: "b25097a9-1863-4ad0-888f-2341376ea7a6",
          user_id: "bae4972e-600d-4475-83eb-b9a0041222c9",
          view_id: "6102d335-6072-4e2f-a0dc-06647ace50a5",
          data: [
            { label: "Sunday", value: 35 },
            { label: "Monday", value: 30 },
            { label: "Tuesday", value: 38 },
            { label: "Wednesday", value: 37 },
            { label: "Thursday", value: 48 },
            { label: "Friday", value: 45 },
            { label: "Saturday", value: 38 },
          ],
          title: "Number of Units Sold by Day",
          context: "This bar chart shows the number of units sold for each day of the week. Sunday had the highest number of units sold.",
          chart_type: "barChart",
          base_insight: "Sunday had the highest number of units sold",
        },
        {
          id: "40d17d48-2b56-4085-a643-316b157a629e",
          user_id: "bae4972e-600d-4475-83eb-b9a0041222c9",
          view_id: "6102d335-6072-4e2f-a0dc-06647ace50a5",
          data: [
            { max: 30, label: "Medium", value: 10 },
            { max: 30, label: "Large", value: 7 },
            { max: 30, label: "Small", value: 5 },
          ],
          title: "Popularity of Drink Sizes",
          context:
            "The data shows the sales of different drink sizes over a period of time. The medium-sized drinks were the most popular choice among customers, followed by large-sized drinks and then small-sized drinks.",
          chart_type: "doughnutChart",
          base_insight: "Medium-sized drinks were the most popular",
        },
      ];

      resolve(res);
    }, 5000);
  });
}

const VizRouter = ({ type, data }: { type: ChartType; data: any }) => {
  switch (type) {
    case "doughnutChart":
      return <DoughnutChart data={data} />;
    case "pieChart":
      return <PieChartComponent data={data} />;
    case "radarChart":
      return <SpiderChartComponent data={data} />;
    case "barChart":
      return <BarChartComponent data={data} />;
    case "lineChart":
      return <LineChartComponent data={data} />;
    default:
      return <p>form router error kek</p>;
  }
};

const Tile = ({ item, isNew, isInitialLoad }: { item: InsightProps; isNew: boolean; isInitialLoad: boolean }) => {
  const tileVariants = isInitialLoad
    ? staggerItem
    : {
        hidden: isNew ? { scale: 1.2, opacity: 0 } : {},
        show: isNew ? { scale: 1, opacity: 1 } : {},
      };

  const purpleDivVariants = {
    hidden: { x: 40 },
    show: { x: 0, transition: { delay: 1.2, duration: 0.4 } },
  };

  return (
    <motion.div
      variants={tileVariants}
      initial="hidden"
      animate="show"
      transition={{
        opacity: { duration: 0.3, delay: 0.5 },
        scale: { duration: 0.2, delay: 0.5 },
        layout: { duration: 0.4 },
      }}
      layout={!isNew}
      layoutId={item.id}
      key={item.id}
      style={{ willChange: "transform, opacity" }}
      className="relative flex h-96 w-full overflow-hidden rounded-xl border-[1.5px] border-l-border bg-l-foreground p-8 dark:border-d-border dark:bg-d-foreground"
    >
      {/* Purple Div */}
      <motion.div
        className="absolute -right-20 -top-20 z-0 h-64 w-64 rounded-full bg-purple-300/60 blur-[100px] dark:bg-purple-900/30"
        variants={purpleDivVariants}
        initial="hidden"
        animate="show"
      />

      <div className="z-10 flex w-full max-w-xl flex-col gap-4">
        <h2 className="text-2xl font-medium text-l-text-main dark:text-d-text-main">{item?.title}</h2>
        <p className="text-base text-l-text-second dark:text-d-text-second">{item?.context}</p>
      </div>

      <VizRouter type={item.chart_type as ChartType} data={item.data} />
    </motion.div>
  );
};

export default function Insights({ viewData }: { viewData: ViewProps }) {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { data, status, isFetched } = useQuery<InsightProps[], Error>({
    queryKey: ["get-insights", viewData?.id],
    queryFn: () => getInsights(viewData?.id),
  });

  const prevDataRef = useRef<any>(null);

  useEffect(() => {
    prevDataRef.current = data;
    if (data && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [data]);

  const isNewItem = (item: InsightProps): boolean => {
    if (!prevDataRef.current) return true; // If there's no previous data, consider the item as new
    return !prevDataRef.current.some((prevItem: any) => prevItem.id === item.id);
  };

  if (status === "loading") {
    return (
      <div className="flex w-full flex-col-reverse gap-8">
        <div className="flex h-72 w-full rounded-xl bg-d-foreground p-8">
          <p className="text-white">Loading</p>
        </div>
      </div>
    );
  }

  if (!data || data?.length === 0) {
    return (
      <div className="flex w-full flex-col-reverse gap-8">
        <div className="flex h-72 w-full items-center justify-center rounded-xl bg-d-foreground p-8">
          <h6 className="text-xl font-semibold text-l-text-main dark:text-d-text-main">Click an insight above to explore your data</h6>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial="hidden" animate="show" variants={staggerContainer} className="relative flex flex-col-reverse gap-8 pb-16">
      {data && data?.map((item: InsightProps) => <Tile item={item} isNew={isNewItem(item)} isInitialLoad={isInitialLoad} key={item.id} />)}
    </motion.div>
  );
}
