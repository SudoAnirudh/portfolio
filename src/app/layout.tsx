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
  title: "Anirudh S | AI & ML Engineer Portfolio",
  description: "Portfolio of Anirudh S, an AI/ML Engineer specializing in Deep Learning, CNNs, and NLP. Exploring the gap between data, models, and real-world deployment.",
  keywords: [
    "Anirudh S",
    "AI Engineer",
    "Machine Learning Engineer",
    "Deep Learning",
    "Computer Vision",
    "NLP",
    "TensorFlow",
    "Keras",
    "Python Developer",
    "Portfolio",
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
    siteName: "Anirudh S Portfolio",
    title: "Anirudh S | AI & ML Engineer",
    description: "AI/ML Undergraduate with hands-on exposure to Deep Learning, CNNs, and NLP. Check out my latest projects and work.",
    images: [
      {
        url: "/profile.png", // Using the existing profile image
        width: 1200,
        height: 630,
        alt: "Anirudh S Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anirudh S | AI & ML Engineer",
    description: "AI/ML Undergraduate with hands-on exposure to Deep Learning, CNNs, and NLP.",
    images: ["/profile.png"],
    creator: "@SudoAnirudh", // Assuming the GH username is useable or fallback
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
  image: "https://portfolio-blue-five-10.vercel.app/profile.png",
  jobTitle: "AI & ML Engineer",
  sameAs: [
    "https://github.com/SudoAnirudh",
    "https://linkedin.com/in/sudoanirudh"
  ],
  description: "AI/ML Undergraduate specializing in Deep Learning, CNNs, and NLP."
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
