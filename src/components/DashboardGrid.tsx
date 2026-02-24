"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  id?: string;
}

export function DashboardCard({
  children,
  className,
  title,
  id,
}: DashboardCardProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "bg-white border border-slate-200 rounded-3xl p-6 h-full transition-all hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-100 shadow-sm",
        className,
      )}
    >
      {title && (
        <h3 className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-6">
          {title}
        </h3>
      )}
      {children}
    </motion.section>
  );
}

export default function DashboardGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 p-6">
      {children}
    </div>
  );
}
