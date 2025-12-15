"use client";

import { useState } from "react";
import { Navbar } from "@nional/ui";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleHumanize = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${apiUrl}/api/humanize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
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

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <Navbar title={"AI Humanizer"} />
      
      <main className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Make Your Writing Human
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Bypass AI detection with our advanced rewriting engine.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Input Text (AI Generated)
              </label>
              <textarea
                className="h-64 w-full resize-none rounded-xl border border-zinc-200 bg-white p-4 text-base focus:border-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-100"
                placeholder="Paste your robotic text here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Humanized Result
              </label>
              <div className="relative">
                <textarea
                  readOnly
                  className="h-64 w-full resize-none rounded-xl border border-zinc-200 bg-zinc-100 p-4 text-base focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  placeholder="Result will appear here..."
                  value={output}
                />
                {output && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(output);
                      alert("Copied to clipboard!");
                    }}
                    className="absolute bottom-4 right-4 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
                  >
                    Copy
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleHumanize}
              disabled={loading || !input}
              className="rounded-full bg-zinc-900 px-8 py-3 font-semibold text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 dark:bg-white dark:text-black"
            >
              {loading ? "Humanizing..." : "Humanize Text ✨"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
