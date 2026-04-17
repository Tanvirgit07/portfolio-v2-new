/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { SquareArrowOutUpRight, LayoutGrid, Layers, List, ExternalLink, Code2, X } from "lucide-react";
import Image from "next/image";

// --- Project Data ---
const projects = [
  {
    title: "Eco-Smart Dashboard",
    description: "A comprehensive IoT dashboard for monitoring renewable energy consumption in real-time.",
    category: "Development",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    fullContent: "Detailed breakdown of the Eco-Smart project...",
    codeSnippet: "const energy = useConsumption();"
  },
  {
    title: "AI Image Generator",
    description: "A powerful platform that uses stable diffusion to generate high-quality artistic images.",
    category: "AI / ML",
    tags: ["React", "Node.js", "OpenAI"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Crypto Nexus Wallet",
    description: "Secure multi-currency wallet with real-time market tracking and instant swap capabilities.",
    category: "Web3",
    tags: ["Next.js", "Web3", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
  },
];

// --- Stacked Card Component ---
const StackedCard = ({
  project,
  index,
  total,
  onOpen, // added prop
}: {
  project: any;
  index: number;
  total: number;
  onOpen: (p: any) => void; // added type
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const targetScale = 1 - (total - index) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-[800px] flex items-start justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          top: `calc(100px + ${index * 40}px)`,
        }}
        className="relative h-[520px] w-full max-w-[1250px] border border-white/[0.15] overflow-hidden flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#0f100a]"
      >
        <div className="flex-1 p-10 md:p-14 flex flex-col justify-between relative z-10 bg-[#0f100a]">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[1px] bg-[#c7d300]" />
              <span className="text-[#c7d300] text-[10px] font-bold tracking-[0.4em] uppercase">
                Project 0{index + 1}
              </span>
            </div>
            <h3 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-none">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/[0.05] border border-white/10 rounded-full text-[11px] text-white/80 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onOpen(project)} // Now this works
              className="flex-1 h-[60px] md:w-[200px] bg-[#c7d300] text-black text-[13px] uppercase font-bold hover:shadow-[0_0_25px_rgba(199,211,0,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Explore Project
              <SquareArrowOutUpRight
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </div>
        </div>

        <div className="flex-1 relative overflow-hidden group">
          <Image
            fill
            src={project.image}
            alt={project.title}
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0f100a] via-[#0f100a]/60 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
};

// --- Grid Card Component ---
const GridCard = ({ project, onOpen }: { project: any; onOpen: (p: any) => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    onClick={() => onOpen(project)}
    className="bg-[#15160e] border border-white/10 overflow-hidden group flex flex-col shadow-xl cursor-pointer"
  >
    <div className="relative h-64 overflow-hidden">
      <Image
        fill
        src={project.image}
        alt={project.title}
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </div>
    <div className="p-8 flex flex-col flex-grow">
      <h3 className="text-2xl font-bold text-white mb-3 tracking-tighter group-hover:text-[#c7d300] transition-colors">
        {project.title}
      </h3>
      <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
        {project.description}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex gap-2">
          {project.tags.slice(0, 2).map((tag: string) => (
            <span
              key={tag}
              className="text-[10px] text-[#c7d300] border border-[#c7d300]/30 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#c7d300] group-hover:text-black transition-all">
          <SquareArrowOutUpRight size={16} />
        </div>
      </div>
    </div>
  </motion.div>
);

// --- List Card Component ---
const ListCard = ({ project, index, onOpen }: { project: any; index: number; onOpen: (p: any) => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    onClick={() => onOpen(project)}
    className="group flex flex-col md:flex-row items-start md:items-center justify-between p-8 border-b border-white/5 hover:bg-white/[0.02] transition-all cursor-pointer"
  >
    <div className="flex items-center gap-8">
      <span className="text-white/10 font-black text-4xl tracking-tighter group-hover:text-[#c7d300] transition-colors">
        0{index + 1}
      </span>
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#c7d300] transition-colors">
          {project.title}
        </h3>
        <div className="flex gap-4 mt-2">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="text-[11px] text-slate-500 font-medium tracking-wider uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
    <div className="flex items-center gap-10 mt-4 md:mt-0">
      <p className="text-slate-500 text-sm hidden lg:block max-w-md line-clamp-1 italic">
        {project.description}
      </p>
      <button className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:border-[#c7d300] group-hover:bg-[#c7d300] group-hover:text-black transition-all">
        <SquareArrowOutUpRight size={20} />
      </button>
    </div>
  </motion.div>
);

export default function ProjectSection() {
  const [view, setView] = useState<"stack" | "grid" | "list">("stack");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  // Helper to handle opening modal
  const handleOpenModal = (project: any) => {
    setSelectedProject(project);
    setActiveImage(0); // reset image index when opening
  };

  return (
    <section className="relative bg-[#0f100a] px-6 min-h-screen selection:bg-[#c7d300] selection:text-black">
      <div className="max-w-7xl mx-auto pt-24 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="text-left relative z-20">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6 md:whitespace-nowrap">
              MY <span className="text-[#c7d300]">PROJECTS</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-lg max-w-4xl leading-relaxed text-justify">
              Merging aesthetics with functionality. A collection of digital
              experiences built with precision and passion.
            </p>
          </div>

          <div className="flex items-center bg-[#15160e] p-2 border border-white/10 shadow-2xl relative z-20">
            {(["stack", "grid", "list"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setView(mode)}
                className={`p-4 rounded-xl transition-all duration-300 relative ${view === mode ? "text-black" : "text-white/40"}`}
              >
                {view === mode && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#c7d300] rounded-lg"
                  />
                )}
                <span className="relative z-10">
                  {mode === "stack" && <Layers size={22} />}
                  {mode === "grid" && <LayoutGrid size={22} />}
                  {mode === "list" && <List size={22} />}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {view === "stack" && (
            <motion.div
              key="stack"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {projects.map((project, i) => (
                <StackedCard
                  key={i}
                  index={i}
                  project={project}
                  total={projects.length}
                  onOpen={handleOpenModal}
                />
              ))}
            </motion.div>
          )}

          {view === "grid" && (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
            >
              {projects.map((project, i) => (
                <GridCard key={i} project={project} onOpen={handleOpenModal} />
              ))}
            </motion.div>
          )}

          {view === "list" && (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-10 flex flex-col bg-[#15160e]/50 rounded-[40px] border border-white/10 overflow-hidden"
            >
              {projects.map((project, i) => (
                <ListCard key={i} index={i} project={project} onOpen={handleOpenModal} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] cursor-pointer"
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: "5%" }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 h-[95%] bg-[#0f100a] border-t border-neutral-800 z-[101] rounded-t-[3rem] overflow-hidden flex flex-col"
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-neutral-800 rounded-full z-40" />
              <div className="absolute top-6 right-6 z-50">
                <button onClick={() => setSelectedProject(null)} className="p-3 bg-white/5 hover:bg-red-500 text-white rounded-full transition-all border border-white/10">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                <div className="w-full lg:w-[55%] h-[45vh] lg:h-[98%] bg-[#0a0b07] relative border-b lg:border-b-0 lg:border-r border-neutral-800 flex flex-col">
                    <div className="flex flex-col h-full">
                      <div className="flex-1 relative m-6 md:m-10 rounded-[2.5rem] overflow-hidden border border-neutral-800">
                        <Image fill src={selectedProject.image} alt="Main" className="object-cover" />
                      </div>
                    </div>
                </div>

                <div className="w-full lg:w-[45%] h-full overflow-y-auto bg-[#0f100a] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:bg-[#1a1b14] [&::-webkit-scrollbar-thumb]:rounded-full">
                   <div className="p-8 md:p-16 space-y-12">
                      <div className="space-y-6">
                        <span className="bg-[#c7d300] text-black px-4 py-1 text-[10px] font-black uppercase rounded-sm">{selectedProject.category || "Project"}</span>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">{selectedProject.title}</h2>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {selectedProject.tags.map((tag: any) => (
                            <span key={tag} className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 text-[10px] font-bold">#{tag}</span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-8">
                        <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-light border-l-4 border-[#c7d300] pl-8">{selectedProject.description}</p>
                      </div>

                      {selectedProject.codeSnippet && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-neutral-400 text-[10px] font-black uppercase"><Code2 size={16} className="text-[#c7d300]"/><span>Logic Snippet</span></div>
                          <pre className="bg-black p-8 rounded-3xl border border-neutral-800 overflow-x-auto text-sm font-mono text-[#c7d300]/90 scrollbar-hide"><code>{selectedProject.codeSnippet}</code></pre>
                        </div>
                      )}

                      <button className="w-full py-6 bg-[#c7d300] text-black font-black uppercase text-sm flex items-center justify-center gap-3 rounded-[2rem] hover:bg-white transition-all shadow-[0_10px_30px_rgba(199,211,0,0.2)]">
                        Launch Live Project <ExternalLink size={20} />
                      </button>
                   </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}