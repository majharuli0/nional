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

  const handleGenerate = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${apiUrl}/api/write/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, mode, tone, length }),
      });
      const data = await res.json();
      if (data.result) {
        setOutput(data.result);
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
        {/* Sidebar */}
        <aside className="w-72 flex-shrink-0 border-r border-black/5 bg-surface/50 backdrop-blur-sm dark:border-white/5 dark:bg-zinc-900/50 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="px-2">
               <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
                Writing Tools
              </h2>
            </div>
            <div className="space-y-2">
            {MODES.map((m) => {
              const Icon = m.icon;
              const isActive = mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id as Mode)}
                  className={clsx(
                    "group relative w-full flex items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all duration-200 ease-out",
                    isActive
                      ? "bg-white shadow-xl shadow-black/5 ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10"
                      : "hover:bg-white/60 dark:hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                  )}
                  <div className={clsx(
                    "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                    isActive ? "bg-primary/10 text-primary" : "bg-black/5 text-zinc-500 group-hover:bg-black/10 dark:bg-white/5 dark:text-zinc-400"
                  )}>
                     <Icon size={20} />
                  </div>
                  <div>
                    <div className={clsx("font-semibold text-sm", isActive ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200")}>
                      {m.label}
                    </div>
                    <div className="text-[11px] font-medium text-zinc-400 group-hover:text-zinc-500 dark:text-zinc-600">
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
          {/* Top Bar */}
          <header className="flex items-center justify-between border-b border-black/5 px-8 py-5 dark:border-white/5">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Tone</span>
                <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
                  <SelectTrigger className="w-[160px] border-0 bg-white/50 shadow-sm ring-1 ring-black/5 hover:bg-white/80 focus:ring-primary/20 dark:bg-white/5 dark:ring-white/10 dark:hover:bg-white/10">
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
              <div className="h-6 w-px bg-black/5 dark:bg-white/5" />
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Length</span>
                 <Select value={length} onValueChange={(v) => setLength(v as Length)}>
                  <SelectTrigger className="w-[160px] border-0 bg-white/50 shadow-sm ring-1 ring-black/5 hover:bg-white/80 focus:ring-primary/20 dark:bg-white/5 dark:ring-white/10 dark:hover:bg-white/10">
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent className="border-black/5 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/95">
                    {LENGTHS.map((l) => (
                      <SelectItem key={l} value={l} className="cursor-pointer focus:bg-primary/10 focus:text-primary">
                         {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </header>

          {/* Split View */}
          <div className="flex flex-1 gap-8 p-8 overflow-hidden">
            {/* Input Area */}
            <div className="flex flex-1 flex-col gap-6">
              <div className="group flex-1 rounded-2xl border border-black/5 bg-white shadow-sm ring-4 ring-transparent transition-all hover:shadow-md focus-within:ring-primary/10 dark:border-white/5 dark:bg-zinc-900">
                <textarea
                  className="h-full w-full resize-none rounded-2xl bg-transparent p-6 text-lg leading-relaxed focus:outline-none dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                  placeholder={getPlaceholder()}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleGenerate}
                disabled={loading || !input}
                className="relative overflow-hidden flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-primary to-orange-600 py-5 font-bold text-white shadow-xl shadow-primary/20 transition-all hover:shadow-2xl hover:shadow-primary/30 disabled:opacity-50 disabled:shadow-none"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} className="text-orange-100" />}
                <span className="text-lg tracking-wide">{loading ? "Generating..." : "Generate Magic"}</span>
              </motion.button>
            </div>

            {/* Output Area */}
            <div className="flex flex-1 flex-col">
              <div className="relative flex-1 rounded-2xl border border-black/5 bg-white/50 backdrop-blur-sm shadow-sm ring-1 ring-black/5 transition-all dark:border-white/5 dark:bg-zinc-900/50">
                <textarea
                  readOnly
                  className="h-full w-full resize-none rounded-2xl bg-transparent p-6 text-lg leading-relaxed focus:outline-none dark:text-zinc-100"
                  placeholder="AI output will appear here..."
                  value={output}
                />
                
                {output && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="absolute right-4 top-4 flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-lg ring-1 ring-black/5 transition-colors hover:text-primary dark:bg-zinc-800 dark:text-zinc-300 dark:ring-white/10"
                  >
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    {copied ? "Copied" : "Copy Text"}
                  </motion.button>
                )}
              </div>
               {/* Spacer to match button height on left */}
               <div className="h-[68px]" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
