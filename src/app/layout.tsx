import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk, VT323, Pacifico } from "next/font/google"; // Import fonts
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

const pacifico = Pacifico({
  weight: "400",
  variable: "--font-cursive",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anirudh S | AI/ML & Agentic Systems Engineer",
  description: "Building Autonomous Agentic Workflows, Production GenAI Backends (FastAPI & pgvector), and Edge Machine Learning Systems.",
  keywords: [
    "Anirudh S",
    "AI/ML Engineer",
    "Generative AI Engineer",
    "Agentic Workflows",
    "Autonomous Agents",
    "ReAct Architecture",
    "FastAPI",
    "pgvector",
    "Supabase",
    "Groq API",
    "NVIDIA NIM",
    "TensorFlow Lite",
    "PyTorch",
    "SudoAnirudh"
  ],
  authors: [{ name: "Anirudh S" }],
  creator: "Anirudh S",
  publisher: "Anirudh S",
  robots: "index, follow",
  alternates: {
    canonical: "https://portfolio-blue-five-10.vercel.app/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-blue-five-10.vercel.app/",
    siteName: "Anirudh S | AI/ML & Agentic Systems Engineer",
    title: "Anirudh S | AI/ML & Agentic Systems Engineer",
    description: "Explore production-grade AI systems, multi-agent frameworks, FastAPI backends, and edge ML applications.",
    images: [
      {
        url: "/profile_pixel.png",
        width: 1200,
        height: 630,
        alt: "Anirudh S | AI/ML & Agentic Systems Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anirudh S | AI/ML & Agentic Systems Engineer",
    description: "Building Autonomous Agentic Workflows, Production GenAI Backends (FastAPI & pgvector), and Edge Machine Learning Systems.",
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
  url: "https://portfolio-blue-five-10.vercel.app/",
  image: "https://portfolio-blue-five-10.vercel.app/profile_pixel.png",
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
    "Deep Learning",
    "TensorFlow Lite",
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
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" rel="stylesheet" />
      </head>
      <body
        className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${vt323.variable} ${pacifico.variable} bg-retro-charcoal font-body text-zinc-900 overflow-x-hidden p-3 sm:p-4 md:p-6 lg:p-10`}
        suppressHydrationWarning
      >
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50"></div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        {/* Helper for cursor hiding handled inside component, but adding it here to be safe */}
        <RetroCursor />
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {children}
        </div>
      </body>
    </html>
  );
}
