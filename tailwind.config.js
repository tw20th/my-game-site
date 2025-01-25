/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // srcディレクトリ内の全てのJS/TS/JSX/TSXファイル
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // カスタムプロパティを利用
        foreground: "var(--foreground)", // カスタムプロパティを利用
      },
    },
  },
  plugins: [],
};
