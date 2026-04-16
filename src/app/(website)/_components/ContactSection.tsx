"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Twitter,
  Dribbble,
} from "lucide-react";

export default function UpdatedContactSection() {
  const services = [
    { id: "web-design", label: "Web Design" },
    { id: "mobile-design", label: "Mobile App Design" },
    { id: "collaboration", label: "Collaboration" },
    { id: "others", label: "Others" },
  ];

  const contactCards = [
    {
      icon: <Mail className="text-[#c7d300]" size={22} />,
      label: "You can Email Me Here",
      value: "jefferycannon@gmail.com",
      href: "mailto:jefferycannon@gmail.com",
    },
    {
      icon: <Phone className="text-[#c7d300]" size={22} />,
      label: "Give Me a Call on",
      value: "+91 91813 23 2309",
      href: "tel:+9191813232309",
    },
    {
      icon: <MapPin className="text-[#c7d300]" size={22} />,
      label: "Location",
      value: "Somewhere in the World",
      href: "#",
    },
  ];

  const socialLinks = [
    { icon: <Linkedin size={22} />, href: "#", bg: "#0077B5" },
    { icon: <Twitter size={22} />, href: "#", bg: "#1DA1F2" },
    { icon: <Dribbble size={22} />, href: "#", bg: "#EA4C89" },
  ];

  return (
    <section className="bg-[#15160e] pt-16 pb-10 px-6 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* ✅ Title Section - Moved to Top (Outside the grid) */}
        <div className="mb-16 space-y-2">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#c7d300] text-[10px] font-black uppercase tracking-[0.4em] block"
          >
            Contact Me
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none"
          >
            Get In <span className="text-[#c7d300]">Touch</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ✅ Left Side: Contact Cards & Socials (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-6">
              {contactCards.map((card, index) => (
                <motion.a
                  key={index}
                  href={card.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-center justify-between p-6 bg-[#1a1b14] border border-neutral-800 hover:border-[#c7d300]/30 transition-all"
                >
                  <div className="flex items-center gap-5">
                    <div className="p-3 bg-neutral-900 rounded-lg">
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-neutral-500 text-[10px] uppercase font-bold tracking-widest mb-1">
                        {card.label}
                      </p>
                      <p className="text-white font-semibold text-base">
                        {card.value}
                      </p>
                    </div>
                  </div>
                  <div className="p-3.5 bg-neutral-800 group-hover:bg-[#c7d300] rounded-md text-neutral-600 group-hover:text-black transition-all">
                    <ArrowRight size={18} className="text-white" />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Profiles */}
            <div className="pt-6 space-y-5">
              <h5 className="text-white font-bold text-sm tracking-widest uppercase">
                My Social Profiles
              </h5>
              <div className="flex items-center gap-4 bg-[#1a1b14] border border-neutral-800 p-6 w-fit shadow-xl">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    whileHover={{ y: -5 }}
                    style={{ background: social.bg }}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl text-white transition-all shadow-lg"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* ✅ Right Side: Professional Form (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 bg-[#1a1b14] border border-neutral-800 p-6 md:p-8 shadow-2xl relative flex flex-col items-center"
          >
            <form className="w-full space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {["First Name", "Last Name", "Email", "Phone Number"].map(
                  (field) => (
                    <div key={field} className="space-y-3">
                      <input
                        type={field === "Email" ? "email" : "text"}
                        placeholder={field}
                        className="w-full bg-[#11120d] border border-neutral-800 py-4 px-6 text-white text-sm focus:outline-none focus:border-[#c7d300]/40 transition-all placeholder:text-neutral-800 shadow-[inner_0_2px_4px_rgba(0,0,0,0.3)]"
                      />
                    </div>
                  ),
                )}
              </div>

              <div className="space-y-5">
                <h5 className="text-white font-bold text-sm tracking-widest uppercase ml-2">
                  Why are you contacting us?
                </h5>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-x-12 gap-y-6 bg-[#11120d] border border-neutral-800 p-8 shadow-[inner_0_2px_4px_rgba(0,0,0,0.3)]">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center gap-4 group"
                    >
                      <input
                        type="checkbox"
                        id={service.id}
                        className="peer w-6 h-6 border-2 border-neutral-700 bg-neutral-900 checked:bg-[#c7d300] checked:border-[#c7d300] appearance-none cursor-pointer transition-all"
                      />
                      <label
                        htmlFor={service.id}
                        className="text-neutral-300 peer-checked:text-white cursor-pointer text-sm font-medium tracking-wide"
                      >
                        {service.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <textarea
                  rows={6}
                  placeholder="Your Message here..."
                  className="w-full bg-[#11120d] border border-neutral-800 py-5 px-6 text-white text-sm focus:outline-none focus:border-[#c7d300]/40 transition-all placeholder:text-neutral-800 resize-none shadow-[inner_0_2px_4px_rgba(0,0,0,0.3)]"
                ></textarea>
              </div>

              <motion.button
                className="w-full h-[65px] 
  bg-[#c7d300] text-black text-[14px] 
  border-2 border-[#c7d300] 
  uppercase font-bold 
  hover:bg-transparent hover:text-white hover:border-[#c7d300] 
  duration-700 ease-in-out 
  flex items-center justify-center gap-2 
  mx-auto"
              >
                Send Message
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
