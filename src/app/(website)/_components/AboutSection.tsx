"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight } from "lucide-react";

const stats = [
  { label: "YEARS OF EXPERIENCE", value: "4+" },
  { label: "PROJECTS COMPLETED", value: "30+" },
  { label: "INDUSTRIES WORKED", value: "5+" },
  { label: "CLIENTS SATISFIED", value: "20+" },
];

// ─── CountUpNumber ───────────────────────────────────────────
function CountUpNumber({ value, delay }: { value: string; delay: number }) {
  const num = parseInt(value);
  const suffix = value.replace(/\d/g, "");
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      const duration = 1400;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(eased * num));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, num, delay]);

  return (
    <span ref={ref} className="text-5xl font-bold text-white mt-1 tabular-nums">
      {display}{suffix}
    </span>
  );
}

// ─── TiltImage ───────────────────────────────────────────────
function TiltImage() {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };

  const rotateX = useSpring(
    useTransform(rawY, [-1, 1], [12, -12]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(rawX, [-1, 1], [-12, 12]),
    springConfig,
  );
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    scale.set(1.04);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, scale, transformPerspective: 800 }}
      className="relative flex-shrink-0 cursor-pointer"
    >
      {/* Rotating Border */}
      <div
        className="absolute rounded-full z-0"
        style={{
          inset: "-6px",
          background:
            "conic-gradient(from 0deg, #3b82f6, #60a5fa, #a5b4fc, #3b82f6)",
          animation: "spin-slow 4s linear infinite",
        }}
      />

      {/* Inner border glow ring */}
      <div
        className="absolute rounded-full z-10"
        style={{
          inset: "-3px",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(6px)",
        }}
      />

      {/* Image */}
      <div className="relative w-[280px] h-[280px] rounded-full overflow-hidden z-20 shadow-2xl border border-white/10">
        <Image
          src="/images/tanvir.jpg"
          alt="Full Stack Developer"
          fill
          className="object-cover object-top"
        />
      </div>

      {/* Glow */}
      <div
        className="absolute rounded-full bg-blue-500 opacity-20 blur-3xl z-0"
        style={{ inset: "-10px" }}
      />
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────
export default function AboutSection() {
  return (
    <section className="w-full bg-[#15160e] text-white font-sans">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-16">

        {/* LEFT */}
        <div className="relative flex items-center gap-6 flex-shrink-0">
          <div className="flex flex-col items-center self-stretch py-2">
            <div className="w-[5px] h-[5px] rounded-full bg-gray-500" />
            <div className="w-[1.5px] flex-1 bg-gray-700 my-1" />
            <div className="w-[5px] h-[5px] rounded-full bg-gray-500" />
          </div>

          <TiltImage />

          <span
            className="absolute -left-7 bottom-14 text-[11px] text-gray-500 tracking-widest uppercase font-medium select-none"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            My Story
          </span>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 max-w-5xl">
          <p className="text-sm tracking-widest uppercase mb-3 font-medium">
            <TypeAnimation
              sequence={[
                "About Me",
                2000,
                "Full Stack Developer",
                2000,
                "Next.js Developer",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-gray-400"
            />
          </p>

          <h2 className="text-4xl font-bold text-white mb-5 leading-tight">
            Hey, I&apos;m Tanvir Ahmmed 👋
            <br />
            Full Stack Developer
          </h2>

          <p className="text-gray-300 text-base leading-relaxed mb-4">
            I am a passionate Full Stack Developer focused on building modern,
            scalable, and production-ready web applications. I specialize in
            designing and developing complete digital solutions — from frontend
            interfaces to backend systems.
          </p>

          <p className="text-gray-300 text-base leading-relaxed mb-4">
            My expertise includes Next.js, React, TypeScript, Node.js, Express,
            REST APIs, authentication systems, database design, and third-party
            integrations.
          </p>

          <p className="text-gray-300 text-base leading-relaxed mb-4">
            I follow clean architecture, reusable code patterns, and performance
            optimization techniques to build scalable and maintainable products.
          </p>

          <p className="text-gray-300 text-base leading-relaxed mb-6">
            From startup MVPs to enterprise dashboards, I focus on delivering
            high-quality user experiences with strong backend logic and modern UI.
          </p>

          <button className="w-[200px] h-[65px] bg-[#c7d300] text-black text-[14px] border-2 border-[#c7d300] uppercase font-bold hover:bg-transparent hover:text-white hover:border-2 hover:border-[#c7d300] duration-700 ease-in-out flex items-center justify-center gap-2">
            View Projects
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-white/10" />
      </div>

      {/* STATS */}
      <div className="bg-white/5 py-10 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
            >
              <span className="text-[11px] tracking-widest uppercase text-gray-400">
                {stat.label}
              </span>
              <CountUpNumber value={stat.value} delay={i * 0.15} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ANIMATION */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

    </section>
  );
}