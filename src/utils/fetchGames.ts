export async function fetchGames(page: number, pageSize: number) {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page=${page}&page_size=${pageSize}`
  );
  if (!response.ok) {
    throw new Error("ゲームデータの取得に失敗しました");
  }
  const data = await response.json();
  return data.results;
}
