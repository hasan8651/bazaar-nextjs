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
import { Loader2, TrendingUp, Filter } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Modern DashboardGraph Component
 * @param {Array} data - Array of objects for the chart [{name: 'Jan', value: 400}]
 * @param {string} title - Main heading
 * @param {string} subtitle - Sub-heading description
 * @param {boolean} fetching - Loading state indicator
 */
export default function DashboardGraph({ data, title, subtitle, fetching = false }) {
  
  // Custom Tooltip Component for a premium look
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[var(--surface)] border border-[var(--border)] p-4 rounded-2xl shadow-xl backdrop-blur-md">
          <p className="text-[10px] font-black uppercase text-[var(--text-secondary)] tracking-widest mb-1">
            {label}
          </p>
          <div className="space-y-1">
            <p className="text-xl font-black text-[var(--secondary)]">
              ৳{payload[0].value.toLocaleString()}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      className="bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] p-6 md:p-10 shadow-sm h-full group hover:shadow-md transition-all duration-300"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
              {title}
            </h3>
            <div className="p-1.5 bg-green-500/10 text-green-500 rounded-full">
              <TrendingUp size={14} strokeWidth={3} />
            </div>
          </div>
          <p className="text-sm text-[var(--text-secondary)] font-medium opacity-70">
            {subtitle}
          </p>
        </div>
        
        {/* Action Button */}
        <button className="self-start flex items-center gap-2 px-4 py-2 bg-[var(--background)] border border-[var(--border)] text-[var(--text-primary)] rounded-xl text-xs font-bold transition-all hover:border-[var(--secondary)]/40 active:scale-95">
          <Filter size={14} className="text-[var(--secondary)]" />
          Analytics Filter
        </button>
      </div>

      {/* Chart Visualization */}
      <div className="h-80 w-full relative">
        {fetching ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <Loader2 className="animate-spin text-[var(--secondary)] w-8 h-8" />
            <p className="text-xs font-bold text-[var(--text-secondary)] tracking-widest uppercase">Syncing Data...</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              {/* Define Gradients for the Area fill */}
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              
              {/* Background Grid Lines */}
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="var(--border)" 
                opacity={0.5} 
              />
              
              {/* Horizontal and Vertical Axes */}
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "var(--text-secondary)", fontSize: 11, fontWeight: 600 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "var(--text-secondary)", fontSize: 11, fontWeight: 600 }}
                tickFormatter={(val) => `৳${val}`}
              />
              
              {/* Interaction Tooltip */}
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ stroke: 'var(--secondary)', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              
              {/* The Main Data Area */}
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--secondary)"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorValue)"
                animationDuration={2000}
                activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--secondary)' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}