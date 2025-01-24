import Image from "next/image";
import { games } from "../../data/games";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default function GameDetail({ params }: Props) {
  const game = games.find((g) => g.id.toString() === params.id);

  if (!game) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{game.title}</h1>
      <div className="relative w-full h-60 mb-4">
        <Image
          src={game.image}
          alt={game.title}
          layout="fill"
          objectFit="cover"
          className="rounded"
          priority={true}
        />
      </div>
      <p className="text-gray-700 mb-4">{game.description}</p>
      <p className="font-bold text-blue-500 mb-4">価格: {game.price}</p>
      <a
        href={game.link}
        className="bg-blue-500 text-white px-4 py-2 rounded inline-block"
      >
        購入リンク
      </a>
    </div>
  );
}
