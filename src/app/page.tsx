"use client";

import { useFetchGames } from "@/app/hooks/useFetchGames";
import Head from "next/head"; // 🔹 next/head を使用
import SliderComponent from "@/app/components/SliderComponent";
import { GameSection } from "@/app/components/GameSection";
import SearchBar from "@/app/components/SearchBar";
import RecommendButton from "@/app/components/RecommendButton";
import { beginnerRecommendations } from "@/app/data/recommendations";

export default function Home() {
  const {
    setSearchQuery,
    trendingGames,
    topRatedGames,
    recommendation,
    fetchRecommendation,
    loading,
  } = useFetchGames();

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.bunny.net/css?family=Roboto:400,700"
        />
      </Head>
      <div className="container mx-auto p-4">
        <SliderComponent />
        <SearchBar setSearchQuery={setSearchQuery} />
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
        <GameSection
          title="初心者向けおすすめ"
          games={beginnerRecommendations}
          loading={false}
          onLoadMore={() => {}}
        />

        {/* おすすめボタン */}
        <div className="mt-8">
          {fetchRecommendation && (
            <RecommendButton fetchRecommendation={fetchRecommendation} />
          )}
          {recommendation && (
            <div className="bg-gray-100 p-4 rounded shadow mt-4">
              <h2 className="text-xl font-bold">おすすめゲーム</h2>
              <p>{recommendation}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
