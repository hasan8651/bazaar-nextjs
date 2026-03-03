// src/components/dashboard/DashboardGraph.jsx
"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * DashboardGraph Component
 * @param {Array} data - Array of objects for the chart
 * @param {string} title - Main title of the graph
 * @param {string} subtitle - Short description below title
 */
export default function DashboardGraph({ data, title, subtitle }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm h-full">
      {/* Graph Header */}
      <div className="flex flex-col mb-6">
        <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-[var(--text-secondary)] font-medium">
          {subtitle}
        </p>
      </div>

      {/* Chart Container */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            {/* Gradient definition for the area fill */}
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="var(--border)" 
              opacity={0.4} 
            />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
              dy={10}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "var(--text-secondary)", fontSize: 12 }} 
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "var(--surface)", 
                borderColor: "var(--border)", 
                borderRadius: "12px",
                fontSize: "12px",
                color: "var(--text-primary)"
              }} 
            />
            
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--secondary)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#chartGradient)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}