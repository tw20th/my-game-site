type GameLinksProps = {
  gameId: string; // gameId を string 型に変更
  gameName: string;
};

export default function GameLinks({ gameId, gameName }: GameLinksProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <a
        href={`https://rawg.io/games/${gameId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        RAWGで詳しく見る
      </a>
      <a
        href={`https://search.rakuten.co.jp/search/mall/${encodeURIComponent(
          gameName
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded shadow-lg hover:shadow-xl transition"
      >
        楽天で購入
      </a>
    </div>
  );
}
