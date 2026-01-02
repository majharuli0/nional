"use client";

import { useState } from "react";
import { Navbar } from "@nional/ui";
import {
  Copy,
  Check,
  Loader2,
  Sparkles,
  RefreshCw,
  FileText,
  Mail,
  Maximize2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

// Types
type Mode = "humanize" | "reword" | "summarize" | "email" | "expand";
type Tone = "Professional" | "Casual" | "Witty" | "Urgent" | "Empathetic" | "Academic" | "Persuasive" | "Direct" | "Creative" | "Friendly" | "Confident";
type Length = "Short" | "Medium" | "Detailed";

const MODES = [
  { id: "humanize", label: "Humanizer", icon: Sparkles, desc: "Bypass AI detection" },
  { id: "reword", label: "Rewriter", icon: RefreshCw, desc: "Improve flow & clarity" },
  { id: "summarize", label: "Summarizer", icon: FileText, desc: "Key points only" },
  { id: "email", label: "Email Drafter", icon: Mail, desc: "Convert notes to email" },
  { id: "expand", label: "Text Expander", icon: Maximize2, desc: "Make paragraphs longer" },
];

const TONES: Tone[] = [
  "Professional",
  "Casual",
  "Witty",
  "Urgent",
  "Empathetic",
  "Academic",
  "Persuasive",
  "Direct",
  "Creative",
  "Friendly",
  "Confident"
];
const LENGTHS: Length[] = ["Short", "Medium", "Detailed"];

export default function Home() {
  const [mode, setMode] = useState<Mode>("humanize");
  const [tone, setTone] = useState<Tone>("Professional");
  const [length, setLength] = useState<Length>("Medium");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  // Mobile view state: 'input' or 'output'
  const [mobileView, setMobileView] = useState<'input' | 'output'>('input');

  const handleGenerate = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.nional.com";
      const res = await fetch(`${apiUrl}/api/write/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, mode, tone, length }),
      });
      const data = await res.json();
      if (data.result) {
        setOutput(data.result);
        setMobileView('output'); // Switch to output view on mobile
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to connect to API");
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPlaceholder = () => {
    switch (mode) {
      case "email": return "Paste your meeting notes or bullet points here...";
      case "summarize": return "Paste the long article or document text here...";
      case "humanize": return "Paste your AI-generated text here to humanize it...";
      default: return "Start typing or paste your text here...";
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background font-sans dark:bg-background overflow-hidden">
      <Navbar title={"Nional Write"} />

      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on mobile, visible on md+ */}
        <aside className="hidden md:block w-64 flex-shrink-0 border-r border-black/5 bg-surface/50 backdrop-blur-sm dark:border-white/5 dark:bg-zinc-900/50 overflow-y-auto">
          <div className="p-4 space-y-4">
            <div className="px-2">
               <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
                Writing Tools
              </h2>
            </div>
            <div className="space-y-1">
            {MODES.map((m) => {
              const Icon = m.icon;
              const isActive = mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id as Mode)}
                  className={clsx(
                    "group relative w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ease-out",
                    isActive
                      ? "bg-white shadow-sm ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10"
                      : "hover:bg-white/60 dark:hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                  )}
                  <div className={clsx(
                    "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                    isActive ? "bg-primary/10 text-primary" : "bg-black/5 text-zinc-500 group-hover:bg-black/10 dark:bg-white/5 dark:text-zinc-400"
                  )}>
                     <Icon size={18} />
                  </div>
                  <div>
                    <div className={clsx("font-medium text-sm", isActive ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200")}>
                      {m.label}
                    </div>
                    <div className="text-[10px] font-medium text-zinc-400 group-hover:text-zinc-500 dark:text-zinc-600">
                      {m.desc}
                    </div>
                  </div>
                </button>
              );
            })}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden bg-white/30 dark:bg-black/20">
          {/* Top Bar - Stacked on mobile */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/5 px-6 py-4 dark:border-white/5">
            {/* Mobile Mode Selector (Horizontal Scroll) */}
            <div className="md:hidden w-full overflow-x-auto pb-2 -mb-2 no-scrollbar">
              <div className="flex items-center gap-2">
                {MODES.map((m) => {
                  const Icon = m.icon;
                  const isActive = mode === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMode(m.id as Mode)}
                      className={clsx(
                        "flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                        isActive
                          ? "bg-zinc-900 text-white shadow-md dark:bg-white dark:text-zinc-900" 
                          : "bg-white/50 text-zinc-600 ring-1 ring-black/5 dark:bg-white/5 dark:text-zinc-400 dark:ring-white/10"
                      )}
                    >
                      <Icon size={14} />
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Tone</span>
                <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
                  <SelectTrigger className="w-[140px] md:w-[150px] h-9 text-sm border-0 bg-white/50 shadow-sm ring-1 ring-black/5 hover:bg-white/80 focus:ring-primary/20 dark:bg-white/5 dark:ring-white/10 dark:hover:bg-white/10">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent className="border-black/5 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/95">
                    {TONES.map((t) => (
                      <SelectItem key={t} value={t} className="cursor-pointer focus:bg-primary/10 focus:text-primary">
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="hidden md:block h-5 w-px bg-black/5 dark:bg-white/5" />
              
              {/* Length Segmented Control - Scrollable on very small screens */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Length</span>
                <div className="relative flex rounded-lg bg-black/5 p-1 dark:bg-white/5 overflow-x-auto">
                  {LENGTHS.map((l) => {
                    const isSelected = length === l;
                    return (
                      <button
                        key={l}
                        onClick={() => setLength(l as Length)}
                        className={clsx(
                          "relative z-10 px-3 md:px-4 py-1.5 text-xs font-medium transition-colors whitespace-nowrap",
                          isSelected ? "text-primary" : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                        )}
                      >
                         {isSelected && (
                          <motion.div
                            layoutId="activeLength"
                            className="absolute inset-0 rounded-md bg-white shadow-sm ring-1 ring-black/5 dark:bg-zinc-800 dark:ring-white/10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        <span className="relative z-20 group flex items-center justify-center">
                          {l}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </header>

          {/* Split View */}
          <div className="flex flex-1 gap-4 p-4 overflow-hidden relative">
            {/* Input Area */}
            <div className={clsx(
              "flex flex-1 flex-col gap-4 transition-all duration-300",
              mobileView === 'output' ? "hidden md:flex" : "flex"
            )}>
              <div className="group flex-1 rounded-xl border border-black/5 bg-white shadow-sm ring-1 ring-black/5 transition-all hover:shadow-md focus-within:ring-primary/10 dark:border-white/5 dark:bg-zinc-900">
                <textarea
                  className="h-full w-full resize-none rounded-xl bg-transparent p-5 text-base leading-relaxed focus:outline-none dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                  placeholder={getPlaceholder()}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleGenerate}
                  disabled={loading || !input}
                  className="relative overflow-hidden flex w-full md:w-auto md:min-w-[160px] items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white shadow-md shadow-primary/10 transition-all hover:bg-orange-500 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:shadow-none"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} className="text-white/90" />}
                  <span className="text-sm tracking-wide">{loading ? "Generating..." : "Generate"}</span>
                </motion.button>
              </div>
            </div>

            {/* Output Area */}
            <div className={clsx(
              "flex flex-1 flex-col",
               mobileView === 'input' ? "hidden md:flex" : "flex"
            )}>
              <div className="relative flex-1 rounded-xl border border-black/5 bg-white/50 backdrop-blur-sm shadow-sm ring-1 ring-black/5 transition-all dark:border-white/5 dark:bg-zinc-900/50">
                {/* Mobile Back Button */}
                 <button 
                  onClick={() => setMobileView('input')}
                  className="md:hidden absolute left-4 top-4 z-20 flex items-center gap-1 rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  ← Edit Input
                </button>

                <textarea
                  readOnly
                  className="h-full w-full resize-none rounded-xl bg-transparent p-5 text-base leading-relaxed focus:outline-none dark:text-zinc-100 pt-14 md:pt-5" 
                  placeholder="AI output will appear here..."
                  value={output}
                />
                
                {output && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="absolute right-4 top-4 flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm ring-1 ring-black/5 transition-colors hover:text-primary dark:bg-zinc-800 dark:text-zinc-300 dark:ring-white/10"
                  >
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy"}
                  </motion.button>
                )}
              </div>
               {/* Spacer */}
               <div className="hidden md:block h-[52px]" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
