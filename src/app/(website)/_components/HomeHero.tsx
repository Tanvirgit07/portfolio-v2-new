/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { CirclePlay, Download, LampIcon, Monitor } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { BackgroundLines } from "@/components/ui/background-lines";

function HomeHero() {
  const [viewMode, setViewMode] = useState<"api" | "lamp">("api");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["heroData"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/home/activeHero`,
      );
      return res.json();
    },
  });

  if (isLoading) return <div className="h-screen bg-black" />;
  if (error || !response?.status) return null;

  const hero = response.data;
  const sequence = hero.typingAnimationLines.flatMap((line: any) => [
    line,
    2000,
  ]);

  const showLamp = viewMode === "lamp" || isMobile;

  return (
    <div
      className={`relative w-full h-screen overflow-hidden transition-colors duration-700 ${showLamp ? "bg-[#030617]" : "bg-transparent"}`}
    >
      {/* Large Device Background (Unchanged) */}
      <AnimatePresence>
        {!showLamp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 -z-30"
          >
            <Image
              src={hero.backgroundImage || "/images/heroImage.png"}
              alt="hero"
              fill
              priority
              className="object-cover object-center"
              quality={100}
            />
            <div
              className="absolute inset-0 bg-black"
              style={{ opacity: hero.overlayOpacity / 100 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

     {/* Desktop View Switcher (Hero Section Only) */}
<div className="hidden lg:flex absolute top-10 right-10 z-[100] gap-2 bg-[#15160e]/80 backdrop-blur-md border border-white/10 p-1.5 rounded-full shadow-2xl">
  <button 
    onClick={() => setViewMode("api")}
    className={`p-2.5 rounded-full transition-all duration-300 ${
      viewMode === "api" ? "bg-[#c7d300] text-black shadow-lg" : "text-white hover:text-[#c7d300]"
    }`}
  >
    <Monitor size={20} />
  </button>
  <button 
    onClick={() => setViewMode("lamp")}
    className={`p-2.5 rounded-full transition-all duration-300 ${
      viewMode === "lamp" ? "bg-[#c7d300] text-black shadow-lg" : "text-white hover:text-[#c7d300]"
    }`}
  >
    <LampIcon size={20} />
  </button>
</div>

      <AnimatePresence mode="wait">
        {showLamp ? (
          <motion.div
            key="lamp-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            {isMobile ? (
              /* Mobile Specific Centered Content Fix */
              <div className="flex flex-col items-center justify-center w-full h-full relative">
                <BackgroundLines className="absolute inset-0 flex items-center justify-center w-full h-full !bg-transparent">
                  <span />
                </BackgroundLines>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-50 flex flex-col items-center px-8 text-center"
                >
                  {/* Sub-heading */}
                  <span className="text-[#c7d300] text-[12px] font-extrabold tracking-[0.3em] mb-3 uppercase">
                    HELLO, I&apos;M TANVIR AHMMED
                  </span>

                  {/* Main Title - Updated font sizes & weight */}
                  <h2 className="text-white text-4xl font-black leading-[1.1] uppercase tracking-tighter">
                    {hero.titleLine1} <br />
                    <span className="text-[#c7d300] drop-shadow-[0_0_10px_rgba(199,211,0,0.2)]">
                      {hero.titleLine2}
                    </span>
                  </h2>

                  {/* Description - Improved readability */}
                  <p className="max-w-[300px] text-[13px] text-gray-400 mt-6 leading-relaxed font-medium">
                    {hero.description}
                  </p>

                  {/* Buttons - Improved design */}
                  <div className="flex flex-col gap-4 mt-12 w-full min-w-[240px]">
                    <button className="w-full py-4 bg-[#c7d300] text-black text-[13px] font-black uppercase rounded-sm flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(199,211,0,0.15)] active:scale-95 transition-transform">
                      {hero.primaryBtnText || "Download CV"}
                      <Download size={18} />
                    </button>

                    <button className="w-full py-4 border border-white/20 text-white text-[13px] font-bold uppercase rounded-sm flex items-center justify-center gap-2 bg-white/5 backdrop-blur-md active:bg-white active:text-black transition-all">
                      <CirclePlay size={18} className="text-[#c7d300]" />
                      {hero.secondaryBtnText || "Watch Video"}
                    </button>
                  </div>
                </motion.div>
              </div>
            ) : (
              /* Large Device Lamp (Unchanged) */
              <LampContainer className="bg-transparent h-screen w-full flex flex-col items-center justify-center !pt-0">
                <motion.div
                  initial={{ opacity: 0.5, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
                  className="flex flex-col items-center text-center px-6 w-full"
                >
                  <span className="text-[#c7d300] text-lg md:text-2xl font-bold tracking-[0.2em] mb-4 uppercase">
                    HELLO, I&apos;M TANVIR AHMMED
                  </span>
                  <h1 className="bg-gradient-to-br from-slate-100 to-slate-500 py-4 bg-clip-text text-center text-4xl md:text-7xl font-bold tracking-tight text-transparent leading-tight uppercase">
                    {hero.titleLine1} <br /> {hero.titleLine2}
                  </h1>
                  <p className="text-white/60 max-w-xl mt-6 text-sm md:text-base leading-relaxed text-center">
                    {hero.description}
                  </p>

                  <div className="flex flex-row items-center justify-center gap-4 mt-12 w-full">
                    <button className="px-10 py-4 bg-[#c7d300] text-black text-sm font-bold uppercase rounded-sm hover:scale-105 transition-all flex items-center justify-center gap-2">
                      {hero.primaryBtnText || "Download CV"}
                      <Download size={18} />
                    </button>
                    <button className="px-10 py-4 border border-[#c7d300] text-white text-sm font-bold uppercase rounded-sm hover:bg-[#c7d300] hover:text-black transition-all flex items-center justify-center gap-2">
                      <CirclePlay size={18} className="text-[#c7d300]" />
                      {hero.secondaryBtnText || "Watch Video"}
                    </button>
                  </div>
                </motion.div>
              </LampContainer>
            )}
          </motion.div>
        ) : (
          /* Large Device API View (Unchanged) */
          <motion.div
            key="api-view"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="relative z-10 text-white text-left max-w-4xl mx-[10%] lg:mx-[15%] h-full flex flex-col justify-center"
          >
            <div className="hidden md:block">
              {sequence.length > 0 && (
                <TypeAnimation
                  sequence={sequence}
                  wrapper="p"
                  speed={50}
                  repeat={Infinity}
                  className="text-2xl font-bold text-[#c7d300] mb-4 uppercase"
                />
              )}
            </div>

            <h1 className="text-4xl md:text-7xl font-black uppercase leading-[1.1] mb-2 tracking-tight">
              {hero.titleLine1}
            </h1>
            <h1 className="text-4xl md:text-7xl font-black uppercase text-[#c7d300] tracking-tight">
              {hero.titleLine2}
            </h1>

            <div className="mt-8 text-sm md:text-lg text-white/80 w-full md:w-[75%] leading-relaxed whitespace-pre-line">
              {hero.description}
            </div>

            <div className="flex flex-row gap-6 mt-12">
              <button className="w-[180px] md:w-[220px] h-[65px] bg-[#c7d300] text-black text-sm border-2 border-[#c7d300] uppercase font-bold hover:bg-transparent hover:text-white transition-all duration-500 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(199,211,0,0.3)]">
                {hero.primaryBtnText || "Download CV"}
                <Download size={20} />
              </button>

              <button className="w-[180px] md:w-[220px] h-[65px] bg-black/40 backdrop-blur-sm text-white text-sm uppercase font-bold border-2 border-white/10 hover:border-[#c7d300] transition-all duration-500 flex items-center justify-center gap-2">
                <CirclePlay size={20} className="text-[#c7d300]" />
                {hero.secondaryBtnText || "Watch Video"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HomeHero;
