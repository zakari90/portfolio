import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle,
  Target,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export default async function ProjectDetails({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const t = await getTranslations("Projects");

  if (!project) {
    notFound();
  }

  const title = t(`${project.key}_title` as any);
  const desc = t(`${project.key}_desc` as any);

  // These might be empty for projects other than project_1 until we populate them
  const role = t(`${project.key}_role` as any);
  const challenge = t(`${project.key}_challenge` as any);
  const solution = t(`${project.key}_solution` as any);
  const impact = t(`${project.key}_impact` as any);

  // Default to placeholder if translation is missing (i.e. strictly equals the key)
  const isMissing = (val: string, keySuffix: string) =>
    val === `${project.key}_${keySuffix}`;

  return (
    <main className="min-h-screen bg-white text-[#000080] pt-24 pb-20 selection:bg-blue-100">
      {/* Background Grid - matching dashboard */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.2]"
        style={{
          backgroundImage: "radial-gradient(#64748b 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <article className="container max-w-4xl mx-auto px-4 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#000080] transition-colors mb-8 group font-semibold"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Dashboard
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="flex flex-wrap gap-3 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-bold rounded-full bg-slate-50 border border-slate-200 text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-[#000080] tracking-tight">
            {title}
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-medium">
            {desc}
          </p>

          <div className="flex gap-4 mt-8">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-white hover:border-[#000080] hover:text-[#000080] transition-all shadow-sm"
            >
              <Github size={20} />
              View Code
            </a>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#000080] text-white rounded-xl font-bold hover:bg-[#3b3bb1] transition-all shadow-lg shadow-blue-900/10"
            >
              <ExternalLink size={20} />
              Live Demo
            </a>
          </div>
        </header>

        {/* Divider */}
        <div className="h-px w-full bg-slate-100 mb-16" />

        {/* Case Study Content */}
        {!isMissing(challenge, "challenge") ? (
          <div className="space-y-20">
            {/* Role */}
            <section>
              <h3 className="text-xs font-bold text-[#3b3bb1] mb-2 uppercase tracking-widest">
                My Role
              </h3>
              <p className="text-xl font-bold text-[#000080]">{role}</p>
            </section>

            {/* The Challenge */}
            <section className="grid md:grid-cols-[200px_1fr] gap-8">
              <div className="flex items-start gap-3 text-orange-500">
                <Target size={24} className="mt-1" />
                <h2 className="text-2xl font-extrabold text-[#000080]">
                  The Challenge
                </h2>
              </div>
              <div className="text-slate-600 text-lg leading-relaxed font-medium">
                {challenge}
              </div>
            </section>

            {/* The Solution */}
            <section className="grid md:grid-cols-[200px_1fr] gap-8">
              <div className="flex items-start gap-3 text-emerald-500">
                <Lightbulb size={24} className="mt-1" />
                <h2 className="text-2xl font-extrabold text-[#000080]">
                  The Solution
                </h2>
              </div>
              <div className="text-slate-600 text-lg leading-relaxed font-medium">
                {solution}
              </div>
            </section>

            {/* Impact */}
            <section className="bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm">
              <div className="flex items-start gap-4 mb-6 text-blue-600">
                <CheckCircle size={28} />
                <h2 className="text-2xl font-extrabold text-[#000080]">
                  Key Impact
                </h2>
              </div>
              <p className="text-xl text-[#000080] leading-relaxed font-bold">
                {impact}
              </p>
            </section>
          </div>
        ) : (
          <div className="py-20 text-center text-slate-400">
            <p className="text-lg font-medium">
              Detailed case study coming soon for this project.
            </p>
          </div>
        )}
      </article>
    </main>
  );
}
