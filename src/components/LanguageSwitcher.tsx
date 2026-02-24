"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    // Cycle: en -> ar -> fr -> en
    let nextLocale = "en";
    if (locale === "en") nextLocale = "ar";
    else if (locale === "ar") nextLocale = "fr";

    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="w-fit flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-[#000080] hover:border-slate-300 transition-all shadow-xs group"
    >
      <Globe
        size={14}
        className="group-hover:text-blue-600 transition-colors"
      />
      <span className="text-[10px] font-bold uppercase tracking-wider">
        {locale.toUpperCase()}
      </span>
    </button>
  );
}
