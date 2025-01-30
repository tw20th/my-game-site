import { GameResponse, Game } from "@/types/Game";

const API_BASE_URL = "https://api.rawg.io/api";
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export async function fetchGameById(id: string): Promise<Game> {
  if (!API_KEY) {
    console.error(
      "❌ ERROR: API Key is missing. Set NEXT_PUBLIC_RAWG_API_KEY in .env.local."
    );
    throw new Error("Missing API Key");
  }

  const apiUrl = `${API_BASE_URL}/games/${id}?key=${API_KEY}`;

  // AbortController を使ってタイムアウト機能を実装
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒後にリクエストを中止

  try {
    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId); // 成功した場合はタイマーを解除

    if (!response.ok) {
      console.error(
        `❌ API Error: ${response.status} ${response.statusText} - ${apiUrl}`
      );
      throw new Error(
        `Failed to fetch game details. Status: ${response.status}`
      );
    }

    const data: GameResponse = await response.json();

    return {
      id: String(data.id),
      name: data.name || "Unknown Title",
      description: data.description_raw || "No description available.",
      rating: data.rating ?? 0,
      platforms: data.platforms?.map((p) => p.platform.name) || [],
      genres: data.genres || [],
      screenshots: data.short_screenshots || [],
      background_image: data.background_image || null,
      released: data.released || "Unknown release date",
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error(
          "❌ Request Timeout: The request took too long and was aborted."
        );
      } else {
        console.error("❌ Fetch Error:", error.message);
      }
      throw new Error(error.message); // `Error` 型として再スロー
    } else {
      console.error("❌ An unknown error occurred:", error);
      throw new Error("An unknown error occurred.");
    }
  }
}
