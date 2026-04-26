"use client";
import React, { useState } from "react";
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
  Loader2,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function UpdatedContactSection() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    { id: "web-design", label: "Web Design" },
    { id: "mobile-design", label: "Mobile App Design" },
    { id: "collaboration", label: "Collaboration" },
    { id: "others", label: "Others" },
  ];

  // API Call logic using TanStack Mutation
  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/contact/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to send message");
      return result;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Message sent successfully!");
      setSelectedServices([]);
      // Form reset logic can be added here if needed via ref
    },
    onError: (err: any) => {
      toast.error(err.message || "Something went wrong!");
    },
  });

  const handleServiceChange = (label: string) => {
    setSelectedServices((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const elements = form.elements as any;

    const payload = {
      firstName: elements.firstName.value,
      lastName: elements.lastName.value,
      email: elements.email.value,
      phoneNumber: elements.phoneNumber.value,
      services: selectedServices,
      message: elements.message.value,
      status: "Pending",
    };

    if (selectedServices.length === 0) {
      toast.error("Please select at least one service");
      return;
    }

    mutation.mutate(payload);
    form.reset();
  };

  const contactCards = [
    {
      icon: <Mail className="text-[#c7d300]" size={22} />,
      label: "You can Email Me Here",
      value: "tanvir.dev@example.com",
      href: "mailto:tanvir.dev@example.com",
    },
    {
      icon: <Phone className="text-[#c7d300]" size={22} />,
      label: "Give Me a Call on",
      value: "+880 1234 567890",
      href: "tel:+8801234567890",
    },
    {
      icon: <MapPin className="text-[#c7d300]" size={22} />,
      label: "Location",
      value: "Dhaka, Bangladesh",
      href: "#",
    },
  ];

  const socialLinks = [
    { icon: <Linkedin size={22} />, href: "#", bg: "#0077B5" },
    { icon: <Twitter size={22} />, href: "#", bg: "#1DA1F2" },
    { icon: <Dribbble size={22} />, href: "#", bg: "#EA4C89" },
  ];

  return (
    <section className="bg-[#15160e] pt-16 pb-10 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
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
          {/* Left Side */}
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
                    <div className="p-3 bg-neutral-900 rounded-lg">{card.icon}</div>
                    <div>
                      <p className="text-neutral-500 text-[10px] uppercase font-bold tracking-widest mb-1">{card.label}</p>
                      <p className="text-white font-semibold text-base">{card.value}</p>
                    </div>
                  </div>
                  <div className="p-3.5 bg-neutral-800 group-hover:bg-[#c7d300] rounded-md transition-all">
                    <ArrowRight size={18} className="text-white group-hover:text-black" />
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="pt-6 space-y-5">
              <h5 className="text-white font-bold text-sm tracking-widest uppercase">My Social Profiles</h5>
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

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 bg-[#1a1b14] border border-neutral-800 p-6 md:p-8 shadow-2xl relative flex flex-col items-center"
          >
            <form onSubmit={handleSubmit} className="w-full space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input name="firstName" required type="text" placeholder="First Name" className="w-full bg-[#11120d] border border-neutral-800 py-4 px-6 text-white text-sm focus:outline-none focus:border-[#c7d300]/40 transition-all placeholder:text-neutral-800" />
                <input name="lastName" required type="text" placeholder="Last Name" className="w-full bg-[#11120d] border border-neutral-800 py-4 px-6 text-white text-sm focus:outline-none focus:border-[#c7d300]/40 transition-all placeholder:text-neutral-800" />
                <input name="email" required type="email" placeholder="Email" className="w-full bg-[#11120d] border border-neutral-800 py-4 px-6 text-white text-sm focus:outline-none focus:border-[#c7d300]/40 transition-all placeholder:text-neutral-800" />
                <input name="phoneNumber" required type="text" placeholder="Phone Number" className="w-full bg-[#11120d] border border-neutral-800 py-4 px-6 text-white text-sm focus:outline-none focus:border-[#c7d300]/40 transition-all placeholder:text-neutral-800" />
              </div>

              <div className="space-y-5">
                <h5 className="text-white font-bold text-sm tracking-widest uppercase ml-2">Why are you contacting us?</h5>
                <div className="grid grid-cols-2 gap-x-12 gap-y-6 bg-[#11120d] border border-neutral-800 p-8">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center gap-4 group">
                      <input
                        type="checkbox"
                        id={service.id}
                        checked={selectedServices.includes(service.label)}
                        onChange={() => handleServiceChange(service.label)}
                        className="peer w-6 h-6 border-2 border-neutral-700 bg-neutral-900 checked:bg-[#c7d300] checked:border-[#c7d300] appearance-none cursor-pointer transition-all"
                      />
                      <label htmlFor={service.id} className="text-neutral-300 peer-checked:text-white cursor-pointer text-sm font-medium tracking-wide">
                        {service.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <textarea name="message" required rows={6} placeholder="Your Message here..." className="w-full bg-[#11120d] border border-neutral-800 py-5 px-6 text-white text-sm focus:outline-none focus:border-[#c7d300]/40 transition-all placeholder:text-neutral-800 resize-none"></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={mutation.isPending}
                className="w-full h-[65px] bg-[#c7d300] text-black text-[14px] border-2 border-[#c7d300] uppercase font-bold hover:bg-transparent hover:text-white hover:border-[#c7d300] duration-700 ease-in-out flex items-center justify-center gap-2"
              >
                {mutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}