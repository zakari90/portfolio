"use client";

import { motion } from "framer-motion";
import { Users, Code, Award, Coffee } from "lucide-react";
import { DashboardCard } from "./DashboardGrid";

const stats = [
  {
    label: "Experience",
    value: "1+ Years",
    icon: Award,
    color: "text-blue-600",
  },
  { label: "Projects", value: "10+", icon: Code, color: "text-orange-500" },
  { label: "Clients", value: "3+", icon: Users, color: "text-emerald-500" },
];

export default function StatsSection() {
  return (
    <>
      {stats.map((stat, index) => (
        <DashboardCard key={stat.label} className="lg:col-span-3">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-2xl bg-slate-50 border border-slate-100 ${stat.color}`}
            >
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                {stat.label}
              </p>
              <h4 className="text-xl font-bold text-[#000080] tracking-tight">
                {stat.value}
              </h4>
            </div>
          </div>
        </DashboardCard>
      ))}
    </>
  );
}
