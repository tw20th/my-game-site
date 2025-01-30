import Image from "next/image";

type GameMainImageProps = {
  backgroundImage?: string | null;
  gameName: string;
};

export default function GameMainImage({
  backgroundImage,
  gameName,
}: GameMainImageProps) {
  return (
    <div className="relative w-full h-60 mb-4">
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt={`Game cover of ${gameName}`}
          layout="fill"
          objectFit="cover"
          className="rounded"
          priority={true}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
    </div>
  );
}
