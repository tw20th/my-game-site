"use client";

import { useEffect, useState } from "react";
import { Game } from "@/types/Game";

export function useFetchGames(pageSize = 10) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [games, setGames] = useState<Game[]>([]);
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
        console.error(err);
        setError(
          err instanceof Error ? err.message : "不明なエラーが発生しました"
        );
      } finally {
        setLoading(false);
      }
    }

    loadSearchedGames();
  }, [searchQuery, pageSize]);

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
    page,
    setPage,
    loading,
    error,
    recommendation,
    fetchRecommendation,
  };
}

export default function RecommendButton({
  fetchRecommendation,
}: {
  fetchRecommendation: (userPreferences: string) => Promise<void>;
}) {
  const handleClick = () => {
    fetchRecommendation("RPGとアクションが好き");
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      おすすめを取得
    </button>
  );
}
