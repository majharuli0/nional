import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

export const Navbar = ({ title }) => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check localStorage only. Default to Light.
    // We explicitly remove the class to ensure we don't inherit system preference behavior
    if (localStorage.theme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      // Ensure local storage is set to light if undefined to stick to it
      if (!localStorage.theme) localStorage.theme = 'light';
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/5 bg-[#FAF3E3]/70 text-zinc-800 backdrop-blur-xl transition-all dark:border-white/5 dark:bg-black/60 dark:text-white">
      <div className="mx-auto flex h-18 max-w-[1400px] items-center justify-between px-6">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-4">
          <a href="https://nional.com" className="group flex items-center gap-3">
             <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 text-white shadow-lg transition-transform group-hover:scale-105 dark:from-white dark:to-zinc-300 dark:text-black">
                <span className="font-bold text-lg">N</span>
             </div>
             <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">NIONAL</span>
          </a>
          <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700" />
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
           {[
             { name: 'Write', href: 'https://nional.com/write' },
             { name: 'PDF', href: 'https://nional.com/pdf' },
             { name: 'Image', href: 'https://nional.com/img' },
             { name: 'Dev', href: 'https://nional.com/dev' },
             { name: 'Social', href: 'https://nional.com/social' },
           ].map((link) => (
             <a 
               key={link.name} 
               href={link.href} 
               className="rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition-all hover:bg-black/5 hover:text-black dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
             >
               {link.name}
             </a>
           ))}
          
          <div className="ml-4 pl-4 border-l border-zinc-200 dark:border-zinc-800">
            <button
              onClick={toggleTheme}
              className="group flex h-9 w-9 items-center justify-center rounded-full bg-white/50 shadow-sm ring-1 ring-black/5 transition-all hover:bg-white hover:shadow-md dark:bg-zinc-800 dark:ring-white/10 dark:hover:bg-zinc-700"
            >
              {isDark ? (
                <Sun size={18} className="text-amber-400 transition-transform group-hover:rotate-90" />
              ) : (
                <Moon size={18} className="text-zinc-600 transition-transform group-hover:-rotate-12" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
           <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-zinc-900/5 cursor-pointer transition-all hover:bg-zinc-50 dark:bg-zinc-900 dark:ring-zinc-100/10 dark:hover:bg-zinc-800"
          >
            {isDark ? <Sun size={18} className="text-amber-300" /> : <Moon size={18} className="text-zinc-600" />}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-zinc-600 hover:text-black dark:text-zinc-300 dark:hover:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[#E5E5DA] bg-[#F5F5F0] px-4 py-4 dark:border-zinc-800 dark:bg-black">
          <div className="flex flex-col gap-4">
            <a href="https://nional.com/write" className="text-base font-medium text-zinc-600 dark:text-zinc-300">Write</a>
            <a href="https://nional.com/pdf" className="text-base font-medium text-zinc-600 dark:text-zinc-300">PDF Tool</a>
            <a href="https://nional.com/img" className="text-base font-medium text-zinc-600 dark:text-zinc-300">Image Tool</a>
            <a href="https://nional.com/dev" className="text-base font-medium text-zinc-600 dark:text-zinc-300">Dev Tool</a>
             <a href="https://nional.com/social" className="text-base font-medium text-zinc-600 dark:text-zinc-300">Social Tool</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer = () => (
  <footer className="w-full border-t border-[#E5E5DA] bg-[#F5F5F0] py-8 text-center dark:border-zinc-800 dark:bg-black">
    <p className="text-sm text-zinc-500 dark:text-zinc-400">
      &copy; {new Date().getFullYear()} Nional Platform. All rights reserved.
    </p>
  </footer>
);