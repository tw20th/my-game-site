import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // __dirname の代替

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true, // React の厳密モードを有効化
  images: {
    domains: ["media.rawg.io", "example.com"], // 許可する画像ドメインを追加
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"), // エイリアス設定
    };
    return config;
  },
};

export default nextConfig;
