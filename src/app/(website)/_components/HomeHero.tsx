"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { CirclePlay, Download, LampIcon, Monitor, X } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Vortex } from "@/components/ui/vortex";

type HeroData = {
  backgroundImage?: string;
  overlayOpacity?: number;
  typingAnimationLines?: string[];
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
};

const shimmer =
  "relative overflow-hidden bg-white/10 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-[#c7d300]/20 before:to-transparent";

const DUMMY_CV_URL =
  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
const DUMMY_INTRO_VIDEO_URL =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const normalizeHero = (hero: HeroData): Required<HeroData> => ({
  backgroundImage: hero.backgroundImage || "/images/heroImage.png",
  overlayOpacity:
    typeof hero.overlayOpacity === "number"
      ? Math.min(Math.max(hero.overlayOpacity, 0), 100)
      : 20,
  typingAnimationLines:
    Array.isArray(hero.typingAnimationLines) && hero.typingAnimationLines.length
      ? hero.typingAnimationLines
      : [],
  titleLine1: hero.titleLine1 || "",
  titleLine2: hero.titleLine2 || "",
  description: hero.description || "",
  primaryBtnText: hero.primaryBtnText || "Download CV",
  secondaryBtnText: hero.secondaryBtnText || "Watch Video",
});

function MobileVortexLayer() {
  return (
    <Vortex
      backgroundColor="#030617"
      rangeY={800}
      particleCount={420}
      baseHue={68}
      rangeHue={34}
      baseSpeed={0.02}
      rangeSpeed={0.9}
      baseRadius={0.45}
      rangeRadius={1.25}
      containerClassName="pointer-events-none absolute inset-0 z-0 opacity-75"
      className="h-full w-full"
    />
  );
}

