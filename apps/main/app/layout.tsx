import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nional - Free AI Tools",
    template: "%s | Nional",
  },
  description: "Use premium AI tools for free. No sign up, no login, no credit card required. Nional provides unlimited access to AI writing, PDF scanning, and image editing tools.",
  keywords: [
    "free ai tools", 
    "no sign up ai", 
    "no login required", 
    "free ai writer", 
    "pdf ai chat free", 
    "unlimited ai", 
    "nional"
  ],
  authors: [{ name: "Nional Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nional.com",
    title: "Nional - Free AI Tools",
    description: "100% Free AI Tools. No account needed. Write better, chat with PDFs, and edit images instantly.",
    siteName: "Nional",
  },
  icons: {
    icon: "https://fav.farm/🧡", 
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
