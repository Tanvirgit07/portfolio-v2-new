/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React from "react";
import { CirclePlay, Download } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { useQuery } from "@tanstack/react-query";

function HomeHero() {
  const { data: response, isLoading, error } = useQuery({
    queryKey: ["heroData"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/home/activeHero`);
      return res.json();
    },
  });

  // ডেটা লোড হওয়ার সময় একটি সিম্পল লোডার বা নাল রিটার্ন করা ভালো
  if (isLoading) return <div className="h-screen bg-black" />;
  if (error || !response?.status) return null;

  const hero = response.data;

  // Typing animation এর জন্য sequence তৈরি করা
  const sequence = hero.typingAnimationLines.flatMap((line:any) => [line, 2000]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={hero.backgroundImage || "/images/heroImage.png"}
          alt="hero"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
      </div>

      {/* Overlay - Opacity dynamically handled */}
      <div 
        className="absolute inset-0 bg-black" 
        style={{ opacity: hero.overlayOpacity / 100 }} 
      />

      {/* Content */}
      <div className="relative z-10 text-white text-left max-w-3xl mx-[15%] h-full flex flex-col justify-center">
        {sequence.length > 0 && (
          <TypeAnimation
            sequence={sequence}
            wrapper="p"
            speed={50}
            repeat={Infinity}
            className="text-2xl font-bold leading-[120%] text-[#c7d300] mb-4"
          />
        )}

        <h1 className="text-3xl md:text-5xl font-bold mt-2 uppercase leading-[1.5] mb-5">
          {hero.titleLine1}
        </h1>
        <h1 className="text-3xl md:text-5xl font-bold uppercase">
          {hero.titleLine2}
        </h1>

        <div className="mt-10 text-sm md:text-base text-white/80 w-[90%] leading-[1.6] whitespace-pre-line">
          {hero.description}
        </div>

        <div className="flex gap-12 mt-16">
          <button className="w-[200px] h-[65px] bg-[#c7d300] text-black text-[14px] border-2 border-[#c7d300] uppercase font-bold hover:bg-transparent hover:text-white hover:border-2 hover:border-[#c7d300] duration-700 ease-in-out flex items-center justify-center gap-2">
            {hero.primaryBtnText || "Download CV"}
            <Download className="w-5 h-5" />
          </button>

          <button className="w-[200px] h-[65px] bg-[#15160e] text-white text-[14px] uppercase font-bold border-2 border-transparent hover:border-[#c7d300] hover:bg-[#0f100b] transition-all duration-700 ease-in-out flex items-center justify-center gap-2 ">
            <CirclePlay className="w-5 h-5 text-[#c7d300]" />
            {hero.secondaryBtnText || "Watch the video"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeHero;