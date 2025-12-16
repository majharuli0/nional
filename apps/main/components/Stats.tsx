"use client";

import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
    { label: "Words Processed", value: "10k+" },
    { label: "Early Adopters", value: "100+" },
    { label: "Tools Live", value: "1" },
    { label: "Upcoming Tools", value: "4" },
];

export const Stats = () => {
  return (
    <section className="bg-zinc-900 border-y border-white/10 py-16">
        <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
                {STATS.map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, type: "spring" }}
                        viewport={{ once: true }}
                    >
                        <div className="text-4xl font-black text-white md:text-5xl mb-2">{stat.value}</div>
                        <div className="text-sm font-medium uppercase tracking-wider text-zinc-500">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
};
