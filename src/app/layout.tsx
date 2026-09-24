import type { Metadata } from "next";
import { Newsreader, EB_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Analytics } from "@vercel/analytics/next";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Anirudh S — The Engineering Monograph | AI Systems & Architecture",
  description: "An editorial compendium of production autonomous agents, semantic retrieval pipelines, and full-stack software architectures by Anirudh S.",
  keywords: [
    "Anirudh S",
    "Engineering Monograph",
    "AI Systems Engineer",
    "Generative AI",
    "Agentic Workflows",
    "Autonomous Agents",
    "ReAct Control Loops",
    "FastAPI",
    "pgvector",
    "Supabase",
    "Multi-Agent Systems",
    "PyTorch"
  ],
  authors: [{ name: "Anirudh S" }],
  creator: "Anirudh S",
  publisher: "Anirudh S",
  robots: "index, follow",
  alternates: {
    canonical: "https://sudoanirudh.vercel.app/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sudoanirudh.vercel.app/",
    siteName: "Anirudh S — The Engineering Monograph",
    title: "Anirudh S — The Engineering Monograph",
    description: "In-depth research, architectural line art diagrams, and technical monographs for production AI & agentic systems.",
    images: [
      {
        url: "/profile_pixel.png",
        width: 1200,
        height: 630,
        alt: "Anirudh S — Engineering Monograph",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anirudh S — The Engineering Monograph",
    description: "An editorial research journal on production AI systems, agentic control loops, and edge ML.",
    images: ["/profile_pixel.png"],
    creator: "@SudoAnirudh",
  },
  verification: {
    google: "9247cc91dc1d8725",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anirudh S",
  url: "https://sudoanirudh.vercel.app/",
  image: "https://sudoanirudh.vercel.app/profile_pixel.png",
  jobTitle: "AI/ML Engineer | Generative AI & Agentic Systems",
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Srinivas Institute Of Technology"
  },
  knowsAbout: [
    "Autonomous Agents",
    "Agentic Workflows",
    "ReAct Control Loops",
    "FastAPI",
    "pgvector",
    "Supabase",
    "Multi-Agent Systems",
    "Machine Learning",
    "PyTorch",
    "Next.js"
  ],
  sameAs: [
    "https://github.com/SudoAnirudh",
    "https://linkedin.com/in/sudoanirudh"
  ],
  description: "AI/ML Engineer specializing in Autonomous Agentic Workflows, Production GenAI Backends (FastAPI & pgvector), and Edge Machine Learning Systems."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${newsreader.variable} ${ebGaramond.variable} ${jetbrainsMono.variable} min-h-screen paper-texture`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
