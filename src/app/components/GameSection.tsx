import GameCard from "@/app/components/GameCard";
import { Game } from "@/types/Game";

type GameSectionProps = {
  title: string;
  games: Game[];
};

export default function GameSection({ title, games }: GameSectionProps) {
  return (
    <section className="mb-8" aria-label={`${title}セクション`}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {games.length === 0 ? (
        <p className="text-gray-600 text-center">
          該当するゲームが見つかりませんでした。
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </section>
  );
}
