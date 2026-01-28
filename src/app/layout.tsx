import type { Metadata } from "next";
import { Patrick_Hand, Fira_Code } from "next/font/google";
import "./globals.css";

const patrickHand = Patrick_Hand({
  weight: "400",
  variable: "--font-patrick",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anirudh S | AI & ML Engineer",
  description: "AI & ML undergraduate with strong hands-on exposure to Deep Learning, CNNs, and NLP.",
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
        className={`${patrickHand.variable} ${firaCode.variable} antialiased selection:bg-slate-200 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
