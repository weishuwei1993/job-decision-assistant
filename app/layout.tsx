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
  title: "天生我材必有用 — 求职决策助手",
  description:
    "AI 帮你在投简历前想清楚：我想去哪、我能去哪、哪家公司值得去。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="bg-[#F7F8FB] font-sans text-[#475467] antialiased">
        {children}
      </body>
    </html>
  );
}
