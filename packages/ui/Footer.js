"use client";

import React from 'react';

export const Footer = () => (
  <footer className="w-full border-t border-[#E5E5DA] bg-[#F5F5F0] py-8 text-center dark:border-zinc-800 dark:bg-black">
    <p className="text-sm text-zinc-500 dark:text-zinc-400">
      &copy; {new Date().getFullYear()} Nional Platform. All rights reserved.
    </p>
  </footer>
);
