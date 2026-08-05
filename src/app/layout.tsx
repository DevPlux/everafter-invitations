import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import {MusicPlayer} from "@/components/wedding/MusicPlayer";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://everafter-invitations.vercel.app"
  ),

  title: {
    default: "Amelia & Noah | Wedding Invitation",
    template: "%s | Amelia & Noah",
  },
  description:
      "Together with their families, Amelia and Noah invite you to celebrate their wedding on 12 December 2026 in Colombo, Sri Lanka.",
  applicationName: "Amelia & Noah Wedding",
  authors: [{ name: "Amelia & Noah" }],
  creator: "DevPlux IT Solutions",
  publisher: "DevPlux IT Solutions",
  keywords: [
    "Amelia and Noah wedding",
    "wedding invitation",
    "12 December 2026",
    "Colombo wedding",
    "Sri Lanka wedding",
  ],
  category: "Wedding",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_LK",
    siteName: "Amelia & Noah Wedding",
    title: "Amelia & Noah | Wedding Invitation",
    description:
        "Celebrate the wedding of Amelia and Noah on 12 December 2026 in Colombo, Sri Lanka.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amelia & Noah | Wedding Invitation",
    description:
        "Celebrate the wedding of Amelia and Noah on 12 December 2026 in Colombo, Sri Lanka.",
  },
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
          lang="en"
          className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}
      >
      <body className="flex min-h-full flex-col">
      {children}
      <MusicPlayer />
      </body>
      </html>
  );
}