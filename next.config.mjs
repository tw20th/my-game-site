import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true, // 🔹 厳密モードを有効化
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.rawg.io",
      },
      {
        protocol: "https",
        hostname: "example.com", // 🔹 `example.com` の画像を許可（不要なら削除）
      },
    ],
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY, // 🔹 クライアント側では利用不可（API経由で使用）
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"), // 🔹 エイリアス設定
    };

    // 🔹 キャッシュを無効化（ビルド時間が増加するため、開発時のみに推奨）
    config.cache = false;

    return config;
  },
};

export default nextConfig;
