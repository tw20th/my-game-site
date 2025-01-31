"use client";

import { useEffect, useState } from "react";
import { Game } from "@/types/Game";
import SliderComponent from "@/app/components/SliderComponent";
import GameCard from "@/app/components/GameCard";
import { GameSection } from "@/app/components/GameSection";
import Pagination from "@/app/components/Pagination";
import SearchBar from "@/app/components/SearchBar";
import RecommendButton from "@/app/components/RecommendButton";
import { beginnerRecommendations } from "@/app/data/recommendations";

export function useFetchGames(pageSize = 10) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [games, setGames] = useState<Game[]>([]);
  const [trendingGames] = useState<Game[]>([]);
  const [topRatedGames] = useState<Game[]>([]);
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
    trendingGames,
    topRatedGames,
    page,
    setPage,
    loading,
    error,
    recommendation,
    fetchRecommendation,
  };
}

export default function Home() {
  const {
    games,
    trendingGames,
    topRatedGames,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    loading,
    error,
    recommendation,
    fetchRecommendation,
  } = useFetchGames();

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold text-red-500">Error: {error}</p>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      {/* スライダーセクション */}
      <SliderComponent />

      {/* 検索バー */}
      <SearchBar setSearchQuery={setSearchQuery} />

      {/* トレンドゲーム */}
      <GameSection
        title="トレンドゲーム"
        games={trendingGames}
        loading={loading}
        onLoadMore={() => {}}
      />

      {/* 高評価ゲーム */}
      <GameSection
        title="高評価ゲーム"
        games={topRatedGames}
        loading={loading}
        onLoadMore={() => {}}
      />

      {/* 初心者向けおすすめ */}
      <GameSection
        title="初心者向けおすすめ"
        games={beginnerRecommendations} // 別ファイルからインポート
        loading={false}
        onLoadMore={() => {}}
      />

      {/* 検索結果 */}
      {searchQuery && (
        <GameSection
          title={`検索結果: "${searchQuery}"`}
          games={games}
          loading={loading}
          onLoadMore={() => setPage(page + 1)}
        />
      )}

      <div className="mt-8">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </section>
        <Pagination page={page} setPage={setPage} />
      </div>

      {/* おすすめセクション */}
      <div className="mb-4">
        <RecommendButton fetchRecommendation={fetchRecommendation} />
      </div>
      {recommendation && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold">おすすめゲーム</h2>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
}
