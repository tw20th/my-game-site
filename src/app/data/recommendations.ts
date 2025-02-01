// 初心者向けおすすめゲームのデータ
import { Game } from "@/types/Game";

export const beginnerRecommendations: Game[] = [
  {
    id: "1",
    name: "Stardew Valley",
    description: "農業や交流が楽しめる人気ゲーム",
    rating: 4.8,
    platforms: ["PC", "Switch", "PS"],
    genres: [{ id: 1, name: "Simulation" }],
    screenshots: [],
    background_image:
      "https://upload.wikimedia.org/wikipedia/en/f/fd/Stardew_Valley.png", // ✅ 修正
    released: "2016-02-26",
  },
  {
    id: "2",
    name: "Minecraft",
    description: "クリエイティブな冒険が楽しめる大人気ゲーム",
    rating: 4.9,
    platforms: ["PC", "Xbox", "PS", "Switch"],
    genres: [{ id: 2, name: "Adventure" }],
    screenshots: [],
    background_image:
      "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png", // ✅ 修正
    released: "2011-11-18",
  },
  {
    id: "3",
    name: "Among Us",
    description: "友達と楽しく遊べるパーティーゲーム",
    rating: 4.5,
    platforms: ["PC", "Mobile", "Switch"],
    genres: [{ id: 3, name: "Party" }],
    screenshots: [],
    background_image:
      "https://upload.wikimedia.org/wikipedia/en/9/9a/Among_Us_cover_art.jpg", // ✅ 修正
    released: "2018-06-15",
  },
];
