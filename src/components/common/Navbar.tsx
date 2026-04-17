"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  User,
  Briefcase,
  ClipboardList,
  Hash,
  FileText,
  MessageSquare,
  Cpu,
} from "lucide-react";

type NavItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
};

const navItems: NavItem[] = [
  { id: "home", icon: <Home size={30} />, label: "Home" },
  { id: "about", icon: <User size={30} />, label: "Profile" },
  { id: "skills", icon: <Cpu size={30} />, label: "Skills" },
  { id: "resume", icon: <FileText size={30} />, label: "Resume" },
  { id: "projects", icon: <Briefcase size={30} />, label: "Projects" },
  { id: "experience", icon: <ClipboardList size={30} />, label: "Experience" },
  { id: "knowledge", icon: <Hash size={30} />, label: "Knowledge" },
  { id: "contact", icon: <MessageSquare size={30} />, label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      
      let currentActive = active;
      sections.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentActive = section.id;
          }
        }
      });
      setActive(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active]);

  // --- Smooth Scroll Logic (Modified for better control) ---
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // ডিফল্ট behavior এর বদলে offsetTop ব্যবহার করে স্ক্রলিং স্পিডকে ন্যাচারাল করা হয়েছে
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-5 z-50 flex flex-col items-center w-[68px] h-screen bg-transparent py-5 gap-3">
      {/* Logo */}
      <div className="mb-3 flex items-center justify-center w-full px-3">
        <div className="flex items-center gap-1">
          <span className="text-[#c8e63b] text-xl font-bold leading-none">
            i
          </span>
          <span className="text-white text-xl font-bold tracking-tight leading-none">
            Sti
          </span>
        </div>
      </div>

      {/* Nav Icons */}
      <div className="flex flex-col gap-3 w-full px-3">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActive(item.id);
                scrollToSection(item.id);
              }}
              aria-label={item.label}
              className={`
                group relative flex items-center justify-center
                w-[65px] h-[65px] rounded-[8px]
                transition-all duration-200 ease-in-out
                ${
                  isActive
                    ? "bg-[#c8e63b] text-[#1a1a1a] shadow-[0_0_12px_rgba(200,230,59,0.3)]"
                    : "bg-[#15160e] text-white hover:bg-[#c7d300] hover:text-black"
                }
              `}
            >
              {item.icon}

              {/* Tooltip */}
              <span
                className="
                  absolute left-[calc(100%+10px)] z-50
                  whitespace-nowrap rounded-md
                  bg-[#2a2a2a] text-white text-xs font-medium
                  px-2.5 py-1.5
                  opacity-0 pointer-events-none
                  group-hover:opacity-100
                  transition-opacity duration-150
                  border border-[#3a3a3a]
                  shadow-lg
                "
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}