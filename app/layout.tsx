import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const SITE_URL = "https://chinemerem.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Chinemerem Daniel — Product Engineer (0→1)",
  description:
    "Chinemerem Daniel (codacdanny) — a product engineer who takes ideas from 0 to 1. Shipped products across web3/DeFi, fintech, EdTech and HR-tech: TRADEBET, Parallel, Acheva, PayByLeap, ChainStatement.",
  keywords: [
    "Chinemerem Daniel",
    "codacdanny",
    "product engineer",
    "full-stack engineer",
    "Solana developer",
    "web3 engineer",
    "Next.js",
    "React",
    "portfolio",
  ],
  authors: [{ name: "Chinemerem Daniel" }],
  openGraph: {
    title: "Chinemerem Daniel — Product Engineer (0→1)",
    description:
      "A product engineer who takes ideas from 0 to 1. Web3, fintech, EdTech, HR-tech.",
    url: SITE_URL,
    siteName: "Chinemerem Daniel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@codacdanny",
    title: "Chinemerem Daniel — Product Engineer (0→1)",
    description:
      "A product engineer who takes ideas from 0 to 1. Web3, fintech, EdTech, HR-tech.",
  },
};

export const viewport: Viewport = {
  themeColor: "#080809",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