function HeroActions({
  primaryText,
  secondaryText,
  variant,
  onWatchVideo,
}: {
  primaryText: string;
  secondaryText: string;
  variant: "mobile" | "lamp" | "desktop";
  onWatchVideo: () => void;
}) {
  if (variant === "mobile") {
    return (
      <div className="mt-9 flex w-full max-w-[290px] flex-col gap-3.5">
        <a
          href={DUMMY_CV_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[52px] w-full items-center justify-center gap-2 rounded-sm bg-[#c7d300] text-[12px] font-black uppercase text-black shadow-[0_12px_28px_rgba(199,211,0,0.18)] transition-transform active:scale-95"
        >
          {primaryText}
          <Download size={18} />
        </a>

        <button
          type="button"
          onClick={onWatchVideo}
          className="flex h-[52px] w-full items-center justify-center gap-2 rounded-sm border border-white/15 bg-white/[0.06] text-[12px] font-bold uppercase text-white/90 backdrop-blur-md transition-all active:bg-white active:text-black"
        >
          <CirclePlay size={18} className="text-[#c7d300]" />
          {secondaryText}
        </button>
      </div>
    );
  }

  if (variant === "lamp") {
    return (
      <div className="flex flex-row items-center justify-center gap-4 mt-12 w-full">
        <a
          href={DUMMY_CV_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-10 py-4 bg-[#c7d300] text-black text-sm font-bold uppercase rounded-sm hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          {primaryText}
          <Download size={18} />
        </a>
        <button
          type="button"
          onClick={onWatchVideo}
          className="px-10 py-4 border border-[#c7d300] text-white text-sm font-bold uppercase rounded-sm hover:bg-[#c7d300] hover:text-black transition-all flex items-center justify-center gap-2"
        >
          <CirclePlay size={18} className="text-[#c7d300]" />
          {secondaryText}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-6 mt-12">
      <a
        href={DUMMY_CV_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-[180px] md:w-[220px] h-[65px] bg-[#c7d300] text-black text-sm border-2 border-[#c7d300] uppercase font-bold hover:bg-transparent hover:text-white transition-all duration-500 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(199,211,0,0.3)]"
      >
        {primaryText}
        <Download size={20} />
      </a>

      <button
        type="button"
        onClick={onWatchVideo}
        className="w-[180px] md:w-[220px] h-[65px] bg-black/40 backdrop-blur-sm text-white text-sm uppercase font-bold border-2 border-white/10 hover:border-[#c7d300] transition-all duration-500 flex items-center justify-center gap-2"
      >
        <CirclePlay size={20} className="text-[#c7d300]" />
        {secondaryText}
      </button>
    </div>
  );
}

function IntroVideoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="intro-video-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-lg"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative w-full max-w-4xl overflow-hidden rounded-md border border-[#c7d300]/25 bg-[#030617] shadow-[0_0_60px_rgba(199,211,0,0.16)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 md:px-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#c7d300]">
                  Intro Video
                </p>
                <h3 className="mt-1 text-base font-bold uppercase text-white md:text-lg">
                  Tanvir Ahmmed
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close intro video"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-[#c7d300]/60 hover:text-[#c7d300]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative bg-black">
              <video
                src={DUMMY_INTRO_VIDEO_URL}
                controls
                autoPlay
                className="aspect-video w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/45 to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HeroSkeleton({
  showLamp,
  isMobile,
}: {
  showLamp: boolean;
  isMobile: boolean;
}) {
  if (showLamp) {
    return (
      <motion.div
        key="hero-skeleton-lamp"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full h-full flex flex-col items-center justify-center"
      >
        {isMobile ? (
          <BackgroundBeamsWithCollision className="h-full min-h-screen bg-[#030617] dark:from-[#030617] dark:to-[#070b1f]">
            <MobileVortexLayer />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,211,0,0.08),transparent_42%)]" />
            <div className="relative z-50 flex w-full max-w-[360px] flex-col items-center px-5 text-center">
              <div className={`${shimmer} mb-4 h-3 w-40 rounded-full`} />
              <div className={`${shimmer} h-12 w-60 max-w-full rounded-sm`} />
              <div
                className={`${shimmer} mt-2 h-12 w-48 max-w-[82%] rounded-sm bg-[#c7d300]/25`}
              />
              <div className="mt-6 flex w-full max-w-[320px] flex-col items-center gap-3">
                <div className={`${shimmer} h-3 w-full rounded-full`} />
                <div className={`${shimmer} h-3 w-10/12 rounded-full`} />
                <div className={`${shimmer} h-3 w-8/12 rounded-full`} />
              </div>
              <div className="mt-9 flex w-full max-w-[290px] flex-col gap-3.5">
                <div className={`${shimmer} h-[52px] w-full rounded-sm`} />
                <div
                  className={`${shimmer} h-[52px] w-full rounded-sm border border-white/10 bg-white/5`}
                />
              </div>
            </div>
          </BackgroundBeamsWithCollision>
        ) : (
          <LampContainer className="bg-transparent h-screen w-full flex flex-col items-center justify-center !pt-0">
            <div className="flex w-full flex-col items-center px-6 text-center">
              <div className={`${shimmer} mb-5 h-5 w-80 rounded-full`} />
              <div
                className={`${shimmer} h-16 w-[560px] max-w-[80vw] rounded-sm`}
              />
              <div
                className={`${shimmer} mt-4 h-16 w-[430px] max-w-[70vw] rounded-sm`}
              />
              <div className="mt-8 flex w-full max-w-xl flex-col items-center gap-3">
                <div className={`${shimmer} h-3 w-full rounded-full`} />
                <div className={`${shimmer} h-3 w-11/12 rounded-full`} />
                <div className={`${shimmer} h-3 w-8/12 rounded-full`} />
              </div>
              <div className="mt-12 flex gap-4">
                <div
                  className={`${shimmer} h-[54px] w-[190px] rounded-sm bg-[#c7d300]/25`}
                />
                <div
                  className={`${shimmer} h-[54px] w-[190px] rounded-sm border border-[#c7d300]/30 bg-white/5`}
                />
              </div>
            </div>
          </LampContainer>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      key="hero-skeleton-api"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="relative z-10 mx-[10%] flex h-full max-w-4xl flex-col justify-center text-left text-white lg:mx-[15%]"
    >
      <div
        className={`${shimmer} mb-6 hidden h-6 w-72 rounded-full md:block`}
      />
      <div
        className={`${shimmer} mb-3 h-12 w-[min(620px,82vw)] rounded-sm md:h-20`}
      />
      <div
        className={`${shimmer} h-12 w-[min(460px,70vw)] rounded-sm bg-[#c7d300]/25 md:h-20`}
      />
      <div className="mt-9 flex w-full max-w-2xl flex-col gap-3">
        <div className={`${shimmer} h-3 w-full rounded-full bg-white/15`} />
        <div className={`${shimmer} h-3 w-11/12 rounded-full bg-white/15`} />
        <div className={`${shimmer} h-3 w-8/12 rounded-full bg-white/15`} />
      </div>
      <div className="mt-12 flex flex-row gap-6">
        <div
          className={`${shimmer} h-[65px] w-[180px] rounded-sm bg-[#c7d300]/25 md:w-[220px]`}
        />
        <div
          className={`${shimmer} h-[65px] w-[180px] rounded-sm border border-white/10 bg-black/30 md:w-[220px]`}
        />
      </div>
    </motion.div>
  );
}

function HomeHero() {
  const [viewMode, setViewMode] = useState<"api" | "lamp">("api");
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

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
      if (!res.ok) {
        throw new Error("Failed to load hero data");
      }
      return res.json();
    },
  });

  const hasHeroData = Boolean(response?.status && response.data);
  const hero = hasHeroData ? normalizeHero(response.data) : null;
  const sequence = (hero?.typingAnimationLines ?? []).flatMap((line) => [
    line,
    2000,
  ]);

  const showLamp = viewMode === "lamp" || isMobile;

  useEffect(() => {
    if (isMobile || !hasHeroData) return;

    const autoSwitchTimer = window.setInterval(() => {
      setViewMode((currentMode) =>
        currentMode === "api" ? "lamp" : "api",
      );
    }, 60000);

    return () => window.clearInterval(autoSwitchTimer);
  }, [hasHeroData, isMobile]);

  const handleViewModeChange = (mode: "api" | "lamp") => {
    setViewMode(mode);
  };

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
              src={hero?.backgroundImage || "/images/heroImage.png"}
              alt="hero"
              fill
              priority
              className="object-cover object-center"
              quality={100}
            />
            <div
              className="absolute inset-0 bg-black"
              style={{ opacity: (hero?.overlayOpacity ?? 45) / 100 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop View Switcher (Hero Section Only) */}
      <div className="hidden lg:flex absolute top-10 right-10 z-[100] gap-2 bg-[#15160e]/80 backdrop-blur-md border border-white/10 p-1.5 rounded-full shadow-2xl">
        <button
          onClick={() => handleViewModeChange("api")}
          aria-label="Show image hero"
          className={`p-2.5 rounded-full transition-all duration-300 ${
            viewMode === "api"
              ? "bg-[#c7d300] text-black shadow-lg"
              : "text-white hover:text-[#c7d300]"
          }`}
        >
          <Monitor size={20} />
        </button>
        <button
          onClick={() => handleViewModeChange("lamp")}
          aria-label="Show lamp hero"
          className={`p-2.5 rounded-full transition-all duration-300 ${
            viewMode === "lamp"
              ? "bg-[#c7d300] text-black shadow-lg"
              : "text-white hover:text-[#c7d300]"
          }`}
        >
          <LampIcon size={20} />
        </button>
      </div>

      <AnimatePresence>
        {showLamp && !isMobile && (
          <motion.div
            key="desktop-lamp-transition-glow"
            initial={{ opacity: 0, scale: 0.65 }}
            animate={{ opacity: [0, 0.55, 0], scale: [0.65, 1.18, 1.45] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.25, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,rgba(199,211,0,0.24),transparent_42%)]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!hero || error || isLoading ? (
          <HeroSkeleton showLamp={showLamp} isMobile={isMobile} />
        ) : showLamp ? (
          <motion.div
            key="lamp-view"
            initial={{ opacity: 0, scale: isMobile ? 1 : 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: isMobile ? 1 : 0.98 }}
            transition={{ duration: isMobile ? 0.45 : 0.9, ease: "easeInOut" }}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            {isMobile ? (
              /* Mobile Specific Centered Content Fix */
              <BackgroundBeamsWithCollision className="h-full min-h-screen bg-[#030617] dark:from-[#030617] dark:to-[#070b1f]">
                <MobileVortexLayer />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,211,0,0.1),transparent_45%)]" />
                <div className="absolute inset-0 bg-black/10" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-50 flex w-full max-w-[360px] flex-col items-center px-5 text-center"
                >
                  {/* Sub-heading */}
                  {/* Mobile Typing Animation with Fixed Height to prevent shaking */}
                  <div className="mb-3 min-h-[22px] max-w-full">
                    {sequence.length > 0 && (
                      <TypeAnimation
                        sequence={sequence}
                        wrapper="p"
                        speed={50}
                        repeat={Infinity}
                        className="text-[11px] font-black text-[#d9e900] uppercase tracking-[0.24em] drop-shadow-[0_0_10px_rgba(199,211,0,0.4)]"
                      />
                    )}
                  </div>

                  {/* Main Title - Updated font sizes & weight */}
                  <h2 className="w-full text-[clamp(2.6rem,12vw,4.6rem)] font-black uppercase leading-[0.92] tracking-normal text-white drop-shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
                    <span>{hero.titleLine1}</span>
                    <br />
                    <span className="mt-1 inline-block bg-gradient-to-r from-[#f1ff39] via-[#c7d300] to-[#93a300] bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(199,211,0,0.28)]">
                      {hero.titleLine2}
                    </span>
                  </h2>

                  {/* Description - Improved readability */}
                  <p className="mt-5 max-w-[320px] text-[13.5px] font-medium leading-[1.75] text-white/70">
                    {hero.description}
                  </p>

                  {/* Buttons - Improved design */}
                  <HeroActions
                    primaryText={hero.primaryBtnText || "Download CV"}
                    secondaryText={hero.secondaryBtnText || "Watch Video"}
                    variant="mobile"
                    onWatchVideo={() => setIsVideoModalOpen(true)}
                  />
                </motion.div>
              </BackgroundBeamsWithCollision>
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

                  <HeroActions
                    primaryText={hero.primaryBtnText || "Download CV"}
                    secondaryText={hero.secondaryBtnText || "Watch Video"}
                    variant="lamp"
                    onWatchVideo={() => setIsVideoModalOpen(true)}
                  />
                </motion.div>
              </LampContainer>
            )}
          </motion.div>
        ) : (
          /* Large Device API View (Unchanged) */
          <motion.div
            key="api-view"
            initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 28, scale: 0.98, filter: "blur(10px)" }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
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

            <HeroActions
              primaryText={hero.primaryBtnText || "Download CV"}
              secondaryText={hero.secondaryBtnText || "Watch Video"}
              variant="desktop"
              onWatchVideo={() => setIsVideoModalOpen(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <IntroVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

export default HomeHero;
