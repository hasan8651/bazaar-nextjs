import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const DashboardCard = ({ title, value, subtitle, icon: Icon, trend, trendType }) => {
  return (
    <div className="relative overflow-hidden group p-6 rounded-2xl bg-(--surface) border border-(--border) shadow-sm hover:border-(--secondary)/30 transition-all duration-300">
      
      {/* Background Shape - Premium Touch */}
      <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-(--secondary) opacity-[0.03] rounded-full scale-150 group-hover:scale-125 transition-transform duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-[10px] font-bold text-(--text-secondary) uppercase tracking-[0.15em] mb-1">
              {title}
            </h3>
            <p className="text-[11px] text-(--text-primary) font-medium opacity-70">
              {subtitle}
            </p>
          </div>
          <div className="p-3 bg-(--secondary)/10 rounded-xl group-hover:scale-110 group-hover:bg-(--secondary)/20 transition-all duration-300">
            {Icon && <Icon size={20} className="text-(--secondary)" />}
          </div>
        </div>
        
        <div className="flex items-end justify-between gap-4">
          <p className="text-2xl font-black text-(--text-primary) tracking-tight">
            {value}
          </p>
          
          {trend && (
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
              trendType === "up" 
                ? "text-green-500 bg-green-500/10" 
                : "text-amber-500 bg-amber-500/10"
            }`}>
              {trendType === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {trend}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;