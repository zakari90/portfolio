"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable);
}

const sectionIds = [
  { id: "hero", key: "overview" },
  { id: "techstack", key: "skills" },
  { id: "projects", key: "projects" },
  { id: "contact", key: "contact" },
];

// Fix: Props interface to accept 'section' if passed, though we track automatically

export default function FloatingDrop() {
  const dropRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeKey, setActiveKey] = useState("overview");
  const t = useTranslations("Navigation");

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentSection = sectionIds.find(
              (s) => s.id === entry.target.id,
            );
            if (currentSection) setActiveKey(currentSection.key);
          }
        });
      },
      { threshold: 0.5 },
    );

    sectionIds.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const spawnDot = () => {
    if (!dropRef.current || !containerRef.current) return;

    const size = Math.random() * 12 + 6;
    const dot = document.createElement("div");
    dot.className = "absolute pointer-events-none transition-opacity";
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.borderRadius = "50%";
    dot.style.backgroundColor = "transparent";
    dot.style.border = "1px solid rgba(59, 59, 177, 0.2)";
    dot.style.boxShadow =
      "inset -2px -2px 4px rgba(255, 255, 255, 0.4), inset 2px 2px 4px rgba(59, 59, 177, 0.1)";
    dot.style.backdropFilter = "blur(0.5px)";
    dot.style.zIndex = "40";

    // Add a tiny glint
    const glint = document.createElement("div");
    glint.style.position = "absolute";
    glint.style.top = "20%";
    glint.style.left = "20%";
    glint.style.width = "25%";
    glint.style.height = "25%";
    glint.style.borderRadius = "50%";
    glint.style.backgroundColor = "white";
    glint.style.opacity = "0.7";
    dot.appendChild(glint);

    const rect = dropRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2 - size / 2;
    const y = rect.top + rect.height / 2 - size / 2;

    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;

    containerRef.current.appendChild(dot);

    const angle = (Math.random() - 0.5) * Math.PI * 2;
    const dist = 40 + Math.random() * 100;
    const upwardForce = -(Math.random() * 50 + 50); // Bubble drift up

    gsap.to(dot, {
      x: `+=${Math.cos(angle) * dist}`,
      y: `+=${Math.sin(angle) * dist + upwardForce}`,
      opacity: 0,
      scale: 1.5,
      duration: 1.5 + Math.random() * 2,
      ease: "power1.out",
      onComplete: () => dot.remove(),
    });
  };

  useEffect(() => {
    const interval = setInterval(spawnDot, 2000); // Slower default rate
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      if (!dropRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          onUpdate: (self) => {
            // Spawn extra dots on fast scroll
            if (Math.abs(self.getVelocity()) > 500 && Math.random() > 0.8) {
              spawnDot();
            }
          },
        },
      });
      tl.to(dropRef.current, {
        y: "15vh",
        x: "-40vw",
        rotate: 35,
        scale: 1.15,
        ease: "none",
      })
        .to(dropRef.current, {
          y: "35vh",
          x: "-85vw",
          rotate: -50,
          scale: 0.85,
          ease: "none",
        })
        .to(dropRef.current, {
          y: "55vh",
          x: "-10vw",
          rotate: 110,
          scale: 1.25,
          ease: "none",
        });

      // Make it draggable
      Draggable.create(dropRef.current, {
        type: "x,y",
        bounds: window,
        inertia: true,
        onDragStart: () => {
          tl.scrollTrigger?.kill();
          tl.kill();
          gsap.to(dropRef.current, { scale: 1.1, duration: 0.2 });
        },
        onDrag: () => {
          if (Math.random() > 0.9) spawnDot();
        },
        onDragEnd: () => {
          gsap.to(dropRef.current, { scale: 1, duration: 0.2 });
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50">
      <div
        ref={dropRef}
        className="drop cursor-grab active:cursor-grabbing pointer-events-auto flex items-center justify-center"
        style={{
          top: "10vh",
          left: "85%",
        }}
        title="Drag me!"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={activeKey}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="text-[#000080] font-bold text-sm tracking-widest uppercase -rotate-45 select-none"
          >
            {t(activeKey as any)}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
