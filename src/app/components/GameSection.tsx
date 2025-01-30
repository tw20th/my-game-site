import { useState, useEffect } from "react";
import GameCard from "@/app/components/GameCard";
import { Game } from "@/types/Game";
import {
  fetchGamesByGenre,
  fetchTopRatedGames,
  fetchTrendingGames,
  fetchNewReleases,
} from "@/services";
import { fetchGames } from "@/utils/fetchGames";

export function GameSection({
  title,
  games,
  loading,
  onLoadMore,
}: {
  title: string;
  games: Game[];
  loading: boolean;
  onLoadMore: () => void;
}) {
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
        </div>
      )}
    </section>
  );
}

export function useFetchGames(pageSize = 10) {
  const [games, setGames] = useState<Game[]>([]);
  const [rpgGames, setRpgGames] = useState<Game[]>([]);
  const [actionGames, setActionGames] = useState<Game[]>([]);
  const [topRatedGames, setTopRatedGames] = useState<Game[]>([]);
  const [trendingGames, setTrendingGames] = useState<Game[]>([]);
  const [newReleases, setNewReleases] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadPagedGames() {
      try {
        setLoading(true);
        const data = await fetchGames(page, pageSize);
        if (!abortController.signal.aborted) {
          setGames((prevGames) => [...prevGames, ...data]);
        }
      } catch (err: unknown) {
        if (!abortController.signal.aborted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPagedGames();

    return () => abortController.abort();
  }, [page, pageSize]);

  useEffect(() => {
    async function loadGames() {
      try {
        const [rpg, action, topRated, trending, newGames] = await Promise.all([
          fetchGamesByGenre("rpg"),
          fetchGamesByGenre("action"),
          fetchTopRatedGames(),
          fetchTrendingGames(),
          fetchNewReleases(),
        ]);
        setRpgGames(rpg);
        setActionGames(action);
        setTopRatedGames(topRated);
        setTrendingGames(trending);
        setNewReleases(newGames);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    }

    loadGames();
  }, []);

  return {
    games,
    rpgGames,
    actionGames,
    topRatedGames,
    trendingGames,
    newReleases,
    page,
    setPage,
    loading,
    error,
  };
}
