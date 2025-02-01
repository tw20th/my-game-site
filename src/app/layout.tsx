"use client";

import { ReactNode, useState } from "react";
import { Roboto, Roboto_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";

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

export default function RootLayout({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState(""); // 値を管理

  // 検索クエリを利用する例 (ログ出力)
  console.log("Current search query:", searchQuery);

  return (
    <html lang="ja">
      <head>
        <Script
          id="google-analytics"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
      </head>
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <Navbar setSearchQuery={setSearchQuery} />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
