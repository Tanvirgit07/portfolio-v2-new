"use client";

import Image from "next/image";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CirclePlay, Download } from "lucide-react";

function HomeHero() {
  const { scrollY } = useScroll();

  // scroll effect (text up hobe scroll korle)
  const y = useTransform(scrollY, [0, 300], [0, -120]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image (fixed feel) */}
      <Image
        src="/images/heroImage.png"
        alt="hero"
        fill
        priority
        className="object-cover object-center"
        quality={100}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content with scroll animation */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-white text-left max-w-3xl mx-[15%] h-full flex flex-col justify-center"
      >
        <p className="text-2xl font-bold leading-[120%] text-[#c7d300] mb-4">
          Hello I&apos;m Tanvir Ahmmed
        </p>

        <h1 className="text-3xl md:text-5xl font-bold mt-2 uppercase leading-[1.5] mb-5">
          Full Stack Developer
        </h1>
        <h1 className="text-3xl md:text-5xl font-bold uppercase">
          Based in Bangladesh
        </h1>

        <p className="mt-10 text-sm md:text-base text-white/80 w-[90%] leading-[1.6]">
          As a Full Stack Developer, I build fast, scalable, and user-friendly
          web applications. I love turning
        </p>
        <p className="mt-2 text-sm md:text-base text-white/80 w-[90%]">
          ideas into clean, efficient digital solutions from frontend to
          backend.
        </p>

        <div className="flex gap-12 mt-16">
          <button className="w-[200px] h-[65px] bg-[#c7d300] text-black text-[14px] border-2 border-[#c7d300] uppercase font-bold hover:bg-transparent hover:text-white hover:border-2 hover:border-[#c7d300] duration-700 ease-in-out flex items-center justify-center gap-2">
            Download CV
            <Download className="w-5 h-5" />
          </button>

         <button className="w-[200px] h-[65px] bg-[#15160e] text-white text-[14px] uppercase font-bold border-2 border-transparent hover:border-[#c7d300] hover:bg-[#0f100b] transition-all duration-700 ease-in-out flex items-center justify-center gap-2 ">
  <CirclePlay className="w-5 h-5" />
  Watch the video
</button>
        </div>
      </motion.div>
      <div></div>
    </div>
  );
}

export default HomeHero;
