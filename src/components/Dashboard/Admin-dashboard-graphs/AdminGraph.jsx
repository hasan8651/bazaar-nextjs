"use client";

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

/**
 * Global Sales Data for Admin
 * This represents the sum of all sales across the platform.
 */
const globalSalesData = [
  { name: 'Mon', total: 12000 },
  { name: 'Tue', total: 9500 },
  { name: 'Wed', total: 15000 },
  { name: 'Thu', total: 11000 },
  { name: 'Fri', total: 8000 },
  { name: 'Sat', total: 19000 },
  { name: 'Sun', total: 22000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs font-bold border border-slate-700">
        <p className="mb-1 text-slate-400">{label}</p>
        <p className="text-sm font-black text-blue-400">
          Global Sales: ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const AdminGraph = () => {
  return (
    <div className="h-80 w-full -ml-6 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={globalSalesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="adminSalesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
          <XAxis 
            dataKey="name" 
            tickLine={false} 
            axisLine={false} 
            tick={{ fontSize: 11, fontWeight: 'bold', fill: 'var(--text-secondary)' }}
          />
          <YAxis 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `$${value/1000}k`}
            tick={{ fontSize: 11, fontWeight: 'bold', fill: 'var(--text-secondary)' }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--surface-hover)' }} />
          <Area 
            type="monotone" 
            dataKey="total" 
            stroke="#2563eb" 
            strokeWidth={4} 
            fillOpacity={1} 
            fill="url(#adminSalesGradient)" 
            activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminGraph;