"use client";

import React from 'react';
import * as mot from 'framer-motion';
const { motion } = mot;

// Background floating elements for "alive" feel
const FloatingOrb = ({ delay, className }: { delay: number, className: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ 
      opacity: [0.5, 0.8, 0.5], 
      scale: [1, 1.2, 1],
      x: [0, 30, -30, 0],
      y: [0, -50, 30, 0]
    }}
    transition={{ 
      duration: 8, 
      delay, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
    className={`absolute rounded-full blur-2xl filter ${className}`}
  />
);

export const Hero = () => {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Living Background */}
        <div className="absolute inset-0 pointer-events-none overflow-visible">
            <FloatingOrb delay={0} className="top-[-5%] left-[-5%] w-96 h-96 bg-orange-400/40 mix-blend-multiply dark:bg-orange-600/30 dark:mix-blend-normal" />
            <FloatingOrb delay={1} className="bottom-[0%] right-[-10%] w-80 h-80 bg-red-400/40 mix-blend-multiply dark:bg-red-600/30 dark:mix-blend-normal" />
            <FloatingOrb delay={2} className="top-[30%] left-[20%] w-64 h-64 bg-yellow-300/40 mix-blend-multiply dark:bg-yellow-600/20 dark:mix-blend-normal" />
        </div>

        <div className="mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-600 ring-1 ring-orange-500/20 dark:bg-orange-900/30 dark:text-orange-400 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              The Ultimate Free Tools Suite
            </span>
            
            {/* Reduced text size from text-5xl/8xl to text-4xl/7xl */}
            <h1 className="text-4xl font-extrabold tracking-tight md:text-7xl mb-6 leading-tight">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 animate-gradient">Free, Powerful</span> <br className="hidden md:block"/> Choice for Creators.
            </h1>
            
            <p className="mx-auto max-w-3xl text-lg text-zinc-600 md:text-xl dark:text-zinc-400 mb-10 leading-relaxed font-light">
              Unlock your potential with Nional&apos;s suite of AI-powered tools. <br className="hidden md:block"/>
              Writing, coding, design, and analysis—<span className="text-zinc-900 font-semibold dark:text-zinc-100">completely free</span>.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
               <a 
                 href="#tools"
                 className="group relative overflow-hidden rounded-full bg-zinc-900 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl dark:bg-white dark:text-black"
               >
                 <span className="relative z-10 flex items-center gap-2">
                    Explore Tools 
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                 </span>
                 <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                 />
               </a>
               <a 
                 href="#features"
                 className="rounded-full bg-white px-8 py-4 text-lg font-bold text-zinc-900 shadow-md ring-1 ring-black/5 transition-transform hover:scale-105 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-white dark:ring-white/10 dark:hover:bg-zinc-800"
               >
                 How it works
               </a>
            </div>
          </motion.div>
        </div>
      </section>
  );
};
