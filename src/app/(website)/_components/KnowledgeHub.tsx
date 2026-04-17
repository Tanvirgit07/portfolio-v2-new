"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  Code2,
} from "lucide-react";
import Image from "next/image";

interface Insight {
  id: number;
  category: "Blog" | "Logic" | "Problem Solving";
  title: string;
  description: string;
  thumbnail: string;
  fullContent?: string;
  images?: string[];
  videoUrl?: string;
  tags: string[];
  date: string;
  codeSnippet?: string;
}

const insightsData: Insight[] = [
  {
    id: 101,
    category: "Logic",
    title: "Neural Interface Design System",
    description: "A deep dive into building a design system for neural-link applications focusing on accessibility and cognitive load.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200",
    fullContent: "The design system was built to handle complex data visualizations. \n\nWe implemented a multi-layered approach where each layer represents a different cognitive priority. The UI responds to user eye-tracking data to highlight sections in real-time. \n\nOver the course of 6 months, we iterated on over 50 different grid systems before landing on this fluid, hexagonal structure.",
    images: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1200",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200"
    ],
    tags: ["UI/UX", "Neural-Link", "Design System"],
    date: "Oct 12, 2025",
    codeSnippet: "const cognitiveLoad = (data) => data.map(item => item.weight * 0.85);"
  },
  {
    id: 102,
    category: "Problem Solving",
    title: "Fluid Motion Physics in WebGL",
    description: "Implementing real-time fluid simulation using Three.js and custom GLSL shaders for high-performance web experiences.",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200",
    fullContent: "This project explores how we can use the GPU to render millions of particles in a fluid-like motion. \n\nBy leveraging WebGL shaders, we offload the heavy calculations from the CPU, allowing for a consistent 60FPS even on mobile devices.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ",
    tags: ["WebGL", "Three.js", "Shaders"],
    date: "Nov 05, 2025",
    codeSnippet: "uniform float uTime;\nvarying vec2 vUv;\nvoid main() {\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}"
  },
  {
    id: 3,
    category: "Blog",
    title: "The Future of Headless CMS",
    description: "Exploring why decoupled architectures are becoming the standard for modern enterprise applications.",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800",
    tags: ["CMS", "Architecture"],
    date: "Mar 10, 2024",
  },
];

