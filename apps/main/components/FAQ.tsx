"use client";

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import * as mot from 'framer-motion';
const { motion, AnimatePresence } = mot;

const FAQS = [
    { q: "Is Nional really free?", a: "Yes, 100%. We believe essential digital tools should be accessible to everyone without paywalls or subscriptions." },
    { q: "Do you store my data?", a: "No. All processing happens either locally in your browser or via stateless API calls. We do not save your inputs or outputs." },
    { q: "Can I suggest a new tool?", a: "Absolutely! We love community feedback. Use the contact form in the footer to send us your ideas." },
    { q: "Is there an API available?", a: "We are working on a public API. Stay tuned for updates on our developer portal." },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="px-6 py-32 bg-white dark:bg-zinc-900">
        <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
                {FAQS.map((item, i) => (
                    <div key={i} className="overflow-hidden rounded-2xl border border-zinc-200 bg-[#FAF3E3]/30 dark:border-zinc-800 dark:bg-zinc-900/50">
                        <button 
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="flex w-full items-center justify-between px-8 py-6 text-left"
                        >
                            <span className="text-lg font-bold text-zinc-900 dark:text-white">{item.q}</span>
                            <span className="ml-4 text-orange-600">
                                {openIndex === i ? <Minus /> : <Plus />}
                            </span>
                        </button>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-8 pb-6"
                                >
                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.a}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};
