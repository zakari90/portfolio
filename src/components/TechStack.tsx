"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const skills = [
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    dot: "bg-blue-500",
  },
  {
    name: "React / Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    dot: "bg-indigo-600",
  },
  {
    name: "Node.js / Express",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    dot: "bg-green-600",
  },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    dot: "bg-cyan-500",
  },
  {
    name: "PostgreSQL / MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    dot: "bg-emerald-600",
  },
  {
    name: "GraphQL / APIs",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    dot: "bg-pink-500",
  },
  {
    name: "Socket.io / Real-time",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
    dot: "bg-orange-600",
  },
  {
    name: "PWA / Offline-First",
    logo: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/pwa.svg",
    dot: "bg-sky-500",
  },
  {
    name: "Zustand / State",
    logo: "/zustand-original.svg",
    dot: "bg-purple-600",
  },
  {
    name: "Docker / DevOps",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    dot: "bg-blue-600",
  },
  {
    name: "System Design",
    logo: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/blueprint.svg",
    dot: "bg-amber-600",
  },
];

export default function TechStack() {
  const t = useTranslations("TechStack");

  return (
    <div id="techstack" className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
            className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-100 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 transition-all hover:bg-slate-50 group relative overflow-hidden text-center sm:text-left"
          >
            <div
              className={cn(
                "absolute top-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full",
                skill.dot,
              )}
            />
            <div className="group-hover:scale-110 transition-transform duration-300 shrink-0 p-2 bg-slate-50 rounded-xl shadow-sm w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center overflow-hidden">
              <img
                src={skill.logo}
                alt={skill.name}
                className="w-full h-full object-contain"
              />
            </div>
            <span
              className="font-bold text-slate-700 group-hover:text-[#000080] text-xs sm:text-sm"
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
