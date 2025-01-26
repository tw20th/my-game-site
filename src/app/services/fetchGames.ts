export async function fetchGames() {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`);
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  const data = await response.json();
  return data.results; // ゲーム情報のリスト
}
