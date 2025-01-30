import { Game, GameResponse } from "@/types/Game";

// 環境変数からAPIベースURLとAPIキーを取得
const RAWG_API_BASE_URL = process.env.NEXT_PUBLIC_RAWG_API_URL || "";
const RAWG_API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY || "";

// 共通のデータ変換関数
function mapGameData(data: GameResponse[]): Game[] {
  return data.map((game) => ({
    id: String(game.id),
    name: game.name,
    description: game.description_raw || "No description available.",
    rating: game.rating || 0,
    platforms: game.platforms?.map((p) => p.platform.name) || [],
    genres: game.genres || [],
    screenshots: game.short_screenshots || [],
    background_image: game.background_image || null,
    released: game.released || "Unknown release date",
  }));
}

// タイムアウト付きの fetch リクエスト
async function fetchWithTimeout(
  url: string,
  timeout = 10000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof DOMException && error.name === "AbortError") {
      console.error(
        "❌ Request Timeout: The request took too long and was aborted."
      );
      throw new Error(
        "Request Timeout: The request took too long and was aborted."
      );
    }
    if (error instanceof Error) {
      console.error("❌ Fetch Error:", error.message);
      throw new Error(error.message);
    }
    console.error("❌ An unknown error occurred:", error);
    throw new Error("An unknown error occurred.");
  }
}

// ジャンル別ゲームを取得
export async function fetchGamesByGenre(genre: string): Promise<Game[]> {
  const url = `${RAWG_API_BASE_URL}/games?key=${RAWG_API_KEY}&genres=${genre}`;
  const response = await fetchWithTimeout(url);
  if (!response.ok) {
    console.error(
      `❌ Failed to fetch games for genre: ${genre}. Status: ${response.status}`
    );
    throw new Error(`Failed to fetch games for genre: ${genre}`);
  }
  const data: { results: GameResponse[] } = await response.json();
  return mapGameData(data.results);
}

// 高評価ゲームを取得
export async function fetchTopRatedGames(): Promise<Game[]> {
  const url = `${RAWG_API_BASE_URL}/games?key=${RAWG_API_KEY}&ordering=-rating`;
  const response = await fetchWithTimeout(url);
  if (!response.ok) {
    console.error(
      `❌ Failed to fetch top-rated games. Status: ${response.status}`
    );
    throw new Error("Failed to fetch top-rated games");
  }
  const data: { results: GameResponse[] } = await response.json();
  return mapGameData(data.results);
}

// トレンドゲームを取得
export async function fetchTrendingGames(): Promise<Game[]> {
  const url = `${RAWG_API_BASE_URL}/games?key=${RAWG_API_KEY}&ordering=-added`;
  const response = await fetchWithTimeout(url);
  if (!response.ok) {
    console.error(
      `❌ Failed to fetch trending games. Status: ${response.status}`
    );
    throw new Error("Failed to fetch trending games");
  }
  const data: { results: GameResponse[] } = await response.json();
  return mapGameData(data.results);
}

// 新作ゲームを取得
export async function fetchNewReleases(): Promise<Game[]> {
  const url = `${RAWG_API_BASE_URL}/games?key=${RAWG_API_KEY}&dates=2023-01-01,2025-12-31&ordering=-released`;
  const response = await fetchWithTimeout(url);
  if (!response.ok) {
    console.error(
      `❌ Failed to fetch new releases. Status: ${response.status}`
    );
    throw new Error("Failed to fetch new releases");
  }
  const data: { results: GameResponse[] } = await response.json();
  return mapGameData(data.results);
}
