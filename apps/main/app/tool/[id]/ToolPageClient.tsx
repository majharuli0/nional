"use client";

import React from 'react';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import * as mot from 'framer-motion';
import { TOOLS } from '../../../lib/data';

const { motion } = mot;

// Helper to find tool by slug or id
const getTool = (id: string) => TOOLS.find(t => t.id === id || t.slug === id);

export default function ToolPageClient({ id }: { id: string }) {
  const tool = getTool(id);

  if (!tool) return null;

  const Icon = tool.icon;

  return (
    <div className="min-h-screen bg-[#FAF3E3] font-sans text-zinc-900 dark:bg-black dark:text-zinc-100">
      <Header />

      <main className="pt-32 pb-20">
        {/* Tool Hero */}
        <section className="px-6 text-center">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="mx-auto max-w-4xl"
             >
                <div className={`mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-xl dark:bg-zinc-900 ${tool.text}`}>
                    <Icon size={48} />
                </div>
                
                <h1 className="mb-6 text-5xl font-black tracking-tight md:text-7xl">
                    {tool.name}
                </h1>
                <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {tool.longDesc || tool.desc}
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    {tool.status === 'Active' ? (
                        <a 
                            href={tool.href}
                            className={`group relative flex items-center gap-2 rounded-full bg-gradient-to-r ${tool.color} px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl`}
                        >
                            Launch {tool.name}
                            <ArrowRight className="transition-transform group-hover:translate-x-1" />
                        </a>
                    ) : (
                         <div className="rounded-full bg-zinc-200 px-8 py-4 text-lg font-bold text-zinc-500 dark:bg-zinc-800">
                            Coming Soon
                        </div>
                    )}
                </div>
             </motion.div>
        </section>

        {/* Features Grid */}
        {(tool.features && tool.features.length > 0) && (
            <section className="mx-auto max-w-6xl px-6 py-24">
                <h2 className="mb-16 text-center text-3xl font-bold">Why use {tool.name}?</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                    {tool.features.map((feature, i) => (
                        <div key={i} className="flex gap-4 rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-900">
                            <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30`}>
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                                <p className="text-zinc-600 dark:text-zinc-400">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {/* FAQ Preview (Generic for now if empty) */}
        <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
            <h2 className="mb-8 text-2xl font-bold">Frequently Asked Questions</h2>
             <div className="space-y-4 text-left">
                {tool.faq && tool.faq.length > 0 ? tool.faq.map((f, i) => (
                    <div key={i} className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
                        <h3 className="mb-2 font-bold">{f.q}</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">{f.a}</p>
                    </div>
                )) : (
                     <p className="text-zinc-500">No FAQs available for this tool yet.</p>
                )}
             </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
