"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Cloud,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Layout,
  Server,
  Smartphone,
  Webhook,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";

const skills = [
  {
    name: "TypeScript",
    icon: <Code2 size={24} />,
    color: "text-blue-500",
    dot: "bg-blue-500",
  },
  {
    name: "React / Next.js",
    icon: <Globe size={24} />,
    color: "text-indigo-600",
    dot: "bg-indigo-600",
  },
  {
    name: "Node.js / Express",
    icon: <Server size={24} />,
    color: "text-green-600",
    dot: "bg-green-600",
  },
  {
    name: "Tailwind CSS",
    icon: <Layout size={24} />,
    color: "text-cyan-500",
    dot: "bg-cyan-500",
  },
  {
    name: "PostgreSQL / MongoDB",
    icon: <Database size={24} />,
    color: "text-emerald-600",
    dot: "bg-emerald-600",
  },
  {
    name: "GraphQL / APIs",
    icon: <Zap size={24} />,
    color: "text-pink-500",
    dot: "bg-pink-500",
  },
  {
    name: "Socket.io / Real-time",
    icon: <Webhook size={24} />,
    color: "text-orange-600",
    dot: "bg-orange-600",
  },
  {
    name: "PWA / Offline-First",
    icon: <Smartphone size={24} />,
    color: "text-sky-500",
    dot: "bg-sky-500",
  },
  {
    name: "Zustand / State",
    icon: <Layers size={24} />,
    color: "text-purple-600",
    dot: "bg-purple-600",
  },
  {
    name: "Docker / DevOps",
    icon: <Cloud size={24} />,
    color: "text-blue-600",
    dot: "bg-blue-600",
  },
  {
    name: "System Design",
    icon: <Cpu size={24} />,
    color: "text-amber-600",
    dot: "bg-amber-600",
  },
];

export default function TechStack() {
  const t = useTranslations("TechStack");

  return (
    <div id="techstack" className="space-y-8">
      {/* Desktop Grid View */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.05,
              borderColor: "#3b3bb1",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 128, 0.05)",
            }}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4 transition-all hover:bg-white group relative overflow-hidden"
          >
            <div
              className={cn(
                "absolute top-2 right-2 w-2 h-2 rounded-full",
                skill.dot,
              )}
            />
            <div
              className={`${skill.color} group-hover:scale-110 transition-transform duration-300 shrink-0 p-2 bg-white rounded-xl shadow-sm`}
            >
              {skill.icon}
            </div>
            <span
              className="font-bold text-slate-700 group-hover:text-[#000080]"
              dir="ltr"
            >
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Mobile Carousel View */}
      <div className="md:hidden overflow-hidden relative p-1">
        <motion.div
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }} // Dynamic constraints would be better but this is a quick win
          className="flex gap-4 cursor-grab active:cursor-grabbing pb-4"
          style={{ width: "max-content" }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4 transition-all hover:bg-white group relative overflow-hidden shrink-0 w-[240px]"
            >
              <div
                className={cn(
                  "absolute top-2 right-2 w-2 h-2 rounded-full",
                  skill.dot,
                )}
              />
              <div
                className={`${skill.color} group-hover:scale-110 transition-transform duration-300 shrink-0 p-2 bg-white rounded-xl shadow-sm`}
              >
                {skill.icon}
              </div>
              <span
                className="font-bold text-slate-700 group-hover:text-[#000080]"
                dir="ltr"
              >
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
        {/* Subtle indicator for scrollability */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-white to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
