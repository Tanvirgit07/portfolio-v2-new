/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// ─── CountUpNumber ───────────────────────────────────────────
function CountUpNumber({ value, delay }: { value: string; delay: number }) {
  const num = parseInt(value) || 0;
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
function TiltImage({ image }: { image: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20 };

  const rotateX = useSpring(useTransform(rawY, [-1, 1], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-12, 12]), springConfig);
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
      <div className="absolute rounded-full z-0" style={{ inset: "-6px", background: "conic-gradient(from 0deg, #3b82f6, #60a5fa, #a5b4fc, #3b82f6)", animation: "spin-slow 4s linear infinite" }} />
      <div className="absolute rounded-full z-10" style={{ inset: "-3px", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(6px)" }} />
      <div className="relative w-[280px] h-[280px] rounded-full overflow-hidden z-20 shadow-2xl border border-white/10">
        <Image src={image || "/images/tanvir.jpg"} alt="About Image" fill className="object-cover object-top" />
      </div>
      <div className="absolute rounded-full bg-blue-500 opacity-20 blur-3xl z-0" style={{ inset: "-10px" }} />
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────
export default function AboutSection() {
  const { data: response, isLoading } = useQuery({
    queryKey: ["activeAbout"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/about/getActiveAbout`);
      return res.json();
    },
  });

  if (isLoading) return <div className="w-full h-96 bg-[#15160e]" />;
  if (!response?.status) return null;

  const aboutData = response.data;

  // Typewriter sequence তৈরি করা
  const typewriterSequence = aboutData.typewriterStrings.flatMap((str: string) => [str, 2000]);

  return (
    <section className="w-full bg-[#15160e] text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-16">
        <div className="relative flex items-center gap-6 flex-shrink-0">
          <div className="flex flex-col items-center self-stretch py-2">
            <div className="w-[5px] h-[5px] rounded-full bg-gray-500" />
            <div className="w-[1.5px] flex-1 bg-gray-700 my-1" />
            <div className="w-[5px] h-[5px] rounded-full bg-gray-500" />
          </div>
          <TiltImage image={aboutData.profileImage} />
          <span className="absolute -left-7 bottom-14 text-[11px] text-gray-500 tracking-widest uppercase font-medium select-none" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            My Story
          </span>
        </div>

        <div className="flex-1 max-w-5xl">
          <p className="text-sm tracking-widest uppercase mb-3 font-medium">
            {typewriterSequence.length > 0 && (
              <TypeAnimation
                sequence={typewriterSequence}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-gray-400"
              />
            )}
          </p>

          <h2 className="text-4xl font-bold text-white mb-5 leading-tight">
            {aboutData.titleLine1}
            <br />
            {aboutData.titleLine2}
          </h2>

          {aboutData.descriptions.map((desc: string, index: number) => (
            <p key={index} className="text-gray-300 text-base leading-relaxed mb-4">
              {desc}
            </p>
          ))}

          <button className="w-[200px] h-[65px] bg-[#c7d300] text-black text-[14px] border-2 border-[#c7d300] uppercase font-bold hover:bg-transparent hover:text-white hover:border-2 hover:border-[#c7d300] duration-700 ease-in-out flex items-center justify-center gap-2 mt-6">
            {aboutData.ctaText || "View Projects"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-white/10" />
      </div>

      {/* STATS SECTION */}
      <div className="relative border-y border-white/5 bg-white/[0.02] py-16 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
          <span className="text-[200px] font-black tracking-tighter">SUCCESS</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">
          {aboutData.stats.map((stat: any, i: number) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c7d300] font-bold">
                {stat.value} {/* আপনার API অনুযায়ী label এবং value অদলবদল হতে পারে */}
              </span>
              <CountUpNumber value={stat.label} delay={i * 0.1} />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}