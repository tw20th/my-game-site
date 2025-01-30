import Slider from "react-slick";
import Image from "next/image";
import { games } from "@/app/data/games"; // 静的データをインポート

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
};

export default function SliderComponent() {
  return (
    <section className="relative mb-8">
      <Slider {...sliderSettings}>
        {games.map((game) => (
          <div key={game.id} className="relative h-64 w-full">
            <Image
              src={game.image}
              alt={game.title}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent p-4">
              <h2 className="text-white text-xl font-bold">{game.title}</h2>
              <p className="text-white text-sm">{game.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
