import type React from "react";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Silkscreen } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pixel",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#012728",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "VOSC — Vasavi Open Source Community",
  description:
    "Vasavi Open Source Community — Build. Learn. Contribute. Open source is not just code, it's a community.",
  keywords: [
    "VOSC",
    "Vasavi",
    "Vasavi College of Engineering",
    "Open Source",
    "Student Developers",
    "GSoC",
    "Hyderabad",
  ],
  authors: [{ name: "Vasavi Open Source Community" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${jetbrainsMono.variable} ${silkscreen.variable} font-mono bg-[#012728] text-[#B5FFF0] min-h-screen flex flex-col antialiased selection:bg-[#003A3B] selection:text-[#6AFBD8]`}
      >
        <Navbar />
        <div className="flex-1 w-full">{children}</div>
        <Analytics />
        <Toaster position="bottom-right" richColors theme="dark" />
        <Footer />
      </body>
    </html>
  );
}
