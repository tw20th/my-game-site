"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchGames } from "./services/fetchGames";

type Game = {
  id: number;
  name: string;
  genres: { id: number; name: string }[];
  background_image: string | null;
  released: string;
};

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("All");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGames() {
      try {
        const fetchedGames = await fetchGames();
        setGames(fetchedGames);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("予期しないエラーが発生しました");
        }
      }
    }
    loadGames();
  }, []);

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre =
      genre === "All" || game.genres.some((g) => g.name === genre);
    return matchesSearch && matchesGenre;
  });

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <header className="text-center py-4 border-b border-gray-300">
        <h1 className="text-3xl font-bold">My Game Site</h1>
        <p className="text-gray-600">Discover and Explore the Best Games!</p>
        <div className="mt-4">
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
            className="p-2 border rounded ml-4"
          >
            <option value="All">すべてのジャンル</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="RPG">RPG</option>
            <option value="Shooter">Shooter</option>
          </select>
        </div>
      </header>

      <main className="mt-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">検索結果</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGames.map((game) => (
              <div key={game.id} className="p-4 border rounded shadow">
                {game.background_image && (
                  <Image
                    src={game.background_image}
                    alt={`Game cover of ${game.name}`}
                    width={400}
                    height={200}
                    className="object-cover rounded mb-4"
                  />
                )}
                <h3 className="font-bold">{game.name}</h3>
                <p className="text-sm text-gray-700">
                  リリース日: {game.released}
                </p>
                <p className="font-bold text-blue-500 mt-2">
                  ジャンル: {game.genres.map((g) => g.name).join(", ")}
                </p>
                <Link
                  href={`/games/${game.id}`}
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  詳細を見る
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
