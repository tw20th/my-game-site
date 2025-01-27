export async function fetchRakutenData(keyword: string) {
  const appId = process.env.NEXT_PUBLIC_RAKUTEN_APP_ID;
  const response = await fetch(
    `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?applicationId=${appId}&keyword=${encodeURIComponent(
      keyword
    )}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data from Rakuten API");
  }
  const data = await response.json();
  return data;
}
