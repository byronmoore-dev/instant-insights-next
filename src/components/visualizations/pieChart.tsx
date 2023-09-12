import { suppressRechartsWarnings } from "@/lib/utils";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useContainerWidth from "./useContainerWidth";

interface PieData {
  label: string;
  value: number;
}

interface PieChartComponentProps {
  data: PieData[];
}

const COLORS = ["#8F98D7", "#B68FD7", "#D78FC2", "#D78F8F"];

const interpolateOuterRadius = (width: number): number => {
  const minW = 100;
  const maxW = 380;
  const minR = 40;
  const maxR = 90;

  // Clamp width to be within minW and maxW
  const clampedWidth = Math.max(minW, Math.min(maxW, width));
  return minR + ((clampedWidth - minW) * (maxR - minR)) / (maxW - minW);
};

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { containerWidth } = useContainerWidth({ ref: containerRef });
  suppressRechartsWarnings();

  return (
    <div className="h-48 w-full md:aspect-square md:h-auto" ref={containerRef}>
      <ResponsiveContainer width={"100%"} height={"100%"} key={containerWidth}>
        <PieChart>
          <Pie activeIndex={0} data={data} outerRadius={interpolateOuterRadius(containerWidth)} fill="#8884d8" nameKey="label" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
