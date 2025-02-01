"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "@/app/components/Navbar";
import SliderComponent from "@/app/components/SliderComponent";
import GameSection from "@/app/components/GameSection"; // ✅ `export default` を考慮して修正
import { useFetchGames } from "@/app/hooks/useFetchGames";
import { beginnerRecommendations } from "@/app/data/recommendations";
import { Game } from "@/types/Game"; // 型インポート

export default function Home() {
  const { setSearchQuery, trendingGames, topRatedGames, loading, error } =
    useFetchGames();

  const [showRecommendations, setShowRecommendations] = useState(false);
  const [displayedRecommendations, setDisplayedRecommendations] = useState<
    Game[]
  >([]);

  // おすすめセクションの更新
  useEffect(() => {
    if (showRecommendations) {
      const recommendations = trendingGames
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      setDisplayedRecommendations(recommendations);
    }
  }, [showRecommendations, trendingGames]);

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold text-red-500">Error: {error}</p>
      </div>
    );

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.bunny.net/css?family=Roboto:400,700"
        />
      </Head>

      <Navbar setSearchQuery={setSearchQuery} />

      <main className="container mx-auto p-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">
            初心者向けゲーム
          </h2>
          <SliderComponent games={beginnerRecommendations} />{" "}
          {/* ✅ 型エラー防止 */}
        </section>

        <div className="text-center mb-8">
          <button
            onClick={() => setShowRecommendations(true)}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition text-xl"
          >
            今のおすすめ
          </button>
        </div>

        {showRecommendations && (
          <GameSection
            title="今のおすすめゲーム"
            games={displayedRecommendations}
            loading={loading}
            onLoadMore={() => {}}
          />
        )}

        <GameSection
          title="トレンドゲーム"
          games={trendingGames}
          loading={loading}
          onLoadMore={() => {}}
        />

        <GameSection
          title="高評価ゲーム"
          games={topRatedGames}
          loading={loading}
          onLoadMore={() => {}}
        />
      </main>
    </>
  );
}
