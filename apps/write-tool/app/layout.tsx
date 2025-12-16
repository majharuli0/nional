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
  title: "Nional Write - Free AI Writer",
  description: "Generate essays, emails, and social posts for free. Nional Write is a 100% free AI writing assistant with no login required. Unlimited usage.",
  keywords: ["free ai writer", "no sign up ai", "free essay generator", "ai copywriting free", "nional write"],
  openGraph: {
    title: "Nional Write - Free AI Writer",
    description: "Write better, faster, and for free. No account needed.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
