"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section id="hero" className="relative overflow-hidden py-12 bg-white">
      {/* Illustrative Background - matching inspiration dots and lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.4]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="nodes"
              x="0"
              y="0"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="3" fill="#000080" opacity="0.4" />
              <circle cx="120" cy="50" r="4" fill="#3b3bb1" opacity="0.3" />
              <circle cx="60" cy="140" r="3" fill="#ff4d4d" opacity="0.3" />
              <circle cx="160" cy="110" r="3" fill="#00ffff" opacity="0.3" />
              <line
                x1="20"
                y1="20"
                x2="120"
                y2="50"
                stroke="#64748b"
                strokeWidth="0.5"
                opacity="0.2"
              />
              <line
                x1="120"
                y1="50"
                x2="60"
                y2="140"
                stroke="#64748b"
                strokeWidth="0.5"
                opacity="0.2"
              />
              <line
                x1="60"
                y1="140"
                x2="160"
                y2="110"
                stroke="#64748b"
                strokeWidth="0.5"
                opacity="0.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#nodes)" />
        </svg>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h2 className="text-[#3b3bb1] font-bold text-sm tracking-widest uppercase">
            {t("greeting")}
          </h2>
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-[#000080] leading-tight">
            {t("title_start")}{" "}
            <span className="text-[#3b3bb1]">{t("title_end")}</span>
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-md">
            {t("description")}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="px-8 py-3 bg-[#000080] text-white font-bold rounded-xl hover:bg-[#3b3bb1] transition-all shadow-xl shadow-blue-900/20"
            >
              {t("view_projects")}
            </a>
          </div>
        </motion.div>

        <div className="flex justify-center lg:justify-end items-center relative">
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="relative w-48 h-48 lg:w-64 lg:h-64"
          >
            {/* Skills Lottie - floating near headshot */}

            <div className="absolute inset-0 bg-blue-100 blur-[80px] rounded-full opacity-50" />
            <div className="relative w-full h-full rounded-[40px] overflow-hidden border-8 border-white bg-slate-50 shadow-2xl">
              <Image
                src="/founder.jpg"
                alt="Zakaria Headshot"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
