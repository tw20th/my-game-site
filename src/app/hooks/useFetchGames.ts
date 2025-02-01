import { useEffect, useState, useMemo } from "react";
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

  // 🔹 検索機能
  useEffect(() => {
    async function loadSearchedGames() {
      if (!searchQuery) return;

      try {
        setLoading(true);
        console.log(`🔍 検索中: ${searchQuery}`);
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${searchQuery}&page_size=${pageSize}`
        );
        if (!response.ok) throw new Error("検索データの取得に失敗しました");

        const data = await response.json();
        setGames(data.results);
      } catch (err) {
        console.error("🔴 検索エラー:", err);
        setError("検索に失敗しました");
      } finally {
        setLoading(false);
      }
    }

    loadSearchedGames();
  }, [searchQuery, pageSize]);

  // 🔹 ページネーション
  useEffect(() => {
    if (searchQuery) return; // 検索中はページネーションを無効化

    const abortController = new AbortController();

    async function loadPagedGames() {
      try {
        setLoading(true);
        console.log(`📜 ページ ${page} のデータを取得中`);
        const data = await fetchGames(page, pageSize);
        if (!abortController.signal.aborted) {
          setGames((prevGames) =>
            page === 1 ? data : [...prevGames, ...data]
          );
        }
      } catch (err) {
        console.error("🔴 ページデータ取得エラー:", err);
        setError("ページデータの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    }

    loadPagedGames();

    return () => abortController.abort();
  }, [page, pageSize, searchQuery]);

  // 🔹 初期データの取得
  useEffect(() => {
    async function loadGames() {
      try {
        console.log("🚀 初期データを取得中...");
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

        console.log("🎮 初期データ取得完了");
      } catch (err) {
        console.error("🔴 初期データ取得エラー:", err);
        setError("初期データの取得に失敗しました");
      }
    }

    loadGames();
  }, []);

  // 🔹 おすすめゲーム取得
  const fetchRecommendation = async (userPreferences: string) => {
    try {
      console.log("🔍 おすすめゲームを取得中...");
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPreferences }),
      });
      if (!response.ok) throw new Error("おすすめデータの取得に失敗しました");

      const data = await response.json();
      setRecommendation(data.recommendation);
      console.log("🎯 おすすめ取得結果:", data.recommendation);
    } catch (err) {
      console.error("🔴 おすすめ取得エラー:", err);
      setError("おすすめの取得に失敗しました");
    }
  };

  return useMemo(
    () => ({
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
      recommendation,
      fetchRecommendation,
    }),
    [
      searchQuery,
      games,
      rpgGames,
      actionGames,
      topRatedGames,
      trendingGames,
      newReleases,
      page,
      loading,
      error,
      recommendation,
    ]
  );
}
