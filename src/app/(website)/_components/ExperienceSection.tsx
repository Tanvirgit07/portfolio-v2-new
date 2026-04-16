/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const experiences = [
  {
    id: 1,
    role: "Full Stack Developer Intern",
    company: "Huda Technologies, Pune",
    duration: "June 2020 - May 2021",
    side: "left",
    achievements: [
      "Developed REST APIs using Node.js",
      "Optimized database queries for 20% faster load.",
    ],
  },
  {
    id: 2,
    role: "Full Stack Developer Intern",
    company: "Bizmetric, Pune",
    duration: "Nov 2020 - April 2021",
    side: "right",
    achievements: [
      "Built responsive UI components with React",
      "Collaborated on enterprise-scale dashboards.",
    ],
  },
  {
    id: 3,
    role: "Associate Software Engineer",
    company: "Bizmetric, Pune",
    duration: "May 2021 - Jan 2022",
    side: "left",
    achievements: [
      "Lead the frontend migration to Next.js",
      "Integrated secure OAuth 2.0 authentication.",
    ],
  },
  {
    id: 4,
    role: "Blogger & Tech Writer",
    company: "Medium.com",
    duration: "Nov 2021 - Present",
    side: "right",
    desc: "I write blogs about Web/Mobile Development, sharing insights with 680+ followers.",
    achievements: [
      "Published 50+ articles",
      "Reached 100k+ monthly impressions.",
    ],
  },
  {
    id: 5,
    role: "Software Engineer",
    company: "CCR Technologies",
    duration: "Feb 2022 - Present",
    side: "left",
    achievements: [
      "Architecting scalable microservices",
      "Mentoring junior developers and interns.",
    ],
  },
];

const Experience = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 80%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      className="bg-[#0f100a] overflow-hidden selection:bg-[#c7d300] selection:text-black"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto my-16">
        <div className="text-left relative z-20">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6 md:whitespace-nowrap">
            MY <span className="text-[#c7d300]">EXPERIENCE</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-lg max-w-4xl leading-relaxed text-justify">
            A showcase of my professional journey and hands-on experience in
            building real-world applications. I focus on delivering scalable,
            high-performance, and user-centric solutions while maintaining clean
            code and efficiency.
          </p>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 mb-10">
        {/* Background Main Line (Dashed) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-white/5 hidden md:block border-l border-dashed border-white/20"></div>

        {/* Animated Neon Line */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-[#c7d300] origin-top hidden md:block shadow-[0_0_15px_#c7d300]"
        ></motion.div>

        <div className="space-y-24">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative flex items-center justify-between md:flex-row flex-col"
            >
              {/* --- LEFT SIDE --- */}
              <div className="md:w-[42%] w-full">
                {exp.side === "left" && (
                  <motion.div
                    // Initial state (Hide)
                    initial={{
                      opacity: 0,
                      x: -60,
                      filter: "blur(10px)",
                      scale: 0.9,
                    }}
                    // While in view (Show)
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      filter: "blur(0px)",
                      scale: 1,
                    }}
                    // Exit state (Hide when scrolling up/away)
                    exit={{
                      opacity: 0,
                      x: -60,
                      filter: "blur(10px)",
                      scale: 0.9,
                    }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    // once: false ensures it triggers every time you scroll past it
                    viewport={{ once: false, amount: 0.3 }}
                    className="p-8 
                     bg-[#15160e] border border-white/10 hover:border-[#c7d300]/50 transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-[#c7d300] transition-colors">
                        {exp.role}
                      </h3>
                      <span className="md:hidden inline-block px-3 py-1 bg-[#c7d300]/10 text-[#c7d300] text-[10px] rounded-full font-bold uppercase">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-gray-400 font-medium mb-4">
                      {exp.company}
                    </p>

                    <ul className="space-y-2">
                      {exp.achievements?.map((point, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-500 flex items-start gap-2"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#c7d300]/40" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                {exp.side === "right" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    className="hidden md:flex flex-col items-end pr-12 text-right"
                  >
                    <span className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                      Duration
                    </span>
                    <div className="px-5 py-2 rounded-full border border-white/10 text-white font-bold text-sm bg-white/5">
                      {exp.duration}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* --- MIDDLE CIRCLE --- */}
              <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center z-20">
                <div className="w-12 h-12 rounded-full bg-[#0f100a] border-2 border-white/10 flex items-center justify-center group">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false }}
                    className="w-4 h-4 bg-[#c7d300] rounded-full shadow-[0_0_15px_#c7d300]"
                  />
                </div>
              </div>

              {/* --- RIGHT SIDE --- */}
              <div className="md:w-[42%] w-full mt-8 md:mt-0">
                {exp.side === "right" && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: 60,
                      filter: "blur(10px)",
                      scale: 0.9,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      filter: "blur(0px)",
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      x: 60,
                      filter: "blur(10px)",
                      scale: 0.9,
                    }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="p-8 
                     bg-[#15160e] border border-white/10 hover:border-[#c7d300]/50 transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-[#c7d300] transition-colors">
                        {exp.role}
                      </h3>
                      <span className="md:hidden inline-block px-3 py-1 bg-[#c7d300]/10 text-[#c7d300] text-[10px] rounded-full font-bold uppercase">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-gray-400 font-medium mb-4">
                      {exp.company}
                    </p>
                    {exp.desc && (
                      <p className="text-sm text-gray-500 italic mb-4">
                        {exp.desc}
                      </p>
                    )}

                    <ul className="space-y-2">
                      {exp.achievements?.map((point, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-500 flex items-start gap-2"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#c7d300]/40" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                {exp.side === "left" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    className="hidden md:flex flex-col items-start pl-12 text-left"
                  >
                    <span className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                      Duration
                    </span>
                    <div className="px-5 py-2 rounded-full border border-white/10 text-white font-bold text-sm bg-white/5">
                      {exp.duration}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
