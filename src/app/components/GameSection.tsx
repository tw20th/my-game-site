import GameCard from "@/app/components/GameCard";
import { Game } from "@/types/Game";

interface GameSectionProps {
  title: string;
  games: Game[];
  loading: boolean;
  onLoadMore?: () => void;
}

const GameSection = ({
  title,
  games,
  loading,
  onLoadMore,
}: GameSectionProps) => {
  return (
    <section className="mb-8" aria-label={`${title}セクション`}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {games.length === 0 && !loading ? (
        <p className="text-gray-600 text-center">
          該当するゲームが見つかりませんでした。
        </p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          {onLoadMore && games.length > 0 && (
            <div className="text-center mt-4">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <button
                  onClick={onLoadMore}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  もっと見る
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default GameSection; // ✅ `export default` に変更
