import { notFound } from "next/navigation";
import GameScreenshots from "@/app/components/GameScreenshots";
import GameMainImage from "@/app/components/GameMainImage";
import GameDetailsInfo from "@/app/components/GameDetailsInfo";
import GameLinks from "@/app/components/GameLinks";
import { fetchGameById } from "@/services/fetchGameById"; // 修正: 正しいパスからインポート
import { Game } from "@/types/Game"; // 型を統一してインポート

export default async function GameDetails({
  params,
}: {
  params: { id: string };
}) {
  try {
    const game: Game = await fetchGameById(params.id); // fetchGameById を呼び出す

    if (!game) {
      return notFound();
    }

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
        <GameScreenshots screenshots={game.screenshots} gameName={game.name} />
        <GameMainImage
          backgroundImage={game.background_image}
          gameName={game.name}
        />
        <GameDetailsInfo
          description={game.description}
          rating={game.rating}
          platforms={game.platforms}
          genres={game.genres}
          released={game.released}
        />
        <GameLinks gameId={game.id} gameName={game.name} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch game details:", error);
    return notFound(); // エラーハンドリングとして 404 を返す
  }
}
