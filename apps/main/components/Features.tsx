"use client";

import React from 'react';
import { Zap, Shield, Heart, Fingerprint, Layers, Rocket } from 'lucide-react';
import * as mot from 'framer-motion';
const { motion } = mot;

const FEATURES = [
    { title: "Lightning Fast", desc: "Results in milliseconds, not seconds.", icon: Zap },
    { title: "Privacy First", desc: "No data logs. Your content stays yours.", icon: Shield },
    { title: "User Centric", desc: "Designed for humans, by humans.", icon: Heart },
    { title: "No Sign-up", desc: "Start using tools instantly.", icon: Fingerprint },
    { title: "Scalable", desc: "Built on next-gen tech stack.", icon: Layers },
    { title: "Always Free", desc: "Pro features, zero cost.", icon: Rocket },
];

export const Features = () => {
  return (
    <section id="features" className="px-6 py-32 bg-[#FAF3E3] dark:bg-black border-t border-black/5 dark:border-white/5">
         <div className="mx-auto max-w-7xl">
            <div className="text-center mb-24">
                <h2 className="text-4xl font-bold md:text-5xl mb-6">Why Nional?</h2>
                <p className="text-xl text-zinc-600 dark:text-zinc-400">Built differently for the modern web.</p>
            </div>

            <div className="grid gap-x-12 gap-y-16 md:grid-cols-3">
                {FEATURES.map((feat, i) => {
                    const Icon = feat.icon;
                    return (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center md:items-start md:text-left group"
                        >
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-orange-600 shadow-md ring-1 ring-black/5 transition-colors group-hover:bg-orange-600 group-hover:text-white dark:bg-zinc-900 dark:ring-white/10">
                                <Icon size={32} />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white">{feat.title}</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{feat.desc}</p>
                        </motion.div>
                    );
                })}
            </div>
         </div>
    </section>
  );
};
