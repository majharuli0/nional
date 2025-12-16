"use client";

import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { ToolsGrid } from '../components/ToolsGrid';
import { UseCases } from '../components/UseCases';
import { Features } from '../components/Features';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF3E3] font-sans text-zinc-900 dark:bg-black dark:text-zinc-100">
      <Header />
      <Hero />
      <Stats />
      <ToolsGrid />
      <UseCases />
      <Features />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
