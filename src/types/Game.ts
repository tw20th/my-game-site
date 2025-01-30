// ジャンル情報を表す型
export interface Genre {
  id: number; // ジャンルの一意識別子
  name: string; // ジャンル名
}

// スクリーンショット情報を表す型
export interface Screenshot {
  id: number; // スクリーンショットの一意識別子
  image: string; // スクリーンショットの画像URL
}

// API レスポンスの生データ構造
export interface GameResponse {
  id: number; // ゲームの一意識別子（API レスポンス時点では数値）
  name: string; // ゲーム名
  description_raw: string; // ゲームの詳細説明
  rating: number; // 評価スコア
  platforms: { platform: { name: string } }[]; // プラットフォーム情報（ネストされた構造）
  genres: Genre[]; // ジャンル情報
  short_screenshots?: Screenshot[]; // スクリーンショット情報（任意）
  background_image?: string | null; // 背景画像URL（ない場合は null）
  released: string; // リリース日
}

// 整形されたゲームデータの型
export interface Game {
  id: string; // 文字列型に統一
  name: string; // ゲーム名
  description: string; // 詳細説明
  rating: number; // 評価スコア
  platforms: string[]; // プラットフォーム情報（文字列の配列）
  genres: Genre[]; // ジャンル情報
  screenshots: Screenshot[]; // スクリーンショット情報
  background_image?: string | null; // 背景画像URL（ない場合は null）
  released: string; // リリース日
}
