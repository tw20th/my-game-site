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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [games, setGames] = useState<Game[]>([]);
  const [rpgGames, setRpgGames] = useState<Game[]>([]);
  const [actionGames, setActionGames] = useState<Game[]>([]);
  const [topRatedGames, setTopRatedGames] = useState<Game[]>([]);
  const [trendingGames, setTrendingGames] = useState<Game[]>([]);
  const [newReleases, setNewReleases] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  useEffect(() => {
    async function loadSearchedGames() {
      if (!searchQuery) return;

      try {
        setLoading(true);
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${searchQuery}&page_size=${pageSize}`
        );
        if (!response.ok) throw new Error("検索データの取得に失敗しました");

        const data = await response.json();
        setGames(data.results);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "不明なエラーが発生しました"
        );
      } finally {
        setLoading(false);
      }
    }

    loadSearchedGames();
  }, [searchQuery, pageSize]);

  useEffect(() => {
    if (searchQuery) return;

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
          setError(
            err instanceof Error ? err.message : "An unknown error occurred"
          );
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPagedGames();

    return () => abortController.abort();
  }, [page, pageSize, searchQuery]);

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
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    }

    loadGames();
  }, []);

  // 🔹 おすすめゲームを取得
  async function fetchRecommendation(userPreferences: string) {
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPreferences }),
      });
      const data = await response.json();
      setRecommendation(data.recommendation);
    } catch (err) {
      console.error(err);
      setError("おすすめの取得に失敗しました");
    }
  }

  return {
    searchQuery,
    setSearchQuery,
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
    recommendation, // 🔹 追加
    fetchRecommendation, // 🔹 追加
  };
}
