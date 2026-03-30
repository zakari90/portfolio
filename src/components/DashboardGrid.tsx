"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  id?: string;
  showCardOnMobile?: boolean;
}

export function DashboardCard({
  children,
  className,
  title,
  id,
  showCardOnMobile = false,
}: DashboardCardProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "bg-white rounded-3xl p-4 sm:p-6 h-full transition-all sm:hover:shadow-xl sm:hover:shadow-blue-900/5 sm:hover:border-blue-100 sm:shadow-sm sm:border sm:border-slate-200",
        showCardOnMobile ? "shadow-sm border border-slate-200" : "shadow-none border-none",
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 p-4 sm:p-6">
      {children}
    </div>
  );
}
