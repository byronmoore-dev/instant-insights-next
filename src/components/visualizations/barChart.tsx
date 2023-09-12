import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import useContainerWidth from "./useContainerWidth";

interface BarData {
  label: string;
  value: number;
}

interface BarChartComponentProps {
  data: BarData[];
}

const COLORS = ["#8F98D7", "#B68FD7", "#D78FC2", "#D78F8F"];

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { containerWidth } = useContainerWidth({ ref: containerRef });

  console.log("Bar;", data);

  return (
    <div className="h-48 w-full md:aspect-square md:h-auto" ref={containerRef}>
      <ResponsiveContainer width={"100%"} height={"100%"} key={containerWidth}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
