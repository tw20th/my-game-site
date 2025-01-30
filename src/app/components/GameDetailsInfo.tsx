type Genre = {
  id: number;
  name: string;
};

type GameDetailsInfoProps = {
  description: string;
  rating: number;
  platforms: string[];
  genres: Genre[];
  released: string;
};

export default function GameDetailsInfo({
  description,
  rating,
  platforms,
  genres,
  released,
}: GameDetailsInfoProps) {
  return (
    <div className="mb-8">
      <p className="text-lg">{description || "説明がありません。"}</p>
      <p className="text-xl font-bold mt-4">評価スコア: {rating}/5</p>
      <p className="text-md text-gray-600">
        対応プラットフォーム: {platforms.join(", ")}
      </p>
      <p className="font-bold mt-2">
        ジャンル: {genres.map((genre) => genre.name).join(", ")}
      </p>
      <p className="text-gray-700 mt-2">リリース日: {released}</p>
    </div>
  );
}
