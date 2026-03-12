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

// Sample Weekly Users Data
const weeklyUsersData = [
  { day: "Mon", users: 15 },
  { day: "Tue", users: 20 },
  { day: "Wed", users: 12 },
  { day: "Thu", users: 25 },
  { day: "Fri", users: 18 },
  { day: "Sat", users: 30 },
  { day: "Sun", users: 22 },
];

// Total Users This Month
const totalMonthUsers = 400;

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] px-3 py-2 rounded-xl shadow-lg">
        <p className="text-xs text-[var(--text-secondary)]">{payload[0].payload.day}</p>
        <p className="text-sm font-bold text-[var(--text-primary)]">
          Users: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const UsersGrowthGraph = ({ data = weeklyUsersData, total = totalMonthUsers }) => {
  return (
    <div className="w-full flex flex-col h-52">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xs font-bold text-[var(--text-secondary)]">New Users This Week</h3>
        <span className="text-xs font-black text-[var(--secondary)]">{total} This Month</span>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data} margin={{ top: 5, right: 15, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
          <XAxis dataKey="day" tick={{ fill: "var(--text-secondary)", fontSize: 11, fontWeight: "bold" }} />
          <YAxis tick={{ fill: "var(--text-secondary)", fontSize: 11, fontWeight: "bold" }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--surface-hover)" }} />
          <Bar dataKey="users" fill="var(--secondary)" barSize={18} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersGrowthGraph;