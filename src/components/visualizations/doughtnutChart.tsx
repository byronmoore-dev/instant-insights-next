import React from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
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
  const minR = 50;
  const maxR = 90;

  // Clamp width to be within minW and maxW
  const clampedWidth = Math.max(minW, Math.min(maxW, width));
  return minR + ((clampedWidth - minW) * (maxR - minR)) / (maxW - minW);
};

const calculateRadii = (index: number, len: number, maxOuterRadius: number): [number, number] => {
  const initialOuterRadius = maxOuterRadius;
  const initialInnerRadius = 0.5 * maxOuterRadius + 10;
  const decrement = (13 * index) / (len - 1);
  return [initialInnerRadius + decrement / 2, initialOuterRadius - decrement / 2];
};

const DoughnutChart: React.FC<PieChartComponentProps> = ({ data: inputData }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { containerWidth } = useContainerWidth({ ref: containerRef });
  const maxOuterRadius = interpolateOuterRadius(containerWidth);

  const data = inputData.sort((a, b) => b.value - a.value);
  const total = data.reduce((acc, { value }) => acc + value, 0);
  let accumulatedAngle = 90;

  const renderPie = (entry: PieData, index: number) => {
    const [innerRadius, outerRadius] = calculateRadii(index, data.length, maxOuterRadius);
    const percentage = entry.value / total;
    const startAngle = accumulatedAngle;
    const endAngle = startAngle + percentage * 360;

    accumulatedAngle += percentage * 360;

    return (
      <Pie
        key={`pie-${index}`}
        data={[entry]}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        nameKey="label"
        dataKey="value"
        startAngle={startAngle}
        endAngle={endAngle}
      >
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      </Pie>
    );
  };

  return (
    <div className="w-full h-60 md:h-auto md:aspect-square" ref={containerRef}>
      <ResponsiveContainer width="100%" height="100%" key={containerWidth}>
        <PieChart>
          {data.map(renderPie)}
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DoughnutChart;
