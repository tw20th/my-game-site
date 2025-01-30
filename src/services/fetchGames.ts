export async function fetchGames() {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing API Key. Please set NEXT_PUBLIC_RAWG_API_KEY in .env.local."
    );
  }

  const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}`;

  // タイムアウト機能を追加 (AbortController を使用)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒後にリクエストを中止

  try {
    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId); // 成功した場合はタイマーを解除

    if (!response.ok) {
      console.error(
        `❌ API Error: ${response.status} ${response.statusText} - ${apiUrl}`
      );
      throw new Error(`Failed to fetch games. Status: ${response.status}`);
    }

    const data = await response.json();
    return data.results; // ゲーム情報のリスト
  } catch (error: unknown) {
    clearTimeout(timeoutId); // エラーが発生してもタイマーを解除
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error(
          "❌ Request Timeout: The request took too long and was aborted."
        );
      } else {
        console.error("❌ Fetch Error:", error.message);
      }
      throw new Error(error.message);
    } else {
      console.error("❌ An unknown error occurred:", error);
      throw new Error("An unknown error occurred.");
    }
  }
}
