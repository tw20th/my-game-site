/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // 設定オプションをここに記述
  reactStrictMode: true, // Reactの厳密モードを有効化
  swcMinify: true, // SWCによる最小化を有効化
  images: {
    domains: ["media.rawg.io"], // 画像のホスト名を追加
  },
};

export default nextConfig;
