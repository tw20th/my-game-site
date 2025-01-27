"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Game = {
  id: number;
  name: string;
  genres: { id: number; name: string }[];
  background_image: string | null;
  released: string;
};

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1); // ページ番号
  const [searchTerm, setSearchTerm] = useState(""); // 検索キーワード
  const [genre, setGenre] = useState("All"); // ジャンルフィルタ
  const [sortOption, setSortOption] = useState("default"); // ソートオプション
  const [loading, setLoading] = useState(false); // ローディング状態
  const [error, setError] = useState<string | null>(null);

  const pageSize = 10; // 1ページあたりのゲーム数

  useEffect(() => {
    async function fetchGames() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page=${page}&page_size=${pageSize}`
        );
        if (!response.ok) {
          throw new Error("ゲームデータの取得に失敗しました");
        }
        const data = await response.json();
        setGames(data.results); // ゲームデータをセット
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("予期しないエラーが発生しました");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, [page]);

  // フィルタリング
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre =
      genre === "All" || game.genres.some((g) => g.name === genre);
    return matchesSearch && matchesGenre;
  });

  // ソート
  const sortedGames = [...filteredGames].sort((a, b) => {
    if (sortOption === "release-date-asc") {
      return new Date(a.released).getTime() - new Date(b.released).getTime(); // 古い順
    }
    if (sortOption === "release-date-desc") {
      return new Date(b.released).getTime() - new Date(a.released).getTime(); // 新しい順
    }
    if (sortOption === "title-asc") {
      return a.name.localeCompare(b.name); // アルファベット順
    }
    if (sortOption === "title-desc") {
      return b.name.localeCompare(a.name); // 逆アルファベット順
    }
    return 0; // デフォルト（そのまま）
  });

  // ローディング中やエラー時の表示
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <header className="text-center py-4 border-b border-gray-300">
        <h1 className="text-3xl font-bold">My Game Site</h1>
        <p className="text-gray-600">Discover and Explore the Best Games!</p>
        <div className="mt-4 flex justify-center items-center space-x-4">
          <input
            type="text"
            placeholder="ゲームを検索"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-full max-w-md"
          />
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="All">すべてのジャンル</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="RPG">RPG</option>
            <option value="Shooter">Shooter</option>
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="default">デフォルト</option>
            <option value="release-date-asc">リリース日（古い順）</option>
            <option value="release-date-desc">リリース日（新しい順）</option>
            <option value="title-asc">タイトル（A-Z）</option>
            <option value="title-desc">タイトル（Z-A）</option>
          </select>
        </div>
      </header>

      <main className="mt-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">検索結果</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedGames.map((game) => (
              <div key={game.id} className="p-4 border rounded shadow">
                <h3 className="font-bold text-lg">{game.name}</h3>
                <p className="text-sm text-gray-500">
                  リリース日: {game.released}
                </p>
                {game.background_image && (
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={game.background_image}
                      alt={`Game cover of ${game.name}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                )}
                <p className="text-sm font-bold text-blue-500">
                  ジャンル: {game.genres.map((g) => g.name).join(", ")}
                </p>
                {/* 楽天アフィリエイトリンク */}
                <a
                  href={`https://search.rakuten.co.jp/search/mall/${encodeURIComponent(
                    game.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  楽天で購入
                </a>
              </div>
            ))}
          </div>
        </section>
        {/* ページネーション */}
        <div className="flex flex-wrap justify-center items-center mt-8 gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
            disabled={page === 1}
          >
            前へ
          </button>
          <span className="px-4 py-2">{page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 text-black rounded"
          >
            次へ
          </button>
        </div>
      </main>
    </div>
  );
}
