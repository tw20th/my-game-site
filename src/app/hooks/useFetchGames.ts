import { useEffect, useState } from "react";
import {
  fetchGamesByGenre,
  fetchTopRatedGames,
  fetchTrendingGames,
  fetchNewReleases,
} from "@/services";
import { fetchGames } from "@/utils/fetchGames";
import { Game } from "@/types/Game";

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
          setGames(Array.isArray(data) ? data : []);
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
