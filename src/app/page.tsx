"use client";

import SliderComponent from "@/app/components/SliderComponent";
import GameCard from "@/app/components/GameCard";
import { GameSection } from "@/app/components/GameSection";
import Pagination from "@/app/components/Pagination";
import { useFetchGames } from "@/app/hooks/useFetchGames";

export default function Home() {
  const {
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
  } = useFetchGames();

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold text-red-500">Error: {error}</p>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <SliderComponent />

      {/* 各セクションの描画 */}
      <GameSection
        title="新作ゲーム"
        games={newReleases}
        loading={loading}
        onLoadMore={() => setPage(page + 1)}
      />
      <GameSection
        title="高評価ゲーム"
        games={topRatedGames}
        loading={loading}
        onLoadMore={() => setPage(page + 1)}
      />
      <GameSection
        title="おすすめRPGゲーム"
        games={rpgGames}
        loading={loading}
        onLoadMore={() => setPage(page + 1)}
      />
      <GameSection
        title="おすすめアクションゲーム"
        games={actionGames}
        loading={loading}
        onLoadMore={() => setPage(page + 1)}
      />
      <GameSection
        title="週間人気ゲーム"
        games={trendingGames}
        loading={loading}
        onLoadMore={() => setPage(page + 1)}
      />

      {/* ページネーション */}
      <div className="mt-8">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </section>
        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  );
}
