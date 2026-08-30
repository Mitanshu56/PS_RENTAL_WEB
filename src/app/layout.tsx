import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sony WH-1000XM6 | Silence, perfected.",
  description: "Experience the flagship wireless noise cancelling headphones, re-engineered for a world that never stops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-brand-bg-primary text-white">
        {children}
      </body>
    </html>
  );
}
