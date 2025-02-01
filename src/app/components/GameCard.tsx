import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Game } from "@/types/Game";
import { generateAmazonLink } from "@/services/amazon";

type GameCardProps = {
  game: Game;
};

export default function GameCard({ game }: GameCardProps) {
  const amazonLink = generateAmazonLink(game.name);
  const [imageSrc, setImageSrc] = useState(
    game.background_image?.startsWith("http")
      ? game.background_image
      : "/placeholder.jpg"
  );

  return (
    <div className="p-4 border rounded-lg shadow hover:shadow-lg transition-transform transform hover:translate-y-[-5px]">
      {/* タイトル */}
      <h3 className="text-lg font-bold text-gray-900">{game.name}</h3>
      {/* リリース日 */}
      <p className="text-sm text-gray-600">
        リリース日: {game.released ?? "不明"}
      </p>
      {/* 背景画像 */}
      <div className="relative w-full h-48 my-4 overflow-hidden rounded-md">
        <Image
          src={imageSrc}
          alt={`Game cover of ${game.name}`}
          width={300} // 明示的なサイズ指定
          height={200}
          style={{ objectFit: "cover" }}
          className="rounded-md"
          onLoadingComplete={(result) => {
            if (result.naturalWidth === 0) {
              setImageSrc("/placeholder.jpg"); // 画像ロード失敗時に代替画像を設定
            }
          }}
        />
      </div>
      {/* ジャンル */}
      <p className="text-sm font-bold text-blue-500">
        ジャンル:{" "}
        {game.genres?.length
          ? game.genres.map((g) => g.name).join(", ")
          : "不明"}
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
          className="inline-block mt-2 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition"
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
