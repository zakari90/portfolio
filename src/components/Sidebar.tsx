"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Briefcase, Code2, LayoutDashboard, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

const menuIcons = [
  { icon: LayoutDashboard, key: "overview", href: "#overview", id: "hero" },
  { icon: Code2, key: "skills", href: "#skills", id: "techstack" },
  { icon: Briefcase, key: "projects", href: "#projects", id: "projects" },
  { icon: Mail, key: "contact", href: "#contact", id: "contact" },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const t = useTranslations("Navigation");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    menuIcons.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside
      className={cn(
        " fixed top-0 left-0 h-screen z-50 transition-all duration-300   flex flex-col rtl:left-auto",
        isCollapsed ? "w-20" : "w-fit",
      )}
    >
      {/* Logo / Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#000080] flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/10">
          <span className="text-white font-bold font-mono">Z</span>
        </div>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-xl tracking-tight text-[#000080] whitespace-nowrap"
          >
            <span className="text-red-600">.</span>Z
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 mt-4">
        {menuIcons.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.key}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-all group relative overflow-hidden",
                isActive
                  ? "bg-blue-50 text-[#000080] w-fit"
                  : "text-slate-500 hover:text-[#000080] hover:bg-slate-50 w-fit",
              )}
            >
              <item.icon
                size={20}
                className={cn(
                  "shrink-0",
                  isActive
                    ? "text-[#000080]"
                    : "text-slate-400 group-hover:text-[#000080]",
                )}
              />

              {/* Only show label if this specific item is active */}
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-semibold whitespace-nowrap text-sm sr-only md:not-sr-only"
                >
                  {t(item.key as any)}
                </motion.span>
              )}

              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#000080] rounded-r-full rtl:left-auto rtl:right-0 rtl:rounded-l-full rtl:rounded-r-none"
                />
              )}
            </a>
          );
        })}
      </nav>

      {/* Footer / Socials / Language */}
      <div className="p-4 border-t border-slate-100 space-y-4">
        <LanguageSwitcher />
      </div>
    </aside>
  );
}
