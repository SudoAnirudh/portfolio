import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk, VT323 } from "next/font/google"; // Import fonts
import "./globals.css";
import RetroCursor from "@/components/RetroCursor";


const archivoBlack = Archivo_Black({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const vt323 = VT323({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ANIRUDH S",
  description: "AI/ML ENGINEER Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body
        className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${vt323.variable} bg-retro-charcoal font-body text-zinc-900 overflow-x-hidden p-3 sm:p-4 md:p-6 lg:p-10`}
        suppressHydrationWarning
      >
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50"></div>
        {/* Helper for cursor hiding handled inside component, but adding it here to be safe */}
        <RetroCursor />

        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {children}
        </div>
      </body>
    </html>
  );
}
