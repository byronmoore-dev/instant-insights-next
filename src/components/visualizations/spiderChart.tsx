"use client";

import React, { useEffect, useRef, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import useContainerWidth from "./useContainerWidth";

interface SpiderData {
  label: string;
  value: number;
  max: number;
}

interface SpiderChartComponentProps {
  data: SpiderData[];
}

const SpiderChartComponent: React.FC<SpiderChartComponentProps> = ({ data }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { containerWidth } = useContainerWidth({ ref: containerRef });

  return (
    <div className="w-full aspect-square" ref={containerRef}>
      <ResponsiveContainer width={"100%"} height={"100%"} key={containerWidth}>
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="label" />
          <Radar name="Amount" dataKey="value" stroke="#8884d8" fill="#BFA3F1" fillOpacity={0.5} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpiderChartComponent;
