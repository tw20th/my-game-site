import Slider from "react-slick";
import Image from "next/image";
import { Game } from "@/types/Game";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
};

interface SliderComponentProps {
  games: Game[];
}

export default function SliderComponent({ games }: SliderComponentProps) {
  // ✅ 修正
  return (
    <section className="relative mb-8">
      <Slider {...sliderSettings}>
        {games.map((game) => (
          <div key={game.id} className="relative h-64 w-full">
            <Image
              src={game.background_image || "/placeholder.jpg"}
              alt={game.name}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent p-4">
              <h2 className="text-white text-xl font-bold">{game.name}</h2>
              <p className="text-white text-sm">{game.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
