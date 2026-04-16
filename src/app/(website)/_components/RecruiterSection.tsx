"use client";
import React, { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PencilLine, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const dummySuggestions = [
  {
    id: 1,
    text: "The smooth scroll effect is fantastic, creates a premium feel!",
    name: "Sarah K.",
    role: "Lead Recruiter at TechCorp",
  },
  {
    id: 2,
    text: "Excellent clean UI. I suggest making the 'Call to Action' buttons in the Hero section more prominent and clear.",
    name: "Mike L.",
    role: "Hiring Manager",
  },
  {
    id: 3,
    text: "Loved the project case studies. They really show your problem-solving skills, but adding a bit more technical detail about the database architecture would be even better.",
    name: "Dr. Evans",
    role: "Sr. Developer Mentor",
  },
  {
    id: 4,
    text: "Your GitHub repos are well-documented. Great job! It shows discipline in your coding practices.",
    name: "Jessica R.",
    role: "Tech Lead",
  },
  {
    id: 5,
    text: "Dark mode toggle is good. Consider adding a small animation to it for better UX.",
    name: "Tom B.",
    role: "Freelance Client",
  },
  {
    id: 6,
    text: "Maybe optimize your images to improve overall page load time.",
    name: "Alex P.",
    role: "UX Auditor",
  },
];

// ✅ Tooltip state type
type TooltipState = {
  id: number;
  x: number;
  y: number;
  text: string;
  role: string;
} | null;

// ✅ Portal-based Tooltip Component (fixed position, root-level render)
function TooltipPortal({ tooltip }: { tooltip: TooltipState }) {
  if (!tooltip) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key={tooltip.id}
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.95 }}
        transition={{ duration: 0.18 }}
        style={{
          position: "fixed",
          left: tooltip.x,
          top: tooltip.y,
          transform: "translateX(-50%)",
          zIndex: 99999,
          pointerEvents: "none",
        }}
        className="w-[380px] p-6 bg-neutral-800 rounded-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9)] border border-neutral-700 whitespace-normal"
      >
        <p className="text-sm text-neutral-100 italic leading-relaxed mb-4">
          {tooltip.text}
        </p>
        <div className="flex items-center gap-2 border-t border-neutral-700/50 pt-3">
          <span className="text-[10px] font-bold text-[#c7d300] uppercase tracking-tighter">
            Verified Feedback
          </span>
          <span className="text-neutral-500">•</span>
          <p className="text-[10px] text-neutral-400 font-medium uppercase">
            {tooltip.role}
          </p>
        </div>
        {/* Tooltip Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-neutral-800" />
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

export default function RecruiterFeedbackSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const MARQUEE_SPEED = 40;

  // ✅ Mouse enter: getBoundingClientRect() দিয়ে position calculate করা
  const handleMouseEnter = useCallback(
    (suggestion: (typeof dummySuggestions)[0], key: string) => {
      const el = cardRefs.current.get(key);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const tooltipWidth = 380;

      // Card-এর center থেকে tooltip position বসানো
      const x = rect.left + rect.width / 2;
      // Card-এর উপরে, 12px gap রেখে
      const y = rect.top - 12;

      // Screen boundary check (বাঁদিকে না যায়)
      const clampedX = Math.max(
        tooltipWidth / 2 + 8,
        Math.min(x, window.innerWidth - tooltipWidth / 2 - 8),
      );

      setTooltip({
        id: suggestion.id,
        x: clampedX,
        y,
        text: suggestion.text,
        role: suggestion.role,
      });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  return (
    <section className="relative pt-20 bg-[#15160e] font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="inline-block relative mb-3">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
            Recruiter <span className="text-[#c7d300]">Feedback</span>
          </h2>
          {/* Accent Bar logic matches your requested design */}
          {/* <div className="absolute -bottom-2 left-0 w-1/4 h-1.5 bg-[#c7d300] rounded-full"></div> */}
        </div>

        <p className="text-slate-400 text-lg max-w-5xl leading-relaxed mx-auto">
          Your feedback is a vital part of my engineering journey. Whether
          it&apos;s about UI/UX, code structure, or overall performance—if
          you&apos;ve reviewed my work, your honest thoughts help me refine my
          skills and build world-class digital experiences.
        </p>

        <div className="flex items-center justify-center mt-8">
          <button
            onClick={() => setIsOpen(true)}
            className="w-[210px] h-[65px] bg-[#c7d300] text-black text-[14px] border-2 border-[#c7d300] uppercase font-bold hover:bg-transparent hover:text-white hover:border-2 hover:border-[#c7d300] duration-700 ease-in-out flex items-center justify-center gap-2 "
          >
            Leave a Suggestion
            <PencilLine className="w-5 h-5" />
          </button>
        </div>

        {/* ✅ Marquee Container — overflow: hidden রাখা safe কারণ tooltip এখন fixed */}
        <div
          className="mt-28 relative py-20"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: MARQUEE_SPEED,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              display: "flex",
              width: "max-content",
              // ✅ Hover করলে marquee pause হবে
              animationPlayState: tooltip ? "paused" : "running",
            }}
            className="flex whitespace-nowrap gap-10"
          >
            {[...dummySuggestions, ...dummySuggestions].map((suggestion, i) => {
              const key = `${suggestion.id}-${i}`;
              return (
                <div
                  key={key}
                  ref={(el) => {
                    if (el) cardRefs.current.set(key, el);
                    else cardRefs.current.delete(key);
                  }}
                  onMouseEnter={() => handleMouseEnter(suggestion, key)}
                  onMouseLeave={handleMouseLeave}
                  className="relative flex-none cursor-default"
                >
                  {/* Card Body */}
                  <div className="w-[340px] h-[240px] p-8 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 text-left shadow-xl transition-all duration-300 hover:border-[#c7d300]/50 group relative overflow-hidden">
                    <p className="text-neutral-300 italic mb-8 leading-relaxed line-clamp-4 text-sm md:text-base">
                      {suggestion.text}
                    </p>

                    <div className="absolute bottom-8 left-8 right-8 flex items-center gap-3 border-t border-neutral-800/50 pt-5">
                      <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-white font-bold border border-neutral-700">
                        {suggestion.name.charAt(0)}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-white truncate">
                          {suggestion.name}
                        </p>
                        <p className="text-xs text-neutral-500 font-medium truncate">
                          {suggestion.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ✅ Portal Tooltip — document.body-তে render হয় */}
      <TooltipPortal tooltip={tooltip} />

      {/* Modal Section */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative w-full max-w-lg bg-neutral-900 p-6 z-10 border border-neutral-800"
            >
              <div className="flex justify-between items-start mb-8 text-left">
                <div>
                  <h3 className="text-3xl font-black text-white mb-2 tracking-tight">
                    Recruiter Input
                  </h3>
                  <p className="text-sm text-neutral-500">
                    I value your time and feedback.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w bg-neutral-800 hover:bg-neutral-700 rounded-full text-neutral-400 transition-colors p-2"
                >
                  <X />
                </button>
              </div>

              <form
                className="space-y-6 text-left"
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
              >
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-neutral-500 ml-1">
                    Current Status
                  </label>

                  <Select>
                    <SelectTrigger className="w-full h-14 bg-neutral-800 border-none rounded-none text-white outline-none focus:ring-2 focus:ring-[#c7d300] transition-all">
                      <SelectValue placeholder="Select your status" />
                    </SelectTrigger>

                    <SelectContent
                      position="popper"
                      className="bg-neutral-900 border-neutral-800 text-white rounded-2xl z-[3000]"
                    >
                      <SelectItem value="suggestion">
                        Just leaving a suggestion
                      </SelectItem>
                      <SelectItem value="shortlisted">
                        Shortlisted for Interview
                      </SelectItem>
                      <SelectItem value="not-fit">
                        Not a fit at this time
                      </SelectItem>
                      <SelectItem value="more-projects">
                        Want to see more projects
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-3 text-neutral-500 ml-1">
                    Your Suggestions
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell me how I can improve..."
                    className="w-full p-4 bg-neutral-800 border-none rounded-none text-white outline-none focus:ring-2 focus:ring-[#c7d300] resize-none placeholder:text-neutral-600"
                  ></textarea>
                </div>
                <div className="flex gap-4 pt-4">
                  {/* Outline Button */}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 h-[52px] bg-transparent text-white text-[13px] uppercase font-bold border-2 border-transparent hover:border-[#c7d300] hover:bg-[#0f100b] transition-all duration-500 ease-in-out flex items-center justify-center"
                  >
                    Close
                  </button>

                  {/* Primary Button */}
                  <button
                    type="submit"
                    className="flex-1 h-[52px] bg-[#c7d300] text-black text-[13px] uppercase font-bold border-2 border-[#c7d300] hover:bg-transparent hover:text-white hover:border-[#c7d300] transition-all duration-500 ease-in-out flex items-center justify-center"
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
