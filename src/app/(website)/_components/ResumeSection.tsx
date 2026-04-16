"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Eye, Copy, Check, ArrowUpRight } from "lucide-react";

export default function OptimizedResumeSection() {
  const [copied, setCopied] = useState(false);
  const resumeLink = "https://yourportfolio.com/resume.pdf";

  const handleCopy = () => {
    navigator.clipboard.writeText(resumeLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-[#15160e] py-16 px-6 font-sans border-t border-neutral-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative bg-[#1a1b14] border border-neutral-800 p-8 md:p-20 overflow-hidden shadow-none"
        >
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c7d300' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")` }} 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            
            {/* Content Side */}
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  className="flex items-center gap-3 text-[#c7d300] tracking-[0.5em] font-black text-[10px] uppercase"
                >
                  <span className="w-8 h-[1px] bg-[#c7d300]" />
                  Curriculum Vitae
                </motion.div>
                
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                  Experience <br /> 
                  <span className="text-neutral-800 [-webkit-text-stroke:1px_#c7d300]">In Detail.</span>
                </h2>
              </div>
              
              <p className="text-neutral-500 text-sm md:text-base max-w-lg leading-relaxed font-medium">
                I focus on building high-performance logic and seamless user interfaces. Download my detailed resume to explore my technical stack, project history, and professional journey.
              </p>
            </div>

            {/* Action Side - Optimized Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* View Button - Sharp Edges */}
              <motion.a
                href={resumeLink}
                target="_blank"
                whileHover={{ backgroundColor: "#22231b" }}
                className="flex flex-col justify-between p-8 bg-[#11120d] border border-neutral-800 text-white transition-all group relative overflow-hidden"
              >
                <Eye size={24} className="text-[#c7d300] mb-12" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest">Preview</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h4 className="text-lg font-bold">Open PDF</h4>
                </div>
              </motion.a>

              {/* Download Button - Sharp Edges */}
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ y: -5 }}
                className="flex flex-col justify-between p-8 bg-[#c7d300] text-black transition-all shadow-[8px_8px_0px_#22231b]"
              >
                <Download size={24} className="mb-12" />
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Offline Copy</span>
                  <h4 className="text-lg font-bold uppercase">Download CV</h4>
                </div>
              </motion.a>

              {/* Copy Link Button - Optimized Width */}
              <button
                onClick={handleCopy}
                className="sm:col-span-2 flex items-center justify-between p-6 bg-transparent border border-neutral-800 text-neutral-500 hover:text-white hover:border-[#c7d300]/50 transition-all text-[10px] font-bold uppercase tracking-widest group"
              >
                <div className="flex items-center gap-3">
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div key="check" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-[#c7d300]">
                        <Check size={16} /> Link Stored in Clipboard
                      </motion.div>
                    ) : (
                      <motion.div key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                        <Copy size={16} /> Copy Direct Link
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <span className="text-neutral-800 font-mono lowercase opacity-0 group-hover:opacity-100 transition-opacity">v2.4.0_stable</span>
              </button>

            </div>
          </div>
        </motion.div>

        {/* Bottom Label */}
        <div className="mt-12 flex justify-between items-center text-neutral-800 text-[9px] font-black uppercase tracking-[0.3em]">
          <span>© 2026 Personal Portfolio</span>
          <span className="h-[1px] flex-1 mx-8 bg-neutral-900" />
          <span>Next.js + Framer Motion</span>
        </div>
      </div>
    </section>
  );
}