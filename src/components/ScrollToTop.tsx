"use client";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Spring settings updated for a "buttery" feel
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 70, // একটু কমানো হয়েছে মুভমেন্ট নরম করার জন্য
    damping: 20,   // বাউন্স কন্ট্রোল করার জন্য
    restDelta: 0.001
  });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="relative flex items-center justify-center cursor-pointer group"
          >
            {/* SVG Progress Circle */}
            <svg width="60" height="60" viewBox="0 0 100 100" className="-rotate-90">
              {/* ব্যাকগ্রাউন্ড সার্কেল */}
              <circle
                cx="50" cy="50" r="40"
                fill="rgba(0,0,0,0.2)" // হালকা শ্যাডো ইফেক্ট
                stroke="currentColor"
                strokeWidth="4"
                className="text-gray-200 dark:text-gray-800"
              />
              {/* প্রগ্রেস সার্কেল */}
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

            {/* এরো আইকন - Floating Effect */}
            <motion.div 
              className="absolute text-white"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowUp size={24} className="group-hover:text-[#c7d300] transition-colors" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}