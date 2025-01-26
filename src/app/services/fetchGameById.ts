export async function fetchGameById(id: string) {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  const response = await fetch(
    `https://api.rawg.io/api/games/${id}?key=${apiKey}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch game details");
  }
  return response.json();
}
