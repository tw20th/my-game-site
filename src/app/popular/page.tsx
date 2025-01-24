import { games } from "../data/games";

export default function PopularGames() {
  const popularGames = games.slice(0, 2); // ダミーデータの上位2つを人気ゲームとして表示

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">人気ゲーム</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {popularGames.map((game) => (
          <div key={game.id} className="p-4 border rounded shadow">
            <h3 className="font-bold">{game.title}</h3>
            <p className="text-sm text-gray-700">{game.description}</p>
            <p className="font-bold text-blue-500 mt-2">{game.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
