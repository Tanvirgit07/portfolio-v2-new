"use client";
import React from "react";
import { Github, Linkedin, Twitter, Dribbble, Heart } from "lucide-react";

export default function SimpleFooter() {
  const currentYear = new Date().getFullYear();

  const routes = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: <Github size={18} />, href: "#" },
    { icon: <Linkedin size={18} />, href: "#" },
    { icon: <Twitter size={18} />, href: "#" },
    { icon: <Dribbble size={18} />, href: "#" },
  ];

  return (
    <footer className="bg-[#0a0a0a] border-t border-neutral-900 py-10 px-6 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* ✅ Left Side: Simple Horizontal Routes */}
        <nav className="flex flex-wrap items-center gap-x-8 gap-y-2">
          {routes.map((route) => (
            <a 
              key={route.label} 
              href={route.href}
              className="text-neutral-500 hover:text-[#c7d300] text-[10px] font-black uppercase tracking-[0.2em] transition-all"
            >
              {route.label}
            </a>
          ))}
        </nav>

        {/* ✅ Middle: Copyright & Credits */}
        <div className="flex flex-col items-center gap-1">
          <div className="text-neutral-600 text-[9px] font-black uppercase tracking-widest">
            © {currentYear} ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center gap-1 text-neutral-700 text-[8px] font-bold uppercase tracking-widest">
            Built with <Heart size={8} className="fill-[#c7d300] text-[#c7d300]" /> by Jeffery Cannon
          </div>
        </div>

        {/* ✅ Right Side: Social Icons */}
        <div className="flex items-center gap-5">
          {socialLinks.map((social, index) => (
            <a 
              key={index} 
              href={social.href}
              className="text-neutral-600 hover:text-[#c7d300] transition-colors"
            >
              {social.icon}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}