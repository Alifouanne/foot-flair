"use client";
import React from "react";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  ResponsiveContainer,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
interface Props {
  data: {
    date: string;
    revenue: number;
  }[];
}

const aggregateData = (data: any) => {
  const aggregated = data.reduce((acc: any, curr: any) => {
    if (acc[curr.date]) {
      acc[curr.date] += curr.revenue;
    } else {
      acc[curr.date] = curr.revenue;
    }
    return acc;
  }, {});
  return Object.keys(aggregated).map((date) => ({
    date,
    revenue: aggregated[date],
  }));
};
const Chart = ({ data }: Props) => {
  const procdata = aggregateData(data);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={procdata}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          stroke="#3b82f6"
          activeDot={{ r: 8 }}
          dataKey="revenue"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
