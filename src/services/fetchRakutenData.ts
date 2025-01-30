export async function fetchRakutenData(keyword: string) {
  const appId = process.env.NEXT_PUBLIC_RAKUTEN_APP_ID;
  if (!appId) {
    throw new Error(
      "Missing Rakuten API Key. Please set NEXT_PUBLIC_RAKUTEN_APP_ID in .env.local."
    );
  }

  const apiUrl = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?applicationId=${appId}&keyword=${encodeURIComponent(
    keyword
  )}`;

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
      throw new Error(
        `Failed to fetch data from Rakuten API. Status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
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
