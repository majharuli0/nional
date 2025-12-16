"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-white/80 backdrop-blur-md border-black/5 py-3 dark:bg-black/80 dark:border-white/5" 
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/20">
              <span className="text-xl font-black text-white">N</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Nional</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
            <Link href="#tools" className="text-sm font-medium text-zinc-600 hover:text-orange-600 dark:text-zinc-400 dark:hover:text-orange-400">Tools</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-zinc-600 hover:text-orange-600 dark:text-zinc-400 dark:hover:text-orange-400">How it Works</Link>
            <Link href="#faq" className="text-sm font-medium text-zinc-600 hover:text-orange-600 dark:text-zinc-400 dark:hover:text-orange-400">FAQ</Link>
            <Link href="#" className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-bold text-white transition-transform hover:scale-105 dark:bg-white dark:text-black">
                Get Started
            </Link>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-zinc-900 dark:text-white">
            {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-black/5 p-6 shadow-xl md:hidden dark:bg-zinc-900 dark:border-white/5">
            <nav className="flex flex-col gap-4">
                <Link href="#tools" onClick={() => setIsOpen(false)} className="text-lg font-medium">Tools</Link>
                <Link href="#how-it-works" onClick={() => setIsOpen(false)} className="text-lg font-medium">How it Works</Link>
                <Link href="#faq" onClick={() => setIsOpen(false)} className="text-lg font-medium">FAQ</Link>
            </nav>
        </div>
      )}
    </header>
  );
};
