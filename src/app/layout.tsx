"use client";

import { ReactNode, useEffect } from "react";
import { Roboto, Roboto_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";

// RobotoとRoboto Monoの設定（display: swap を追加）
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const robotoMono = Roboto_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

// グローバルな型定義
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const trackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

  useEffect(() => {
    if (!trackingId) {
      console.warn("Google Analytics トラッキングIDが設定されていません。");
      return;
    }

    // Google Analytics 初期化
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };

    window.gtag("js", new Date());
    window.gtag("config", trackingId, { send_page_view: false });
  }, [trackingId]);

  return (
    <html lang="ja">
      <head>
        {/* Google Analytics スクリプト */}
        {trackingId && (
          <>
            <Script
              id="google-analytics"
              src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){window.dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${trackingId}', { send_page_view: false });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
