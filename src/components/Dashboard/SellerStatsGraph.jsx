"use client";

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const DATA = [
  { name: 'Mon', sales: 1200 },
  { name: 'Tue', sales: 2100 },
  { name: 'Wed', sales: 1800 },
  { name: 'Thu', sales: 3000 },
  { name: 'Fri', sales: 2500 },
  { name: 'Sat', sales: 4200 },
  { name: 'Sun', sales: 3800 },
];

export default function SellerStatsGraph() {
  return (
    <div className="w-full h-87.5">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-(--text-primary)">Sales Performance</h3>
        <p className="text-xs text-(--text-secondary) opacity-60">Revenue generated over the last 7 days</p>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "var(--surface)", 
              borderRadius: "12px", 
              border: "1px solid var(--border)",
              fontSize: "12px"
            }} 
          />
          <Area 
            type="monotone" 
            dataKey="sales" 
            stroke="#22c55e" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorSales)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}