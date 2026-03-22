"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Sample Weekly Orders Data
const weeklyOrdersData = [
  { day: "Mon", orders: 12 },
  { day: "Tue", orders: 18 },
  { day: "Wed", orders: 10 },
  { day: "Thu", orders: 22 },
  { day: "Fri", orders: 25 },
  { day: "Sat", orders: 30 },
  { day: "Sun", orders: 20 },
];

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] px-3 py-2 rounded-xl shadow-lg">
        <p className="text-xs text-[var(--text-secondary)]">{payload[0].payload.day}</p>
        <p className="text-sm font-bold text-[var(--text-primary)]">
          Orders: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const OrdersOverviewGraph = ({ data = weeklyOrdersData }) => {
  return (
    <div className="w-full h-52">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 15, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
          <XAxis dataKey="day" tick={{ fill: "var(--text-secondary)", fontSize: 11, fontWeight: "bold" }} />
          <YAxis tick={{ fill: "var(--text-secondary)", fontSize: 11, fontWeight: "bold" }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--surface-hover)" }} />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="var(--secondary)"
            strokeWidth={3}
            activeDot={{ r: 6, stroke: "var(--secondary)", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersOverviewGraph;