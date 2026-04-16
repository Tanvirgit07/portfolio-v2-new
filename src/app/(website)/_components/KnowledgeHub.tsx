"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
 ExternalLink, X, Search, ChevronLeft, ChevronRight, 
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
    id: 1,
    category: "Logic",
    title: "Eco-Smart Dashboard",
    description: "A comprehensive IoT dashboard for monitoring renewable energy consumption and carbon footprint in real-time.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bbda38a5f85d?q=80&w=800",
    fullContent: "The Eco-Smart Dashboard leverages real-time data streaming via WebSockets to provide users with an intuitive interface for managing solar and wind energy. Built with Next.js 14, it features dynamic charts that update without page refreshes.",
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800"],
    tags: ["Next.js", "TypeScript", "IoT"],
    date: "Jan 15, 2024",
    codeSnippet: "const socket = new WebSocket('wss://api.eco-smart.com/live');"
  },
  {
    id: 2,
    category: "Problem Solving",
    title: "Optimizing API Latency",
    description: "How I reduced server response time by 60% using Redis caching and database indexing strategies.",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800",
    tags: ["Backend", "Redis"],
    date: "Feb 02, 2024",
    codeSnippet: "await redis.setex(cacheKey, 3600, JSON.stringify(data));"
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
  {
    id: 4,
    category: "Logic",
    title: "Framer Motion Best Practices",
    description: "A deep dive into creating high-performance layout animations without compromising on bundle size.",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=800",
    tags: ["UI/UX", "Animation"],
    date: "Mar 22, 2024",
  },
  {
    id: 5,
    category: "Problem Solving",
    title: "Next.js State Persistence",
    description: "Solving the challenge of maintaining global state across page reloads in SSR applications.",
    thumbnail: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800",
    tags: ["Next.js", "State"],
    date: "Apr 05, 2024",
  },
  {
    id: 6,
    category: "Blog",
    title: "Micro-Frontends Guide",
    description: "Breaking down monolithic applications into smaller, independently deployable units.",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800",
    tags: ["DevOps", "Scaling"],
    date: "Apr 12, 2024",
  }
];

export default function KnowledgeHub() {
  const [filter, setFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<Insight | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    <section className="bg-[#15160e] py-20 font-sans min-h-screen selection:bg-[#c7d300] selection:text-black">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[600px]">
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
                  <Image fill src={item.thumbnail} alt={item.title} className="object-cover group-hover:scale-110 transition-transform duration-700" />
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
                      {item.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[9px] font-bold text-[#c7d300] px-3 py-1 bg-[#c7d300]/5 border border-[#c7d300]/10 rounded-lg">
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
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
                    currentPage === i + 1 ? "bg-[#c7d300] text-black" : "border border-neutral-800 text-neutral-500 hover:border-neutral-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-4 border border-neutral-800 rounded-2xl text-neutral-500 hover:text-[#c7d300] disabled:opacity-20 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Modal with Inline Scrollbar Fix */}
        <AnimatePresence>
          {selectedPost && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedPost(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] cursor-pointer"
              />

              <motion.div
                initial={{ y: "100%" }} animate={{ y: "5%" }} exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed inset-x-0 bottom-0 h-[95%] bg-[#15160e] border-t border-neutral-800 z-[101] rounded-t-[3rem] shadow-2xl overflow-hidden flex flex-col"
              >
                <div className="sticky top-0 p-6 border-b border-neutral-800/50 flex justify-between items-center bg-[#15160e]/80 backdrop-blur-xl z-20">
                   <div className="flex items-center gap-4">
                      <span className="bg-[#c7d300] text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {selectedPost.category}
                      </span>
                      <h4 className="text-neutral-400 text-xs font-mono hidden md:block">{selectedPost.date}</h4>
                   </div>
                   <button onClick={() => setSelectedPost(null)} className="p-3 bg-neutral-800 hover:bg-red-500/20 text-neutral-400 hover:text-red-500 rounded-full transition-all">
                      <X size={20} />
                   </button>
                </div>

                {/* ✅ Added scrollbar styling via Tailwind arbitrary variants */}
                <div className="flex-1 overflow-y-auto p-8 md:p-20 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-800 [&::-webkit-scrollbar-thumb]:rounded-full">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
                      {selectedPost.title}
                    </h2>

                    <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden mb-12 border border-neutral-800">
                       <Image fill src={selectedPost.thumbnail} alt="hero" className="object-cover" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                      <div className="lg:col-span-2 space-y-8">
                         <p className="text-xl text-neutral-300 leading-relaxed italic border-l-4 border-[#c7d300] pl-8">
                           {selectedPost.description}
                         </p>
                         <p className="text-neutral-400 text-lg leading-loose">
                           {selectedPost.fullContent || "Detailed technical documentation and workflow breakdown coming soon."}
                         </p>

                         {selectedPost.codeSnippet && (
                           <div className="mt-12 space-y-4">
                              <h5 className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-widest">
                                <Code2 className="text-[#c7d300]" size={18}/> Technical Snippet
                              </h5>
                              <pre className="bg-black/50 p-8 rounded-[2rem] border border-neutral-800 overflow-x-auto [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-800">
                                <code className="text-[#c7d300]/80 font-mono text-sm leading-relaxed">{selectedPost.codeSnippet}</code>
                              </pre>
                           </div>
                         )}
                      </div>

                      <div className="space-y-8">
                         <div className="p-8 bg-neutral-900/30 rounded-3xl border border-neutral-800">
                            <h5 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Stack & Tags</h5>
                            <div className="flex flex-wrap gap-2">
                               {selectedPost.tags.map(tag => (
                                 <span key={tag} className="px-4 py-2 bg-neutral-800 rounded-xl text-neutral-400 text-[10px] font-bold">#{tag}</span>
                               ))}
                            </div>
                         </div>
                      </div>
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