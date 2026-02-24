"use client";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { MouseEvent, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { projects as projectsData } from "@/data/projects_data";

function ProjectCard({
  project,
  onShowPreview,
}: {
  project: any;
  onShowPreview: (img: string) => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const t = useTranslations("Projects");
  const locale = useLocale();

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

  const hasDemo = project.demoUrl && project.demoUrl !== project.githubUrl;
  const showPreview = !hasDemo && project.image;

  return (
    <motion.div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={onMouseMove}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        className="relative h-full p-6 rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden group hover:border-[#3b3bb1] hover:shadow-xl hover:shadow-blue-900/5 transition-all"
      >
        {project.image ? (
          <div className="absolute top-0 right-0 w-40 h-40 opacity-10 group-hover:opacity-20 transition-opacity duration-500 overflow-hidden rounded-bl-[40px]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div
            className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${project.color} opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity duration-500`}
          />
        )}

        <div className="relative z-10 flex flex-col h-full">
          <h3 className="text-xl font-extrabold text-[#000080] mb-3 group-hover:text-[#3b3bb1] transition-colors text-start">
            {project.title}
          </h3>
          <p className="text-slate-500 mb-6 grow leading-relaxed text-sm text-start">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8" dir="ltr">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] font-bold rounded-lg bg-white text-slate-600 border border-slate-200 shadow-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-auto">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-xs font-bold text-[#000080] hover:text-[#3b3bb1] transition-colors z-20"
            >
              <Github size={16} />
              {t("code")}
            </a>
            {hasDemo ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-xs font-bold text-[#3b3bb1] hover:text-[#000080] transition-colors z-20"
              >
                <ExternalLink size={16} />
                {t("demo")}
              </a>
            ) : showPreview ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShowPreview(project.image);
                }}
                className="flex items-center gap-2 text-xs font-bold text-[#3b3bb1] hover:text-[#000080] transition-colors z-20 cursor-pointer"
              >
                <ExternalLink size={16} />
                {t("demo")}
              </button>
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [previewKey, setPreviewKey] = useState(0);

  const handleShowPreview = (img: string) => {
    setPreviewKey((prev) => prev + 1);
    setSelectedImage(img);
  };

  const projects = projectsData.map((project) => ({
    ...project,
    title: t(`${project.key}_title` as any),
    description: t(`${project.key}_desc` as any),
  }));

  const featuredProjects = projects.filter((p) => p.featured);
  const moreProjects = projects.filter((p) => !p.featured);

  return (
    <div id="projects" className="space-y-12">
      {/* Featured Section */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onShowPreview={handleShowPreview}
            />
          ))}
        </div>
      </div>

      {/* Show More Button */}
      {moreProjects.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100/80 border border-slate-200 text-[#000080] font-bold hover:bg-[#3b3bb1] hover:text-white hover:border-[#3b3bb1] transition-all duration-300"
          >
            {isExpanded ? t("show_less") : t("show_more")}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </button>
        </div>
      )}

      {/* More Work Section */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
        className="overflow-hidden"
      >
        <div className="space-y-8 pt-4">
          <div className="flex items-center gap-4">
            <div className="h-px grow bg-slate-200" />
            <h3 className="text-xl font-extrabold text-[#000080] whitespace-nowrap">
              {t("more_work")}
            </h3>
            <div className="h-px grow bg-slate-200" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moreProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onShowPreview={handleShowPreview}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-60 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
              >
                <X size={24} />
              </button>
              <div className="relative aspect-video w-full">
                <Image
                  key={`${selectedImage}-${previewKey}`}
                  src={selectedImage}
                  alt="Project Preview"
                  fill
                  className="object-contain bg-zinc-900"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
