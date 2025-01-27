import { fetchGameById } from "../../services/fetchGameById";
import Image from "next/image";
import { notFound } from "next/navigation";

type Genre = {
  id: number;
  name: string;
};

type Game = {
  id: number;
  name: string;
  background_image: string | null;
  released: string;
  genres: Genre[];
  description?: string;
};

type Props = {
  params: {
    id: string;
  };
};

export default async function GameDetail({ params }: Props) {
  const game: Game | null = await fetchGameById(params.id); // IDに基づいてゲームデータを取得

  if (!game) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
      <div className="relative w-full h-60 mb-4">
        {game.background_image ? (
          <Image
            src={game.background_image}
            alt={`Game cover of ${game.name}`}
            layout="fill"
            objectFit="cover"
            className="rounded"
            priority={true}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
      </div>
      <p className="text-gray-700">リリース日: {game.released}</p>
      <p className="font-bold mt-2">
        ジャンル: {game.genres.map((genre: Genre) => genre.name).join(", ")}
      </p>
      <p className="mt-4">{game.description || "説明がありません。"}</p>
      <div className="flex flex-wrap gap-4 mt-4">
        {/* RAWGリンク */}
        <a
          href={`https://rawg.io/games/${game.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          RAWGで詳しく見る
        </a>
        {/* 楽天アフィリエイトリンク */}
        <a
          href={`https://affiliate.rakuten.co.jp/link?ITEM_ID=XXXXXX`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded shadow-lg hover:shadow-xl transition"
        >
          楽天で購入
        </a>
      </div>
    </div>
  );
}
