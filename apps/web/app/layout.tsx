import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* Display serif — weight 400 only; refined, editorial, never bold. */
const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

/* Body & UI sans. */
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

/* Monospace — numbers, metrics, technical detail. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://piekai.nl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "PiekAI — Word de standaard. In Google. In ChatGPT. Overal.",
  description:
    "PiekAI is een autonome AI-agent die jouw bedrijf naar #1 brengt — en daar houdt. In Google én in elke AI-zoekmachine. Een product van AanloopAI.",
  keywords: [
    "AI-zichtbaarheid",
    "GEO",
    "SEO",
    "ChatGPT zichtbaarheid",
    "autonome SEO-agent",
    "PiekAI",
  ],
  authors: [{ name: "AanloopAI" }],
  /* Favicon is provided by app/icon.svg (Next.js auto-detects it). */
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE_URL,
    siteName: "PiekAI",
    title: "PiekAI — Word de standaard. In Google. In ChatGPT. Overal.",
    description:
      "Een autonome AI-agent die jouw bedrijf naar #1 brengt — en daar houdt. In Google én in elke AI-zoekmachine.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PiekAI — Word de standaard. In Google. In ChatGPT. Overal.",
    description: "Een autonome AI-agent die jouw bedrijf naar #1 brengt — en daar houdt.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bone-50">
        {/*
         * No-JS fallback: <Reveal> SSRs content at opacity:0 / translateY(16px)
         * for the scroll animation. Without JS the animation never runs, so
         * force every reveal-anim element fully visible.
         */}
        <noscript>
          <style>{".reveal-anim{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
