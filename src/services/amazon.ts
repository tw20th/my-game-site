/**
 * Amazon検索結果リンクを生成
 * @param productName 商品名
 * @returns Amazonアフィリエイトリンク
 */
export function generateAmazonLink(productName: string): string {
  const trackingId = process.env.NEXT_PUBLIC_AMAZON_TRACKING_ID;
  if (!trackingId) {
    console.error("❌ トラッキングIDが設定されていません。");
    return "";
  }
  const baseUrl = "https://www.amazon.co.jp/s";
  const query = encodeURIComponent(productName);
  return `${baseUrl}?k=${query}&tag=${trackingId}`;
}
