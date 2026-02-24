import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import DashboardGrid, { DashboardCard } from "@/components/DashboardGrid";
import StatsSection from "@/components/StatsSection";
import { useTranslations } from "next-intl";
import { Github, Linkedin } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FloatingDrop from "@/components/FloatingDrop";

export default function Home() {
  const ct = useTranslations("Contact");
  const pt = useTranslations("Projects");
  const st = useTranslations("TechStack");
  const ft = useTranslations("Footer");

  return (
    <main className="min-h-screen py-8">
      <FloatingDrop />
      <DashboardGrid>
        {/* Main Hero Widget */}
        <div className="col-span-full" id="hero">
          <DashboardCard>
            <Hero />
          </DashboardCard>
        </div>
        {/* Stats Widgets */}
        <StatsSection />
        {/* Tech Stack Widget */}
        <div className="col-span-full" id="techstack">
          <DashboardCard title={st("title")}>
            <TechStack />
          </DashboardCard>
        </div>
        {/* Projects Widget */}
        <div className="col-span-full" id="projects">
          <DashboardCard title={pt("title_start") + " " + pt("title_end")}>
            <Projects />
          </DashboardCard>
        </div>
        {/* Contact Widget */}
        <div className="col-span-full" id="contact">
          <DashboardCard title={ct("title_start") + " " + ct("title_end")}>
            <Contact />
          </DashboardCard>
        </div>
        {/* Footer */}
        <div className="col-span-full py-8 text-center text-zinc-600 text-sm">
          <p>{ft("copyright", { year: new Date().getFullYear() })}</p>
          <>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/zakari90"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#000080] transition-colors"
              >
                <Github size={18} />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-[#000080] transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </>
        </div>
      </DashboardGrid>
    </main>
  );
}
