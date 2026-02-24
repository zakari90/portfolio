"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Globe,
  Layout,
  Server,
  Smartphone,
  Terminal,
  Cpu,
  Zap,
  Layers,
  Webhook,
  Cloud,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
    </div>
  );
}
