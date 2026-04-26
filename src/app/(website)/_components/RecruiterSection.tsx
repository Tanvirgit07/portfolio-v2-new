"use client";
import React, { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PencilLine, X, Loader2 } from "lucide-react"; // Loader2 added for loading state
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// ✅ Tooltip state type
type TooltipState = {
  id: string;
  x: number;
  y: number;
  text: string;
  role: string;
} | null;

// ✅ Portal-based Tooltip Component
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
  const queryClient = useQueryClient();

  // API Call: GET All Feedback
  const { data: response, isLoading: isFetching } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/feedback/getAllfeedback`,
      );
      return res.json();
    },
  });

  const feedbacks = response?.data?.feedbacks || [];

  // API Call: Create Feedback (POST)
  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/feedback/createfeedback`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      return res.json();
    },
    onSuccess: (data) => {
      toast.success(data.message || "Feedback submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      setIsOpen(false);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to submit feedback");
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // এখান থেকে ভ্যালুগুলো নেওয়া হচ্ছে
    const data = {
      status:
        (form.querySelector('[name="status"]') as HTMLInputElement)?.value ||
        "suggestion",
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
      name: "Anonymous Recruiter", // আপনি চাইলে ইনপুট ফিল্ড যোগ করতে পারেন
      role: "Hiring Professional",
      isActive: true,
    };

    mutation.mutate(data);
  };

  const MARQUEE_SPEED = 40;

  const handleMouseEnter = useCallback((suggestion: any, key: string) => {
    const el = cardRefs.current.get(key);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const tooltipWidth = 380;
    const x = rect.left + rect.width / 2;
    const y = rect.top - 12;
    const clampedX = Math.max(
      tooltipWidth / 2 + 8,
      Math.min(x, window.innerWidth - tooltipWidth / 2 - 8),
    );

    setTooltip({
      id: suggestion._id,
      x: clampedX,
      y,
      text: suggestion.message,
      role: suggestion.role,
    });
  }, []);

  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  return (
    <section className="relative pt-20 bg-[#15160e] font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="inline-block relative mb-3">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
            Recruiter <span className="text-[#c7d300]">Feedback</span>
          </h2>
        </div>

        <p className="text-slate-400 text-lg max-w-5xl leading-relaxed mx-auto">
          Your feedback is a vital part of my engineering journey. Whether
          it&apos;s about UI/UX, code structure, or overall performance...
        </p>

        <div className="flex items-center justify-center mt-8">
          <button
            onClick={() => setIsOpen(true)}
            className="w-[210px] h-[65px] bg-[#c7d300] text-black text-[14px] border-2 border-[#c7d300] uppercase font-bold hover:bg-transparent hover:text-white transition-all duration-700 flex items-center justify-center gap-2"
          >
            Leave a Suggestion
            <PencilLine className="w-5 h-5" />
          </button>
        </div>

        {/* Marquee Section */}
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
          {!isFetching && feedbacks.length > 0 && (
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
                animationPlayState: tooltip ? "paused" : "running",
              }}
              className="flex whitespace-nowrap gap-10"
            >
              {[...feedbacks, ...feedbacks].map((suggestion, i) => {
                const key = `${suggestion._id}-${i}`;
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
                    <div className="w-[340px] h-[240px] p-8 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 text-left shadow-xl transition-all duration-300 hover:border-[#c7d300]/50 group relative overflow-hidden">
                      <p className="text-neutral-300 italic mb-8 leading-relaxed line-clamp-4 text-sm md:text-base whitespace-normal">
                        {suggestion.message}
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
          )}
        </div>
      </div>

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
                  className="bg-neutral-800 hover:bg-neutral-700 rounded-full text-neutral-400 p-2"
                >
                  <X />
                </button>
              </div>

              <form className="space-y-6 text-left" onSubmit={handleFormSubmit}>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-neutral-500 ml-1">
                    Current Status
                  </label>
                  <Select name="status" defaultValue="suggestion">
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
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me how I can improve..."
                    className="w-full p-4 bg-neutral-800 border-none rounded-none text-white outline-none focus:ring-2 focus:ring-[#c7d300] resize-none placeholder:text-neutral-600"
                  ></textarea>
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 h-[52px] bg-transparent text-white text-[13px] uppercase font-bold border-2 border-transparent hover:border-[#c7d300] transition-all duration-500"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="flex-1 h-[52px] bg-[#c7d300] text-black text-[13px] uppercase font-bold border-2 border-[#c7d300] hover:bg-transparent hover:text-white transition-all duration-500 flex items-center justify-center"
                  >
                    {mutation.isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Submit Feedback"
                    )}
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
