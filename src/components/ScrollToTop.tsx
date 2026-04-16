"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Progress bar-এর মুভমেন্টকে মখমলে করার জন্য useSpring
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const toggleVisibility = () => {
      // ২০০ পিক্সেলের বেশি স্ক্রল করলে বাটনটি দেখা যাবে
      if (window.scrollY > 200) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div 
      className={`fixed bottom-8 right-8 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div 
        className="relative flex items-center justify-center cursor-pointer group"
        onClick={scrollToTop}
      >
        {/* SVG Progress Circle */}
        <svg width="60" height="60" viewBox="0 0 100 100" className="-rotate-90">
          {/* ব্যাকগ্রাউন্ড সার্কেল (হালকা রঙ) */}
          <circle
            cx="50" cy="50" r="40"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
            className="text-gray-200 dark:text-gray-800"
          />
          {/* প্রগ্রেস সার্কেল (কালার ফিল হবে) */}
          <motion.circle
            cx="50" cy="50" r="40"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            style={{ pathLength }}
            className="text-[#c7d300]"
          />
        </svg>

        {/* এরো আইকন */}
        <div className="absolute transition-transform duration-300 group-hover:-translate-y-1">
          <ArrowUp size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
}