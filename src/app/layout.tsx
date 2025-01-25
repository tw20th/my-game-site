import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css"; // グローバルCSSをインポート
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
  description: "Explore and discover amazing games!",
};

// ルートレイアウトコンポーネント
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
