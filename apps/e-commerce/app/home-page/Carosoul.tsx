import React, { useState, useEffect } from "react";
import {
  FiEye,
  FiChevronLeft,
  FiChevronRight,
  FiPlay,
  FiShoppingBag,
  FiHeadphones,
} from "react-icons/fi";
import eletronicSBanner from "@/public/category_Image/eletronicSBanner.png";

// Define decoration types
type DecorationType =
  | "vr-headset"
  | "summer-beach"
  | "audio-waves"
  | "live-stream";

interface Button {
  text: string;
  icon?: any;
  variant: "white" | "outline";
}

interface Slide {
  title: string;
  description: string;
  buttons: Button[];
  background: string;
  decoration: DecorationType;
}

const slides: Slide[] = [
  {
    title: "Virtual Reality Showroom",
    description:
      "Experience our products in immersive 3D before you buy. Put on your VR headset and explore!",
    buttons: [
      {
        text: "View in VR",
        icon: <FiEye className="mr-2" />,
        variant: "white",
      },
      { text: "Learn More", variant: "outline" },
    ],
    background: "bg-gradient-to-r from-purple-600 to-blue-600",
    decoration: "vr-headset",
  },
  {
    title: "Summer Sale Live Now",
    description:
      "Get up to 50% off on selected items. Limited time offer, shop now before it's gone!",
    buttons: [
      {
        text: "Shop Deals",
        icon: <FiShoppingBag className="mr-2" />,
        variant: "white",
      },
      { text: "Browse All", variant: "outline" },
    ],
    background: "bg-gradient-to-r from-orange-500 to-pink-500",
    decoration: "summer-beach",
  },
  {
    title: "New Audio Collection",
    description:
      "Premium sound quality with our latest headphones and speakers. Hear the difference!",
    buttons: [
      {
        text: "Listen Now",
        icon: <FiHeadphones className="mr-2" />,
        variant: "white",
      },
      { text: "View Collection", variant: "outline" },
    ],
    background: "bg-gradient-to-r from-emerald-600 to-teal-500",
    decoration: "audio-waves",
  },
  {
    title: "Live Product Demos",
    description:
      "Watch our daily live streams showcasing product features and answering your questions.",
    buttons: [
      {
        text: "Watch Now",
        icon: <FiPlay className="mr-2" />,
        variant: "white",
      },
      { text: "See Schedule", variant: "outline" },
    ],
    background: "bg-gradient-to-r from-red-500 to-amber-500",
    decoration: "live-stream",
  },
];

const decorations: Record<DecorationType, any> = {
  "vr-headset": (
    <div className="absolute right-0 bottom-0 w-64 h-64 opacity-20">
      <div className="absolute inset-0 bg-[url('/category_Image/eletronicSBanner.png')] bg-contain bg-no-repeat bg-right-bottom"></div>
      {/* <div className="absolute inset-0 bg-[url('/demo/vr-pattern.svg')] bg-contain bg-no-repeat bg-right-bottom"></div> */}
    </div>
  ),
  "summer-beach": (
    <div className="absolute right-0 bottom-0 w-64 h-64 opacity-15">
      <div className="absolute inset-0 bg-[url('/category_Image/eletronicSBanner.png')] bg-contain bg-no-repeat bg-right-bottom"></div>
      {/* <div className="absolute inset-0 bg-[url('/demo/summer-pattern.svg')] bg-contain bg-no-repeat bg-right-bottom"></div> */}
    </div>
  ),
  "audio-waves": (
    <div className="absolute right-0 bottom-0 w-64 h-64 opacity-25">
      <div className="absolute inset-0 bg-[url('/category_Image/eletronicSBanner.png')] bg-contain bg-no-repeat bg-right-bottom"></div>
      {/* <div className="absolute inset-0 bg-[url('/demo/audio-pattern.svg')] bg-contain bg-no-repeat bg-right-bottom"></div> */}
    </div>
  ),
  "live-stream": (
    <div className="absolute right-0 bottom-0 w-64 h-64 opacity-15">
      <div className="absolute inset-0 bg-[url('/category_Image/eletronicSBanner.png')] bg-contain bg-no-repeat bg-right-bottom"></div>
      {/* <div className="absolute inset-0 bg-[url('/demo/live-pattern.svg')] bg-contain bg-no-repeat bg-right-bottom"></div> */}
    </div>
  ),
};

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="mx-auto px-3 sm:px-3 md:px-7 lg:px-9 relative group">
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <FiChevronRight className="w-6 h-6" />
      </button>

      <div className="relative h-[230px] sm:h-72 md:h-80 overflow-hidden rounded-lg sm:rounded-xl">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 ${
              slide.background
            } px-3 sm:px-8 text-white transition-opacity duration-500 flex items-center ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{ backgroundImage: "/category_Image/eletronicSBanner.png" }}
          >
            <div className="absolute inset-0 bg-black/20">
              {decorations[slide.decoration]}
            </div>

            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-4">
                {slide.title}
              </h2>
              <p className="text-[15px] sm:text-[17px] md:text-lg mb-6">
                {slide.description}
              </p>
              <div className="flex flex-wrap gap-4">
                {slide.buttons.map((button, btnIndex) => (
                  <button
                    key={btnIndex}
                    className={`px-6 py-1 text-sm sm:text-base sm:py-2 rounded-lg font-medium flex items-center transition-all ${
                      button.variant === "white"
                        ? "bg-white text-gray-900 hover:bg-gray-100"
                        : "bg-transparent border-2 border-white hover:bg-white hover:text-gray-900"
                    }`}
                  >
                    {button.icon}
                    {button.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={` w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-3 sm:w-5"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute bottom-4 right-4 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg"
        aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isAutoPlaying ? (
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-1 h-3 bg-gray-800 mx-0.5"></div>
            <div className="w-1 h-3 bg-gray-800 mx-0.5"></div>
          </div>
        ) : (
          <FiPlay className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
