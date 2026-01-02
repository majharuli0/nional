"use client";

import { useState } from "react";
import { Navbar } from "@nional/ui";
import { 
  Linkedin, Twitter, Instagram, Facebook, Video, Smartphone, 
  Sparkles, Loader2, Copy, Check 
} from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

// --- Types ---
type Platform = "LinkedIn" | "Twitter" | "Instagram" | "TikTok" | "Shorts" | "Facebook";
type ContentType = "Post" | "Thread" | "Script" | "Carousel";

interface ScriptScene {
  time: string;
  visual: string;
  audio: string;
}

interface SocialResult {
    script?: ScriptScene[];
    tweets?: string[];
    hook?: string;
    body?: string;
    hashtags?: string[];
}

const PLATFORMS = [
  { id: "LinkedIn", icon: Linkedin, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
  { id: "Twitter", icon: Twitter, color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-900/20" },
  { id: "Instagram", icon: Instagram, color: "text-pink-600", bg: "bg-pink-50 dark:bg-pink-900/20" },
  { id: "TikTok", icon: Video, color: "text-black dark:text-white", bg: "bg-zinc-100 dark:bg-zinc-800" },
  { id: "Shorts", icon: Smartphone, color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20" },
  { id: "Facebook", icon: Facebook, color: "text-blue-700", bg: "bg-blue-50 dark:bg-blue-900/20" },
] as const;

export default function Home() {
  // --- State ---
  const [platform, setPlatform] = useState<Platform>("LinkedIn");
  const [type, setType] = useState<ContentType>("Post");
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [cta, setCta] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SocialResult | null>(null);
  const [copied, setCopied] = useState(false);

  // --- API Call ---
  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${apiUrl}/api/social/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, type, topic, audience, cta }),
      });
      const data = await res.json();
      setResult(data.result);
    } catch (e) {
      console.error(e);
      alert("Failed to generate content.");
    }
    setLoading(false);
  };

  // --- Copy Logic ---
  const handleCopy = () => {
    if (!result) return;
    let textToCopy = "";
    if (result.script) {
      // Format script with hashtags
      const scriptText = result.script.map((s) => `[${s.time}]\nVisual: ${s.visual}\nAudio: "${s.audio}"`).join("\n\n");
      const tags = result.hashtags?.length ? `\n\nHashtags: ${result.hashtags.join(" ")}` : "";
      textToCopy = `${scriptText}${tags}`;
    } else if (result.tweets) {
      textToCopy = result.tweets.join("\n\n---\n\n");
    } else {
      textToCopy = `${result.hook}\n\n${result.body}\n\n${result.hashtags?.join(" ")}`;
    }
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- Render Helpers ---
  const isVideo = ["TikTok", "Shorts", "Instagram"].includes(platform);
  // Removed unused isThread

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <Navbar title="Social Architect" />

      <main className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        
        {/* --- LEFT: Strategy Engine (Sidebar-like) --- */}
        <div className="flex-1 overflow-y-auto border-r border-black/5 bg-primary/5 backdrop-blur-md p-6 lg:p-10 dark:border-white/5 dark:bg-zinc-900/50">
          <div className="mx-auto max-w-xl space-y-8">
            
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Strategy Engine</h1>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">Design high-retention content for any platform.</p>
            </div>

            {/* Platform Grid */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Platform</label>
              <div className="grid grid-cols-3 gap-3">
                {PLATFORMS.map((p) => {
                  const Icon = p.icon;
                  const isSelected = platform === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setPlatform(p.id);
                        if (["TikTok", "Shorts"].includes(p.id)) setType("Script");
                        else if (p.id === "Twitter") setType("Thread");
                        else setType("Post");
                      }}
                      className={clsx(
                        "flex flex-col items-center justify-center gap-2 rounded-xl border p-4 transition-all duration-200",
                        isSelected 
                          ? "border-[#F09857] bg-primary/10 shadow-sm ring-1 ring-[#F09857] dark:bg-zinc-900 dark:border-[#F09857] dark:ring-[#F09857]" 
                          : "border-transparent bg-primary/5 hover:bg-primary/10 dark:bg-white/5 dark:hover:bg-white/10"
                      )}
                    >
                      <Icon className={clsx("h-6 w-6", isSelected ? "text-[#F09857]" : p.color)} />
                      <span className={clsx("text-xs font-semibold", isSelected ? "text-[#F09857]" : "text-zinc-600 dark:text-zinc-400")}>{p.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Type */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Format</label>
              <div className="flex gap-2">
                {[
                  ...(platform === 'Twitter' ? ['Thread', 'Post'] : []),
                  ...(platform === 'LinkedIn' ? ['Post', 'Carousel'] : []),
                  ...(['TikTok', 'Shorts'].includes(platform) ? ['Script'] : []),
                  ...(['Instagram', 'Facebook'].includes(platform) ? ['Post', 'Reel'] : []),
                ].map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t as ContentType)}
                    className={clsx(
                      "rounded-full px-5 py-2 text-sm font-semibold transition-all",
                      type === t 
                        ? "bg-primary/10 text-[#F09857] ring-1 ring-[#F09857] shadow-sm dark:bg-zinc-900/90 dark:text-[#F09857] dark:ring-[#F09857]" 
                        : "bg-primary/5 text-zinc-600 hover:bg-primary/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-white/10"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Topic / Main Idea</label>
                <div className="group rounded-xl border border-black/5 bg-white/60 shadow-sm ring-1 ring-black/5 transition-all focus-within:ring-[#F09857] focus-within:border-[#F09857] dark:border-white/5 dark:bg-zinc-900">
                  <textarea 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Why every developer should learn marketing..."
                    className="w-full resize-none rounded-xl bg-transparent p-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-500 dark:text-zinc-100 placeholder:opacity-70"
                    rows={3}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Target Audience</label>
                  <input 
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="e.g. Junior Devs"
                    className="w-full rounded-lg border border-black/5 bg-white/60 px-3 py-2 text-sm text-zinc-900 shadow-sm ring-1 ring-black/5 outline-none focus:ring-[#F09857] focus:border-[#F09857] dark:border-white/5 dark:bg-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Call to Action</label>
                  <input 
                    value={cta}
                    onChange={(e) => setCta(e.target.value)}
                    placeholder="e.g. Subscribe"
                    className="w-full rounded-lg border border-black/5 bg-white/60 px-3 py-2 text-sm text-zinc-900 shadow-sm ring-1 ring-black/5 outline-none focus:ring-[#F09857] focus:border-[#F09857] dark:border-white/5 dark:bg-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading || !topic}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#F09857] py-4 text-lg font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-[#e8914f] hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="fill-white/20" />}
              <span>{loading ? "Designing Content..." : "Generate Strategy"}</span>
            </button>

          </div>
        </div>

        {/* --- RIGHT: Preview Engine (Content-like) --- */}
        <div className="flex-1 bg-primary/5 p-6 lg:p-10 dark:bg-black/20 flex flex-col">
          <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
            
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold uppercase tracking-wider text-zinc-400">Live Preview</h2>
              {result && (
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold shadow-sm transition-all hover:bg-zinc-50 hover:text-[#F09857] dark:bg-zinc-900"
                >
                  {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  <span>{copied ? "Copied" : "Copy Content"}</span>
                </button>
              )}
            </div>

            <div className="flex-1 flex items-center justify-center">
              {!result && !loading && (
                <div className="text-center text-zinc-400">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-zinc-200 dark:bg-zinc-900">
                    <Sparkles className="h-8 w-8 opacity-20" />
                  </div>
                  <p>Ready to design. Enter your inputs left.</p>
                </div>
              )}

              {loading && <Loader2 className="h-10 w-10 animate-spin text-zinc-300" />}

              {result && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="h-full w-full p-6 lg:p-10">
                    
                    {/* --- RENDER: Video Script --- */}
                    {result.script && (
                      <div className="space-y-8">
                        <div className="border-b border-zinc-200 pb-6 dark:border-zinc-800">
                          <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-white leading-tight">{topic}</h3>
                          <p className="text-xs font-medium text-zinc-500 mt-2 tracking-wide">VIDEO SCRIPT • {result.script.length} PRO SCENES</p>
                        </div>
                        
                        <div className="space-y-6">
                            {result.script.map((scene, i) => (
                              <div key={i} className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                                <div className="flex flex-col gap-1">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Time</span>
                                  <span className="text-xs font-bold font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-700 px-1.5 py-0.5 rounded w-fit">{scene.time}</span>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                     <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 block">Visual</span>
                                     <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{scene.visual}</p>
                                  </div>
                                  <div>
                                     <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1 block">Audio</span>
                                     <p className="text-sm text-zinc-900 dark:text-zinc-100 font-serif italic leading-relaxed">"{scene.audio}"</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>

                        {/* Separate Hashtags Display */}
                        {result.hashtags && (
                          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                             <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 block">Suggested Tags</span>
                             <div className="flex flex-wrap gap-2">
                               {result.hashtags.map((tag, i) => (
                                 <span key={i} className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer">
                                   {tag}
                                 </span>
                               ))}
                             </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* --- RENDER: Twitter Thread --- */}
                    {result.tweets && (
                      <div className="space-y-0">
                        {result.tweets.map((tweet, i) => (
                          <div key={i} className="relative pb-6 last:pb-0">
                            {/* Connector Line */}
                            {i !== result.tweets.length - 1 && (
                              <div className="absolute left-[20px] top-12 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800"></div>
                            )}
                            
                            <div className="flex gap-3">
                              <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sm">You</span>
                                  <span className="text-zinc-400 text-xs">@creator</span>
                                </div>
                                <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">{tweet}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* --- RENDER: Standard Post --- */}
                    {!result.script && !result.tweets && result.hook && (
                      <div className="space-y-4">
                         <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                            <div>
                               <div className="font-bold text-sm">Creator Name</div>
                               <div className="text-xs text-zinc-400">Just now • 🌐</div>
                            </div>
                         </div>
                         <div className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
                            <p className="font-semibold mb-2">{result.hook}</p>
                            <p>{result.body}</p>
                            <p className="mt-4 text-blue-600 dark:text-blue-400 font-medium">
                              {result.hashtags?.join(" ")}
                            </p>
                         </div>
                      </div>
                    )}

                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
