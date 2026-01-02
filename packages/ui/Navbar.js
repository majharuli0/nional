"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, Sun, Menu, X, ChevronDown, 
  PenTool, FileText, Image as ImageIcon, Terminal, Share2, 
  Mic, FileUser, Search, Palette, Calculator 
} from 'lucide-react';

const TOOLS = [
  { name: 'Nional Write', href: '/write', icon: PenTool, desc: 'AI Writer', status: 'active' },
  { name: 'Social Architect', href: '/social', icon: Share2, desc: 'Strategy', status: 'active' },
  { name: 'Student Scanner', href: '#', icon: FileText, desc: 'Chat PDF', status: 'coming_soon' },
  { name: 'Image Magic', href: '#', icon: ImageIcon, desc: 'Editor', status: 'coming_soon' },
  { name: 'Dev Toolbox', href: '#', icon: Terminal, desc: 'Utils', status: 'coming_soon' },
];

export const Navbar = ({ title }) => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      if (!localStorage.theme) localStorage.theme = 'light';
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsToolsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    <nav className="sticky top-0 z-50 w-full border-b border-black/5 bg-[#FAF3E3]/80 text-zinc-800 backdrop-blur-xl transition-all dark:border-white/5 dark:bg-black/80 dark:text-white">
      <div className="mx-auto flex h-18 max-w-[1400px] items-center justify-between px-6">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-4">
          <a href="http://localhost:3002" className="group flex items-center gap-3">
             <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 shadow-sm transition-transform group-hover:scale-105">
                <span className="font-black text-lg text-white">N</span>
             </div>
             <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">NIONAL</span>
          </a>
          {title && (
            <>
              <div className="hidden sm:block h-4 w-px bg-zinc-300 dark:bg-zinc-700" />
              <span className="hidden sm:block text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</span>
            </>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
           {/* Tools Dropdown */}
           <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isToolsOpen 
                    ? 'bg-black/5 text-black dark:bg-white/10 dark:text-white' 
                    : 'text-zinc-600 hover:bg-black/5 hover:text-black dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white'
                }`}
              >
                Tools
                <ChevronDown size={14} className={`transition-transform duration-300 ${isToolsOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute right-0 mt-4 w-[500px] origin-top-right overflow-hidden rounded-3xl border border-black/5 bg-white/95 p-2 shadow-2xl backdrop-blur-2xl transition-all duration-300 ease-out dark:border-white/5 dark:bg-zinc-900/95 ring-1 ring-black/5 dark:ring-white/10 ${
                isToolsOpen 
                  ? 'translate-y-0 scale-100 opacity-100 visible' 
                  : 'translate-y-2 scale-95 opacity-0 invisible pointer-events-none'
              }`}>
                  <div className="grid grid-cols-2 gap-1">
                    {TOOLS.map((tool) => {
                      const Icon = tool.icon;
                      const isActive = tool.status === 'active';
                      return (
                        <a
                          key={tool.name}
                          href={isActive ? tool.href : undefined}
                          className={`group relative flex items-start gap-3 rounded-2xl p-3 transition-all duration-200 ${
                             isActive 
                              ? 'hover:bg-white/50 dark:hover:bg-white/5 cursor-pointer hover:shadow-sm' 
                              : 'opacity-40 cursor-not-allowed grayscale'
                          }`}
                        >
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                              isActive 
                              ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400 group-hover:scale-110 group-hover:rotate-3' 
                              : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500'
                          }`}>
                             <Icon size={16} />
                          </div>
                          <div className="flex-1 space-y-0.5">
                             <div className="flex items-center gap-2">
                                <span className={`text-sm font-bold ${isActive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-500'}`}>
                                  {tool.name}
                                </span>
                                {!isActive && (
                                  <span className="rounded-full bg-zinc-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                                    Soon
                                  </span>
                                )}
                             </div>
                             <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight font-medium">
                               {tool.desc}
                             </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
              </div>
           </div>
          
           <div className="pl-4 border-l border-zinc-200 dark:border-zinc-800">
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
        <div className="md:hidden border-t border-black/5 bg-[#FAF3E3] px-4 py-6 dark:border-white/5 dark:bg-black">
          <div className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Tools</div>
          <div className="grid gap-3">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              const isActive = tool.status === 'active';
              return (
                <a
                  key={tool.name}
                  href={isActive ? tool.href : undefined}
                  className={`flex items-center gap-4 rounded-2xl p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/5 transition-opacity ${
                    isActive 
                    ? 'bg-white dark:bg-zinc-900' 
                    : 'bg-white/50 dark:bg-zinc-900/50 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    isActive ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400' : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                       <span className="font-semibold text-zinc-900 dark:text-white">{tool.name}</span>
                       {!isActive && <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Soon</span>}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};
