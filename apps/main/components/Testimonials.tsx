"use client";

import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const REVIEWS = [
    { name: "Alex Chen", role: "Student", text: "The Write tool saved my semester. The paraphrasing is indistinguishable from human writing." },
    { name: "Sarah Jones", role: "Content Creator", text: "Finally, a free tool that doesn't bombard me with ads. Nional is my go-to for captions." },
    { name: "Mike Ross", role: "Developer", text: "Waiting for the Dev Toolbox! If it's as good as the writer, this platform is a game changer." },
];

export const Testimonials = () => {
  return (
    <section className="px-6 py-32 bg-[#FAF3E3] dark:bg-black">
        <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold md:text-5xl mb-6">Loved by Creators</h2>
                <p className="text-xl text-zinc-600 dark:text-zinc-400">Join thousands who work smarter, not harder.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {REVIEWS.map((rev, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        viewport={{ once: true }}
                        className="rounded-3xl bg-white p-8 shadow-xl shadow-orange-500/5 ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"
                    >
                        <div className="flex gap-1 text-orange-400 mb-6">
                            {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-6 leading-relaxed">&quot;{rev.text}&quot;</p>
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900"></div>
                            <div>
                                <div className="font-bold text-zinc-900 dark:text-white">{rev.name}</div>
                                <div className="text-sm text-zinc-500">{rev.role}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
};
