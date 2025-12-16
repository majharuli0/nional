"use client";

import React from 'react';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="bg-zinc-900 px-6 py-20 text-zinc-400 dark:bg-black dark:border-t dark:border-white/10">
            <div className="mx-auto max-w-7xl grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/20">
                            <span className="text-xl font-black text-white">N</span>
                        </div>
                        <span className="text-2xl font-bold text-white">Nional</span>
                    </div>
                    <p className="text-sm leading-relaxed max-w-xs">
                        Empowering creators with free, high-quality digital tools. Built for the modern web.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6">Product</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="#tools" className="hover:text-orange-500 transition-colors">All Tools</Link></li>
                        <li><Link href="/write" className="hover:text-orange-500 transition-colors">Nional Write</Link></li>

                    </ul>
                </div>



                <div>
                    <h4 className="font-bold text-white mb-6">Feedback</h4>
                    <p className="text-sm mb-4">Have an idea or found a bug? We&apos;d love to hear from you.</p>
                    <a 
                        href="mailto:support@nional.com" 
                        className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 font-medium text-white transition-all hover:bg-orange-600 hover:text-white group"
                    >
                        <span>Send Feedback</span>
                        <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                    </a>
                </div>
            </div>
            <div className="mx-auto max-w-7xl mt-20 border-t border-white/10 pt-8 text-center text-sm">
                &copy; 2024 Nional Inc. All rights reserved.
            </div>
        </footer>
    );
};
