"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const CTA = () => {
  return (
    <section className="px-6 py-32 bg-[#FAF3E3]">
        <div className="mx-auto max-w-5xl rounded-[3rem] bg-zinc-900 px-6 py-20 text-center text-white shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500 via-transparent to-transparent"></div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10"
            >
                <h2 className="text-4xl font-bold md:text-6xl mb-8 tracking-tight">Ready to boost your productivity?</h2>
                <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
                    No credit card required. No signup fees. Just pure utility.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="/write" className="min-w-[200px] rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-transform hover:scale-105 hover:bg-zinc-100">
                        Start Writing
                    </a>
                    <a href="#tools" className="min-w-[200px] rounded-full border border-white/20 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-white/10">
                        View All Tools
                    </a>
                </div>
            </motion.div>
        </div>
    </section>
  );
};
