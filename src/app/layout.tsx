import type { Metadata } from "next";
import { ReactNode, useEffect } from "react";
import { Roboto, Roboto_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";

// RobotoとRoboto Monoの設定
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const robotoMono = Roboto_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

// ページのメタデータ
export const metadata: Metadata = {
  title: "My Game Site",
  description: "Discover your next favorite game",
};

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const trackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

  useEffect(() => {
    if (trackingId) {
      // Google Analytics 初期化
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", trackingId);
    } else {
      console.warn("Google Analytics トラッキングIDが設定されていません。");
    }
  }, [trackingId]);

  return (
    <html lang="ja">
      <head>
        {/* Google Analytics スクリプト */}
        {trackingId && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