export default function KnowledgeHub() {
  const [filter, setFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<Insight | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeImage, setActiveImage] = useState(0); // ✅ Fix 1: Added activeImage state
  const itemsPerPage = 10;

  // ✅ Fix 2: Reset active image when a new post is selected
  useEffect(() => {
    if (selectedPost) {
      setActiveImage(0);
    }
  }, [selectedPost]);

  const filteredData = useMemo(() => {
    return insightsData.filter((item) => {
      const matchesFilter = filter === "All" || item.category === filter;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [filter, searchQuery]);

  useEffect(() => {
    if (selectedPost) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
  }, [selectedPost]);

  const categories = ["All", "Blog", "Logic", "Problem Solving"];

  return (
    <section className="bg-[#15160e] py-20 font-sans selection:bg-[#c7d300] selection:text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Search */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="flex-1">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
              Insights & <span className="text-[#c7d300]">Solutions</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all border ${
                    filter === cat ? "bg-[#c7d300] border-[#c7d300] text-black shadow-[0_0_15px_rgba(199,211,0,0.2)]" : "bg-neutral-900/50 border-neutral-800 text-neutral-500 hover:border-neutral-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="relative group w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-[#c7d300] transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1b14] border border-neutral-800 py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#c7d300]/40 transition-all placeholder:text-neutral-600"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {paginatedData.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-[#1a1b14] border border-neutral-800/50 overflow-hidden flex flex-col hover:border-[#c7d300]/20 transition-all duration-500"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    fill
                    src={item.thumbnail}
                    alt={item.title}
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#c7d300] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-8 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-2">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-bold text-[#c7d300] px-3 py-1 bg-[#c7d300]/5 border border-[#c7d300]/10 rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedPost(item)}
                      className="p-3 bg-neutral-800/50 hover:bg-[#c7d300] rounded-2xl text-neutral-400 hover:text-black transition-all"
                    >
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination - Keep existing logic */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="p-4 border border-neutral-800 rounded-2xl text-neutral-500 hover:text-[#c7d300] disabled:opacity-20 transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 rounded-2xl text-xs font-bold transition-all ${
                    currentPage === i + 1
                      ? "bg-[#c7d300] text-black"
                      : "border border-neutral-800 text-neutral-500 hover:border-neutral-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="p-4 border border-neutral-800 rounded-2xl text-neutral-500 hover:text-[#c7d300] disabled:opacity-20 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}


        {/* --- MODAL SECTION --- */}
        <AnimatePresence>
          {selectedPost && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPost(null)}
                className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] cursor-pointer"
              />

              <motion.div
                initial={{ y: "100%" }} 
                animate={{ y: "5%" }} 
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="fixed inset-x-0 bottom-0 h-[95%] bg-[#0f100a] border-t border-neutral-800 z-[101] rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-2xl overflow-hidden flex flex-col"
              >
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-neutral-800 rounded-full z-40" />

                <div className="absolute top-6 right-6 md:right-10 z-50">
                   <button 
                     onClick={() => setSelectedPost(null)} 
                     className="p-3 bg-white/5 hover:bg-red-500 text-white rounded-full transition-all border border-white/10"
                   >
                      <X size={20} />
                   </button>
                </div>

                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                  {/* Left Side: Media */}
                  <div className="w-full lg:w-[55%] h-[45vh] lg:h-full bg-[#0a0b07] relative flex flex-col border-b lg:border-b-0 lg:border-r border-neutral-800">
                    {selectedPost.videoUrl ? (
                      <div className="w-full h-full flex items-center justify-center p-6 md:p-12">
                        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 bg-black">
                          <iframe 
                            src={selectedPost.videoUrl} 
                            className="absolute inset-0 w-full h-full"
                            allow="autoplay; encrypted-media" 
                            allowFullScreen
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col h-[95%]">
                        <div className="flex-1 relative m-6 md:m-10 rounded-[2rem] overflow-hidden border border-neutral-800 bg-neutral-900/50">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeImage}
                              initial={{ opacity: 0, scale: 1.05 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.4 }}
                              className="w-full h-full"
                            >
                              <Image 
                                fill 
                                src={(selectedPost.images && selectedPost.images.length > 0) ? selectedPost.images[activeImage] : selectedPost.thumbnail} 
                                alt="Preview" 
                                className="object-cover"
                                priority
                              />
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        {selectedPost.images && selectedPost.images.length > 1 && (
                          <div className="h-28 px-10 pb-10 flex gap-4 justify-center items-center overflow-x-auto no-scrollbar">
                            {selectedPost.images.map((img, idx) => (
                              <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 border-2 ${
                                  activeImage === idx ? "border-[#c7d300] scale-110 shadow-[0_0_20px_rgba(199,211,0,0.3)]" : "border-transparent opacity-40 hover:opacity-100"
                                }`}
                              >
                                <Image fill src={img} alt={`thumb-${idx}`} className="object-cover" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Side: Content */}
                  <div className="w-full lg:w-[45%] h-full overflow-y-auto bg-[#0f100a] custom-scrollbar">
                    <style jsx>{`
                      .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                      .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                      .custom-scrollbar::-webkit-scrollbar-thumb { background: #1a1b14; border-radius: 20px; }
                      .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #c7d30020; }
                      .no-scrollbar::-webkit-scrollbar { display: none; }
                    `}</style>
                    <div className="p-8 md:p-16 lg:p-20 space-y-12">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <span className="bg-[#c7d300] text-black px-4 py-1 text-[10px] font-black uppercase tracking-tighter rounded-sm">{selectedPost.category}</span>
                          <span className="text-neutral-600 font-mono text-xs">{selectedPost.date}</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">{selectedPost.title}</h2>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {selectedPost.tags.map(tag => (
                          <span key={tag} className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-400 text-xs font-bold">#{tag}</span>
                        ))}
                      </div>

                      <div className="space-y-8">
                        <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-light border-l-4 border-[#c7d300] pl-8">{selectedPost.description}</p>
                        <div className="text-neutral-500 text-lg leading-loose space-y-6 pt-4">
                           {selectedPost.fullContent ? selectedPost.fullContent.split('\n').map((para, i) => <p key={i}>{para}</p>) : <p>Detailed case study coming soon.</p>}
                        </div>
                      </div>

                      {selectedPost.codeSnippet && (
                        <div className="space-y-4 pt-4">
                          <div className="flex items-center gap-2 text-neutral-400 text-[10px] font-black uppercase tracking-[0.2em]"><Code2 size={16} className="text-[#c7d300]"/><span>Implementation Logic</span></div>
                          <pre className="bg-black p-8 rounded-3xl border border-neutral-800 overflow-x-auto text-sm font-mono text-[#c7d300]/90"><code>{selectedPost.codeSnippet}</code></pre>
                        </div>
                      )}

                      <button className="w-full py-6 bg-[#c7d300] text-black font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-white transition-all rounded-[2rem] group">
                        Launch Live Project <ExternalLink size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}