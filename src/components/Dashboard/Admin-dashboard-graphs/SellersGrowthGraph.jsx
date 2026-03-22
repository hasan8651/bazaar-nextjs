"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Sample Weekly Sellers Data
const weeklySellersData = [
  { day: "Mon", sellers: 2 },
  { day: "Tue", sellers: 3 },
  { day: "Wed", sellers: 1 },
  { day: "Thu", sellers: 4 },
  { day: "Fri", sellers: 3 },
  { day: "Sat", sellers: 5 },
  { day: "Sun", sellers: 2 },
];

// Total Sellers This Month
const totalMonthSellers = 120;

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] px-3 py-2 rounded-xl shadow-lg">
        <p className="text-xs text-[var(--text-secondary)]">{payload[0].payload.day}</p>
        <p className="text-sm font-black text-green-500">
          Sellers: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const SellersGrowthGraph = ({ data = weeklySellersData, total = totalMonthSellers }) => {
  return (
    <div className="w-full flex flex-col h-52 bg-[var(--surface)] p-3 rounded-2xl shadow-sm border border-[var(--border)]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xs font-bold text-[var(--text-secondary)]">New Sellers This Week</h3>
        <span className="text-xs font-black text-green-500">{total} This Month</span>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data} margin={{ top: 5, right: 15, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
          <XAxis dataKey="day" tick={{ fill: "var(--text-secondary)", fontSize: 11, fontWeight: "bold" }} />
          <YAxis tick={{ fill: "var(--text-secondary)", fontSize: 11, fontWeight: "bold" }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--surface-hover)" }} />
          <Bar
            dataKey="sellers"
            fill="url(#sellersGradient)"
            barSize={20}
            radius={[6, 6, 0, 0]}
          />
          <defs>
            <linearGradient id="sellersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.7}/>
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0.2}/>
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SellersGrowthGraph;