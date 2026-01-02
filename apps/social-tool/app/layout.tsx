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
  title: "Social Architect - Free AI Content Generator",
  description: "Generate viral TikTok scripts, LinkedIn posts, and Twitter threads for free. No sign up required. Unlimited AI social media strategy.",
  keywords: ["free ai script writer", "tiktok script generator", "no sign up ai", "linkedin post generator", "social architect"],
  openGraph: {
    title: "Social Architect - Free AI Content Generator",
    description: "Create viral content for any platform in seconds. No account needed.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
