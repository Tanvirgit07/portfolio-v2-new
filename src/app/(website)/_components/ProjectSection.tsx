"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  SquareArrowOutUpRight,
  LayoutGrid,
  Layers,
  List,
} from "lucide-react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Eco-Smart Dashboard",
    description: "A comprehensive IoT dashboard for monitoring renewable energy consumption in real-time.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "AI Image Generator",
    description: "A powerful platform that uses stable diffusion to generate high-quality artistic images.",
    tags: ["React", "Node.js", "OpenAI"],
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Crypto Nexus Wallet",
    description: "Secure multi-currency wallet with real-time market tracking and instant swap capabilities.",
    tags: ["Next.js", "Web3", "Framer Motion"],
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
  },
];

// --- Stacked Card Component ---
const StackedCard = ({ project, index, total }: { project: Project; index: number; total: number }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "start start"] });
  const targetScale = 1 - (total - index) * 0.05;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale, top: `calc(5% + ${index * 30}px)`, backgroundColor: "#15160e" }}
        className="relative h-[500px] w-full max-w-[1100px] rounded-[40px] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl"
      >
        <div className="flex-1 p-10 md:p-14 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[#c7d300]" />
              <span className="text-[#c7d300] text-[10px] font-bold tracking-[0.4em] uppercase">Project 0{index + 1}</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-none">{project.title}</h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-sm">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-4 py-1.5 bg-white/[0.03] border border-white/5 rounded-full text-[11px] text-white/70">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex-1 h-[55px] md:w-[180px] bg-[#c7d300] text-black text-[13px] uppercase font-bold hover:bg-transparent hover:text-white border-2 border-[#c7d300] transition-all duration-500 flex items-center justify-center gap-2">
              View Details <SquareArrowOutUpRight size={18} />
            </button>
          </div>
        </div>
        <div className="flex-1 relative overflow-hidden group">
          <Image fill src={project.image} alt={project.title} className="object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1a1b12] via-transparent to-transparent opacity-80" />
        </div>
      </motion.div>
    </div>
  );
};

// --- Grid Card Component ---
const GridCard = ({ project }: { project: Project }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }} 
    animate={{ opacity: 1, scale: 1 }} 
    className="bg-[#1a1b12] rounded-3xl border border-white/10 overflow-hidden group"
  >
    <div className="relative h-64">
      <Image fill src={project.image} alt={project.title} className="object-cover transition-transform duration-500 group-hover:scale-110" />
    </div>
    <div className="p-8">
      <h3 className="text-2xl font-bold text-white mb-3 tracking-tighter">{project.title}</h3>
      <p className="text-slate-400 text-sm mb-6 line-clamp-2">{project.description}</p>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex gap-2">
            {project.tags.slice(0, 2).map(tag => <span key={tag} className="text-[10px] text-[#c7d300] border border-[#c7d300]/30 px-2 py-1 rounded-md">{tag}</span>)}
        </div>
        <SquareArrowOutUpRight size={18} className="text-white/40 group-hover:text-[#c7d300] transition-colors cursor-pointer" />
      </div>
    </div>
  </motion.div>
);

// --- List Card Component ---
const ListCard = ({ project, index }: { project: Project, index: number }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, x: -20 }} 
    animate={{ opacity: 1, x: 0 }} 
    className="group flex items-center justify-between p-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors"
  >
    <div className="flex items-center gap-8">
      <span className="text-white/10 font-bold text-2xl tracking-tighter">0{index + 1}</span>
      <div>
        <h3 className="text-xl font-bold text-white group-hover:text-[#c7d300] transition-colors">{project.title}</h3>
        <div className="flex gap-4 mt-1">
            {project.tags.map(tag => <span key={tag} className="text-[11px] text-slate-500">{tag}</span>)}
        </div>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <p className="text-slate-500 text-sm hidden lg:block max-w-md line-clamp-1">{project.description}</p>
      <div className="flex gap-3">
        <button className="p-2 border border-white/10 rounded-full hover:bg-[#c7d300] hover:text-black transition-all">
          <SquareArrowOutUpRight size={16} />
        </button>
      </div>
    </div>
  </motion.div>
);

export default function ProjectSection() {
  const [view, setView] = useState<"stack" | "grid" | "list">("stack");

  return (
    <section className="relative bg-[#0f100a] px-6 min-h-screen">
      <div className="max-w-7xl mx-auto pt-16 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div className="text-left relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">
              SELECTED <span className="text-[#c7d300]">PROJECTS</span>
            </h2>
            <p className="text-white/40 text-sm md:text-base max-w-2xl leading-relaxed">
              A curated collection of my recent work — featuring modern dashboards, AI-powered applications, and scalable Web3 platforms.
            </p>
          </motion.div>

          {/* --- View Toggle Buttons --- */}
          <div className="flex items-center bg-[#15160e] p-1.5 rounded-2xl border border-white/5 shadow-2xl">
            <button 
              onClick={() => setView("stack")} 
              className={`p-3 rounded-xl transition-all ${view === "stack" ? "bg-[#c7d300] text-black shadow-lg" : "text-white/40 hover:text-white"}`}
            >
              <Layers size={20} />
            </button>
            <button 
              onClick={() => setView("grid")} 
              className={`p-3 rounded-xl transition-all ${view === "grid" ? "bg-[#c7d300] text-black shadow-lg" : "text-white/40 hover:text-white"}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setView("list")} 
              className={`p-3 rounded-xl transition-all ${view === "list" ? "bg-[#c7d300] text-black shadow-lg" : "text-white/40 hover:text-white"}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pb-32">
        <AnimatePresence mode="wait">
          {view === "stack" && (
            <motion.div key="stack" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-[-40px]">
              {projects.map((project, i) => (
                <StackedCard key={i} index={i} project={project} total={projects.length} />
              ))}
            </motion.div>
          )}

          {view === "grid" && (
            <motion.div 
              key="grid" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
            >
              {projects.map((project, i) => (
                <GridCard key={i} project={project} />
              ))}
            </motion.div>
          )}

          {view === "list" && (
            <motion.div 
              key="list" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="mt-10 flex flex-col bg-[#1a1b12]/50 rounded-[32px] border border-white/10 overflow-hidden"
            >
              {projects.map((project, i) => (
                <ListCard key={i} index={i} project={project} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#c7d300]/5 to-transparent pointer-events-none" />
    </section>
  );
}