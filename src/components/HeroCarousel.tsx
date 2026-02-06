import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const slides = [
  {
    image: heroBanner,
    caption: "Experimental Physics",
  },
  {
    image: heroBanner,
    caption: "Welcome back to a new session",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[320px] md:h-[450px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-naps-dark/30" />
          <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
            <span className="bg-naps-dark/60 text-primary-foreground font-heading text-xl md:text-3xl font-bold px-6 py-3">
              {slide.caption}
            </span>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground/30 text-primary-foreground flex items-center justify-center hover:bg-foreground/50 transition hidden md:flex"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground/30 text-primary-foreground flex items-center justify-center hover:bg-foreground/50 transition hidden md:flex"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === current ? "bg-primary-foreground" : "bg-primary-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
