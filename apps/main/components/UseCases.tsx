"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const UseCases = () => {
  return (
    <section className="px-6 py-32 bg-white dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 md:grid-cols-2 items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <span className="text-orange-600 font-bold uppercase tracking-wider text-sm mb-4 block">For Everyone</span>
                    <h2 className="text-4xl font-bold md:text-5xl mb-6 leading-tight">
                        Whether you code, write, or design.
                    </h2>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                        Nional adapts to your workflow. We&apos;ve stripped away the complexity and subscriptions, leaving only the powerful utilities you need to get the job done.
                    </p>
                    <ul className="space-y-4">
                        {['Students: Summarize lengthy PDFs instantly.', 'Writers: Break creative blocks with AI.', 'Devs: Format JSON and Regex in seconds.'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-lg font-medium text-zinc-800 dark:text-zinc-200">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>
                <motion.div 
                     initial={{ opacity: 0, x: 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8 }}
                     viewport={{ once: true }}
                     className="relative aspect-square rounded-[2.5rem] bg-gradient-to-br from-orange-100 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 p-8 md:p-12 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="relative h-full w-full rounded-2xl bg-white shadow-2xl dark:bg-black p-6 flex flex-col gap-4">
                        <div className="h-4 w-1/3 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
                        <div className="h-4 w-2/3 rounded-full bg-zinc-100 dark:bg-zinc-800"></div>
                        <div className="h-32 w-full rounded-xl bg-slate-50 border border-slate-100 dark:bg-zinc-900 dark:border-zinc-800 mt-4"></div>
                        <div className="mt-auto flex justify-end">
                            <div className="h-10 w-32 rounded-lg bg-orange-500"></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
  );
};
