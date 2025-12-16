"use client";

import React, { useRef, useState } from 'react';
import * as mot from 'framer-motion';
const { motion, useMotionTemplate, useMotionValue } = mot;
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { TOOLS } from '../lib/data';

import Link from 'next/link';

function ToolCard({ tool }: { tool: any }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const Icon = tool.icon;
  const isLink = tool.status === 'Active';
  
  // We wrap the card in a Link if active, otherwise a div
  const Wrapper = ({ children, className, ...props }: any) => 
    isLink 
      ? <Link href={`/tool/${tool.id}`} className={className} {...props}>{children}</Link> 
      : <div className={className} {...props}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="h-full" // Ensure height consistency
    >
      <Wrapper
        className={clsx(
            "group relative flex h-full flex-col gap-5 rounded-[2rem] border border-zinc-200 bg-[#FAF3E3]/50 p-8 transition-all hover:bg-white hover:shadow-2xl hover:shadow-orange-500/10 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800",
            isLink ? "cursor-pointer" : "cursor-default opacity-75"
        )}
        onMouseMove={handleMouseMove}
      >
        {/* Spotlight Effect */}
        <motion.div
            className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
            background: useMotionTemplate`
                radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(249, 115, 22, 0.15),
                transparent 80%
                )
            `,
            }}
        />

        <div className={clsx("flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm transition-transform group-hover:scale-110", tool.bg)}>
            <Icon size={32} className={tool.text} />
        </div>
        
        <div className="flex-1">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
            {tool.name}
            </h3>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {tool.desc}
            </p>
        </div>

        <div className="relative mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            {isLink ? (
                <div className="flex items-center gap-2 text-sm font-bold text-orange-600 group-hover:translate-x-2 transition-transform duration-300">
                Launch Tool <ArrowRight size={16} />
                </div>
            ) : (
            <div className="inline-flex items-center rounded-full bg-zinc-200 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                Coming Soon
            </div>
            )}
        </div>
      </Wrapper>
    </motion.div>
  );
}

export const ToolsGrid = () => {
  return (
    <section id="tools" className="px-6 py-32 bg-white/30 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold md:text-5xl mb-6 tracking-tight">Explore Our Tools</h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                A growing collection of utilities designed to simplify your digital life.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {TOOLS.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>
  );
};
