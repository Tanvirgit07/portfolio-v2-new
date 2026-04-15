"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Skill {
  name: string;
  icon: string;
  color: string;
  tooltip: string;
  level: number;
}

const skills: Skill[] = [
  // ... (আপনার আগের সব স্কিল ডাটা এখানে থাকবে)
  {
    name: "HTML",
    icon: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/><path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/><path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/><path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"/></svg>`,
    color: "#E44D26",
    tooltip: "HyperText Markup Language — ওয়েবের মূল কাঠামো তৈরিতে ব্যবহৃত।",
    level: 95,
  },
  {
    name: "CSS",
    icon: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"/><path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16z"/><path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h31.911l-.328 3.662-3.382 37.927H64.001z"/><path fill="#EBEBEB" d="M64.001 51.429v13.831H46.309L45.045 51.5l-1.264-13.832H64.001v13.761z"/><path fill="#fff" d="M64.001 88.306l-.063.017-15.386-4.142-.985-11.037H33.776l1.937 21.8 28.219 7.829.069-.019z"/><path fill="#EBEBEB" d="M64.001 88.323v-14.18H79.32l-1.608 17.93-13.711 3.805z"/></svg>`,
    color: "#33A9DC",
    tooltip: "Cascading Style Sheets — ওয়েবসাইটকে সুন্দর ও আকর্ষণীয় করে তোলে।",
    level: 90,
  },
  {
    name: "JavaScript",
    icon: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"/><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.921-6.885 2.797-8.913 5.322-5.938 7-4.979 20.265 2.595 25.854 6.29 4.76 15.405 5.843 16.573 11.622 1.228 7.051-5.542 9.316-11.366 8.583-4.628-.881-7.26-3.505-10.056-8.07l-9.476 5.481c1.152 2.506 2.319 3.603 4.121 5.879 8.832 9.909 30.512 9.412 38.939-0.13 4.543-4.57 5.507-11.206 4.304-17.071h.001zm-39.909 13.895c-2.935 0-5.12-1.032-6.84-2.978l-9.45 5.482c3.239 5.154 8.085 8.132 16.245 8.132 9.297 0 17.317-4.938 18.104-13.698.438-4.976-1.379-8.937-5.279-12.168-3.623-3.03-8.233-4.561-11.685-6.904-2.917-1.957-4.041-3.946-3.617-6.353.565-3.143 3.885-4.374 6.695-3.735 2.167.498 3.759 1.865 4.938 3.955l9.151-5.494c-2.104-4.067-5.42-6.71-9.499-7.769-5.449-1.416-10.73-.449-14.629 3.228-5.455 5.11-6.07 13.671-1.35 19.394 2.784 3.36 7.266 5.261 11.014 7.547 3.097 1.875 4.758 4.152 4.198 6.841-.678 3.279-4.165 5.081-8 4.52l-.031-.001z"/></svg>`,
    color: "#F0DB4F",
    tooltip: "JavaScript — ওয়েবকে ইন্টারেক্টিভ ও ডায়নামিক করে তোলার মূল ভাষা।",
    level: 88,
  },
  {
    name: "React JS",
    icon: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"/><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-12 7 14.6 12.3 14.6 18.7 0 6.4-3.3 13.7-13.9 18.7-1.3.6-2.9 1.3-4.9 2.3z"/></g></svg>`,
    color: "#61DAFB",
    tooltip: "React JS — UI বিল্ডিং এর জন্য সবচেয়ে জনপ্রিয় JavaScript লাইব্রেরি।",
    level: 82,
  },
  {
    name: "GitHub",
    icon: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"/></svg>`,
    color: "#ffffff",
    tooltip: "GitHub — কোড ভার্সন কন্ট্রোল ও ওপেন-সোর্স কোলাবোরেশনের প্ল্যাটফর্ম।",
    level: 80,
  },
  {
    name: "Node JS",
    icon: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#83CD29" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.449 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 42 42.061 42 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L20.1 90.73c-.441-.366-.724-.771-.724-1.181V38.407c0-.41.283-.815.724-1.184l44.08-25.605c.441-.366 1.07-.366 1.512 0l44.08 25.605c.441.369.724.773.724 1.184v51.142c0 .41-.283.815-.724 1.181l-44.08 25.605c-.441.366-1.07.366-1.512 0l-11.551-6.867c-.33-.183-.72-.305-1.094-.143-3.56 1.988-4.087 2.169-7.29 3.294-.778.357-1.927.922.35 2.108l15.015 8.86c1.39.826 2.968 1.272 4.552 1.272 1.584 0 3.162-.446 4.551-1.272l44.08-25.604c2.87-1.652 4.954-4.756 4.954-8.083V38.407c0-3.319-2.084-6.422-4.954-8.073z"/></svg>`,
    color: "#83CD29",
    tooltip: "Node.js — JavaScript দিয়ে সার্ভার-সাইড প্রোগ্রামিং করার পরিবেশ।",
    level: 75,
  },
  {
    name: "MongoDB",
    icon: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#439934" d="M88.038 42.812c1.605 4.643 2.761 9.382 2.146 14.243-.42 3-2.768-4.996-5.181-6.371-5.381-3.04-7.168-8.236-5.606-12.086 1.63-4.08 4.93-7.105 8.38-9.828.763-.59 1.6-1.09 2.52-1.52.1.026.198.053.297.08-.585 5.187-.825 10.258-2.556 15.482z"/></svg>`,
    color: "#4DB33D",
    tooltip: "MongoDB — NoSQL ডকুমেন্ট-ওরিয়েন্টেড ডেটাবেজ সিস্টেম।",
    level: 72,
  },
  {
    name: "Docker",
    icon: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#019BC6" d="M124.8 52.1c-2.4-1.6-7.9-2.2-12.1-1.5-.5-4.1-2.9-7.6-7.3-10.8l-2.5-1.7-1.7 2.5c-2.1 3.2-3.2 7.7-2.9 12 .1 1.4.6 4 2.1 6.2-1.5.8-4.4 2-8.3 1.9H3.1l-.2 1c-.7 4.6-.6 19 8.8 30.1 7.1 8.4 17.6 12.6 31.3 12.6 29.8 0 51.8-13.7 62.1-38.7 4 .1 12.7.1 17.1-8.4.1-.2 1.2-2.4 1.5-3.1l.1-.3-2.7-2c-.3-.2-.5-.3-.8-.5-.9-.5-1.9-.9-2.7-1.3zm0 0"/></svg>`,
    color: "#019BC6",
    tooltip: "Docker — অ্যাপ্লিকেশনকে কন্টেইনারে প্যাক করে যেকোনো পরিবেশে চালানোর টুল।",
    level: 65,
  },
  {
    name: "Docker",
    icon: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#019BC6" d="M124.8 52.1c-2.4-1.6-7.9-2.2-12.1-1.5-.5-4.1-2.9-7.6-7.3-10.8l-2.5-1.7-1.7 2.5c-2.1 3.2-3.2 7.7-2.9 12 .1 1.4.6 4 2.1 6.2-1.5.8-4.4 2-8.3 1.9H3.1l-.2 1c-.7 4.6-.6 19 8.8 30.1 7.1 8.4 17.6 12.6 31.3 12.6 29.8 0 51.8-13.7 62.1-38.7 4 .1 12.7.1 17.1-8.4.1-.2 1.2-2.4 1.5-3.1l.1-.3-2.7-2c-.3-.2-.5-.3-.8-.5-.9-.5-1.9-.9-2.7-1.3zm0 0"/></svg>`,
    color: "#019BC6",
    tooltip: "Docker — অ্যাপ্লিকেশনকে কন্টেইনারে প্যাক করে যেকোনো পরিবেশে চালানোর টুল।",
    level: 65,
  },
  {
    name: "Docker",
    icon: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#019BC6" d="M124.8 52.1c-2.4-1.6-7.9-2.2-12.1-1.5-.5-4.1-2.9-7.6-7.3-10.8l-2.5-1.7-1.7 2.5c-2.1 3.2-3.2 7.7-2.9 12 .1 1.4.6 4 2.1 6.2-1.5.8-4.4 2-8.3 1.9H3.1l-.2 1c-.7 4.6-.6 19 8.8 30.1 7.1 8.4 17.6 12.6 31.3 12.6 29.8 0 51.8-13.7 62.1-38.7 4 .1 12.7.1 17.1-8.4.1-.2 1.2-2.4 1.5-3.1l.1-.3-2.7-2c-.3-.2-.5-.3-.8-.5-.9-.5-1.9-.9-2.7-1.3zm0 0"/></svg>`,
    color: "#019BC6",
    tooltip: "Docker — অ্যাপ্লিকেশনকে কন্টেইনারে প্যাক করে যেকোনো পরিবেশে চালানোর টুল।",
    level: 65,
  },
  {
    name: "Docker",
    icon: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#019BC6" d="M124.8 52.1c-2.4-1.6-7.9-2.2-12.1-1.5-.5-4.1-2.9-7.6-7.3-10.8l-2.5-1.7-1.7 2.5c-2.1 3.2-3.2 7.7-2.9 12 .1 1.4.6 4 2.1 6.2-1.5.8-4.4 2-8.3 1.9H3.1l-.2 1c-.7 4.6-.6 19 8.8 30.1 7.1 8.4 17.6 12.6 31.3 12.6 29.8 0 51.8-13.7 62.1-38.7 4 .1 12.7.1 17.1-8.4.1-.2 1.2-2.4 1.5-3.1l.1-.3-2.7-2c-.3-.2-.5-.3-.8-.5-.9-.5-1.9-.9-2.7-1.3zm0 0"/></svg>`,
    color: "#019BC6",
    tooltip: "Docker — অ্যাপ্লিকেশনকে কন্টেইনারে প্যাক করে যেকোনো পরিবেশে চালানোর টুল।",
    level: 65,
  },
  {
    name: "Docker",
    icon: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#019BC6" d="M124.8 52.1c-2.4-1.6-7.9-2.2-12.1-1.5-.5-4.1-2.9-7.6-7.3-10.8l-2.5-1.7-1.7 2.5c-2.1 3.2-3.2 7.7-2.9 12 .1 1.4.6 4 2.1 6.2-1.5.8-4.4 2-8.3 1.9H3.1l-.2 1c-.7 4.6-.6 19 8.8 30.1 7.1 8.4 17.6 12.6 31.3 12.6 29.8 0 51.8-13.7 62.1-38.7 4 .1 12.7.1 17.1-8.4.1-.2 1.2-2.4 1.5-3.1l.1-.3-2.7-2c-.3-.2-.5-.3-.8-.5-.9-.5-1.9-.9-2.7-1.3zm0 0"/></svg>`,
    color: "#019BC6",
    tooltip: "Docker — অ্যাপ্লিকেশনকে কন্টেইনারে প্যাক করে যেকোনো পরিবেশে চালানোর টুল।",
    level: 65,
  },
  {
    name: "Docker",
    icon: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#019BC6" d="M124.8 52.1c-2.4-1.6-7.9-2.2-12.1-1.5-.5-4.1-2.9-7.6-7.3-10.8l-2.5-1.7-1.7 2.5c-2.1 3.2-3.2 7.7-2.9 12 .1 1.4.6 4 2.1 6.2-1.5.8-4.4 2-8.3 1.9H3.1l-.2 1c-.7 4.6-.6 19 8.8 30.1 7.1 8.4 17.6 12.6 31.3 12.6 29.8 0 51.8-13.7 62.1-38.7 4 .1 12.7.1 17.1-8.4.1-.2 1.2-2.4 1.5-3.1l.1-.3-2.7-2c-.3-.2-.5-.3-.8-.5-.9-.5-1.9-.9-2.7-1.3zm0 0"/></svg>`,
    color: "#019BC6",
    tooltip: "Docker — অ্যাপ্লিকেশনকে কন্টেইনারে প্যাক করে যেকোনো পরিবেশে চালানোর টুল।",
    level: 65,
  },
  {
    name: "Docker",
    icon: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#019BC6" d="M124.8 52.1c-2.4-1.6-7.9-2.2-12.1-1.5-.5-4.1-2.9-7.6-7.3-10.8l-2.5-1.7-1.7 2.5c-2.1 3.2-3.2 7.7-2.9 12 .1 1.4.6 4 2.1 6.2-1.5.8-4.4 2-8.3 1.9H3.1l-.2 1c-.7 4.6-.6 19 8.8 30.1 7.1 8.4 17.6 12.6 31.3 12.6 29.8 0 51.8-13.7 62.1-38.7 4 .1 12.7.1 17.1-8.4.1-.2 1.2-2.4 1.5-3.1l.1-.3-2.7-2c-.3-.2-.5-.3-.8-.5-.9-.5-1.9-.9-2.7-1.3zm0 0"/></svg>`,
    color: "#019BC6",
    tooltip: "Docker — অ্যাপ্লিকেশনকে কন্টেইনারে প্যাক করে যেকোনো পরিবেশে চালানোর টুল।",
    level: 65,
  },
  {
    name: "Docker",
    icon: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#019BC6" d="M124.8 52.1c-2.4-1.6-7.9-2.2-12.1-1.5-.5-4.1-2.9-7.6-7.3-10.8l-2.5-1.7-1.7 2.5c-2.1 3.2-3.2 7.7-2.9 12 .1 1.4.6 4 2.1 6.2-1.5.8-4.4 2-8.3 1.9H3.1l-.2 1c-.7 4.6-.6 19 8.8 30.1 7.1 8.4 17.6 12.6 31.3 12.6 29.8 0 51.8-13.7 62.1-38.7 4 .1 12.7.1 17.1-8.4.1-.2 1.2-2.4 1.5-3.1l.1-.3-2.7-2c-.3-.2-.5-.3-.8-.5-.9-.5-1.9-.9-2.7-1.3zm0 0"/></svg>`,
    color: "#019BC6",
    tooltip: "Docker — অ্যাপ্লিকেশনকে কন্টেইনারে প্যাক করে যেকোনো পরিবেশে চালানোর টুল।",
    level: 65,
  },
  {
    name: "Docker",
    icon: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#019BC6" d="M124.8 52.1c-2.4-1.6-7.9-2.2-12.1-1.5-.5-4.1-2.9-7.6-7.3-10.8l-2.5-1.7-1.7 2.5c-2.1 3.2-3.2 7.7-2.9 12 .1 1.4.6 4 2.1 6.2-1.5.8-4.4 2-8.3 1.9H3.1l-.2 1c-.7 4.6-.6 19 8.8 30.1 7.1 8.4 17.6 12.6 31.3 12.6 29.8 0 51.8-13.7 62.1-38.7 4 .1 12.7.1 17.1-8.4.1-.2 1.2-2.4 1.5-3.1l.1-.3-2.7-2c-.3-.2-.5-.3-.8-.5-.9-.5-1.9-.9-2.7-1.3zm0 0"/></svg>`,
    color: "#019BC6",
    tooltip: "Docker — অ্যাপ্লিকেশনকে কন্টেইনারে প্যাক করে যেকোনো পরিবেশে চালানোর টুল।",
    level: 65,
  },
  {
    name: "Docker",
    icon: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#019BC6" d="M124.8 52.1c-2.4-1.6-7.9-2.2-12.1-1.5-.5-4.1-2.9-7.6-7.3-10.8l-2.5-1.7-1.7 2.5c-2.1 3.2-3.2 7.7-2.9 12 .1 1.4.6 4 2.1 6.2-1.5.8-4.4 2-8.3 1.9H3.1l-.2 1c-.7 4.6-.6 19 8.8 30.1 7.1 8.4 17.6 12.6 31.3 12.6 29.8 0 51.8-13.7 62.1-38.7 4 .1 12.7.1 17.1-8.4.1-.2 1.2-2.4 1.5-3.1l.1-.3-2.7-2c-.3-.2-.5-.3-.8-.5-.9-.5-1.9-.9-2.7-1.3zm0 0"/></svg>`,
    color: "#019BC6",
    tooltip: "Docker — অ্যাপ্লিকেশনকে কন্টেইনারে প্যাক করে যেকোনো পরিবেশে চালানোর টুল।",
    level: 65,
  },
  
];

