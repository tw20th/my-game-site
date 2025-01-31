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
    background_image: "https://example.com/stardew-valley.jpg",
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
    background_image: "https://example.com/minecraft.jpg",
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
    background_image: "https://example.com/among-us.jpg",
    released: "2018-06-15",
  },
];
