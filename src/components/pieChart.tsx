import { suppressRechartsWarnings } from "@/lib/utils";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface PieData {
  label: string;
  value: number;
}

interface PieChartComponentProps {
  data: PieData[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
  suppressRechartsWarnings();

  const result = (
    <PieChart width={400} height={400}>
      <Pie activeIndex={0} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" nameKey="label" dataKey="value">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );

  return result;
};

export default PieChartComponent;
