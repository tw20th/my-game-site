import Image from "next/image";
import Link from "next/link";
import { Game } from "@/types/Game"; // Game 型をインポート
import { generateAmazonLink } from "@/services/amazon"; // Amazonリンク生成関数をインポート

type GameCardProps = {
  game: Game;
};

export default function GameCard({ game }: GameCardProps) {
  const amazonLink = generateAmazonLink(game.name); // ゲーム名からAmazonリンクを生成

  return (
    <div className="p-4 border rounded-lg shadow hover:shadow-lg transition-transform transform hover:translate-y-[-5px]">
      {/* タイトル */}
      <h3 className="text-lg font-bold text-gray-900">{game.name}</h3>
      {/* リリース日 */}
      <p className="text-sm text-gray-600">リリース日: {game.released}</p>
      {/* 背景画像 */}
      {game.background_image && (
        <div className="relative w-full h-48 my-4 overflow-hidden rounded-md">
          <Image
            src={game.background_image}
            alt={`Game cover of ${game.name}`}
            fill // Next.js Imageの新しいプロパティに変更
            style={{ objectFit: "cover" }} // 新しい方式でobjectFitを指定
            className="rounded-md"
          />
        </div>
      )}
      {/* ジャンル */}
      <p className="text-sm font-bold text-blue-500">
        ジャンル: {game.genres.map((g) => g.name).join(", ")}
      </p>
      {/* 楽天リンクボタン */}
      <a
        href={`https://search.rakuten.co.jp/search/mall/${encodeURIComponent(
          game.name
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        楽天で購入
      </a>
      {/* Amazonリンクボタン */}
      {amazonLink && (
        <a
          href={amazonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Amazonで購入
        </a>
      )}
      {/* 詳細ページリンク */}
      <Link
        href={`/games/${game.id}`}
        className="inline-block mt-4 text-blue-500 hover:underline"
      >
        詳細を見る
      </Link>
    </div>
  );
}
