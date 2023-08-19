import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

interface SpiderData {
  label: string;
  value: number;
  max: number;
}

interface SpiderChartComponentProps {
  data: SpiderData[];
}

const SpiderChartComponent: React.FC<SpiderChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width={400} height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="label" />
        <PolarRadiusAxis domain={[0, Math.max(...data.map((item) => item.max))]} />
        <Radar name="Mike" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SpiderChartComponent;