const SKILLS_PER_PAGE = 10;

function Tooltip({ skill, visible }: { skill: Skill; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute -top-4 left-1/2 z-50 w-56 -translate-x-1/2 -translate-y-full pointer-events-none"
        >
          <div
            className="relative rounded-xl border bg-[#15160e]/95 backdrop-blur-md p-4 shadow-2xl"
            style={{
              borderColor: `${skill.color}50`,
              boxShadow: `0 10px 30px -10px ${skill.color}30`,
            }}
          >
            <p className="font-bold text-sm uppercase tracking-widest mb-1" style={{ color: skill.color }}>
              {skill.name}
            </p>
            <p className="text-slate-300 text-[12px] leading-relaxed mb-3">{skill.tooltip}</p>
            <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: skill.color }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-slate-500 uppercase">Proficiency</span>
              <span className="text-[10px] font-bold" style={{ color: skill.color }}>
                {skill.level}%
              </span>
            </div>
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent"
              style={{ borderTopColor: `${skill.color}50` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SkillCard({ skill }: { skill: Skill; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    /* h-48 এবং w-full অ্যাড করা হয়েছে যাতে সব কার্ড একই সাইজের থাকে */
    <div
      className="relative group flex flex-col items-center justify-center gap-4 p-6 cursor-pointer transition-all duration-500 h-48 w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`absolute inset-0  border transition-all duration-500 ${
          hovered ? "border-[#c7d300]/40 bg-white/5 shadow-xl shadow-[#c7d300]/5" : "border-white/5 bg-white/[0.02]"
        }`}
      />
      <Tooltip skill={skill} visible={hovered} />
      <div
        className={`relative z-10 w-16 h-16 transition-all duration-500 ${hovered ? "scale-110 -translate-y-2" : "scale-100"}`}
        dangerouslySetInnerHTML={{ __html: skill.icon }}
      />
      <span
        className={`relative z-10 text-xs font-medium tracking-widest uppercase transition-colors duration-300 ${hovered ? "text-[#c7d300]" : "text-slate-500"}`}
      >
        {skill.name}
      </span>
    </div>
  );
}

export default function SkillSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(skills.length / SKILLS_PER_PAGE);

  const displayedSkills = skills.slice(currentPage * SKILLS_PER_PAGE, (currentPage + 1) * SKILLS_PER_PAGE);

  return (
    <section className="relative w-full min-h-[800px] bg-[#15160e] flex items-center justify-center overflow-hidden py-24 px-6">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#c7d300]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-[#c7d300]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="text-left">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              MY <span className="text-[#c7d300]">SKILLS</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-4xl leading-relaxed">
              I specialize in building modern web applications using cutting-edge technologies. Focused on performance,
              accessibility, and user-centric design.
            </p>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-2 bg-white/5 p-3 rounded-full border border-white/10">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`transition-all duration-500 rounded-sm ${
                    currentPage === i ? "w-8 h-1.5 bg-[#c7d300] shadow-[0_0_10px_#c7d300]" : "w-4 h-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* content-start ক্লাসটি অ্যাড করা হয়েছে যাতে আইটেম কম থাকলেও সেগুলো উপরের দিকে থাকে এবং বড় না হয় */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 min-h-[400px] content-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="contents"
            >
              {displayedSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-20 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-[#c7d300]/50 to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#c7d300]/60">Professional Tech Stack</span>
          <div className="h-px flex-1 bg-gradient-to-l from-[#c7d300]/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}