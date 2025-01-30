import Image from "next/image";

type Screenshot = {
  id: number;
  image: string;
};

type GameScreenshotsProps = {
  screenshots: Screenshot[];
  gameName: string;
};

export default function GameScreenshots({
  screenshots,
  gameName,
}: GameScreenshotsProps) {
  return (
    <>
      {screenshots?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {screenshots.map((screenshot) => (
            <div key={screenshot.id} className="relative w-full h-48">
              <Image
                src={screenshot.image}
                alt={`${gameName} screenshot`}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-8">
          スクリーンショットは利用できません。
        </p>
      )}
    </>
  );
}
