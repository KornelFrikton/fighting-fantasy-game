import React, { useState } from "react";

import slide1 from "./pictures/howtoplay/Slide1.jpg";
import slide2 from "./pictures/howtoplay/Slide2.jpg";
import slide3 from "./pictures/howtoplay/Slide3.jpg";
import slide4 from "./pictures/howtoplay/Slide4.jpg";
import slide5 from "./pictures/howtoplay/Slide5.jpg";

const images = [slide1, slide2, slide3, slide4, slide5];

function HowToPlay({ isOpen, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!isOpen) return null;

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative w-full max-w-lg rounded-lg bg-stone-800 p-4">
        <button
          onClick={onClose}
          className="absolute right-3 top-1 text-3xl text-white hover:text-red-500"
        >
          &times;
        </button>

        <div className="flex flex-col items-center justify-center md:flex-row md:space-x-4">
          <button
            onClick={prevSlide}
            className="hidden rounded bg-green-600 px-4 py-2 font-bold uppercase tracking-wider hover:bg-green-800 md:block"
          >
            Prev
          </button>

          <img
            src={images[activeIndex]}
            alt={`Slide ${activeIndex + 1}`}
            className="max-h-[70vh] object-contain"
          />

          <button
            onClick={nextSlide}
            className="hidden rounded bg-green-600 px-4 py-2 font-bold uppercase tracking-wider hover:bg-green-800 md:block"
          >
            Next
          </button>
        </div>

        <div className="mt-4 flex justify-center space-x-4 md:hidden">
          <button
            onClick={prevSlide}
            className="rounded bg-green-600 px-4 py-2 font-bold uppercase tracking-wider hover:bg-green-800 md:block"
          >
            Prev
          </button>
          <button
            onClick={nextSlide}
            className="rounded bg-green-600 px-4 py-2 font-bold uppercase tracking-wider hover:bg-green-800 md:block"
          >
            Next
          </button>
        </div>

        <div className="mt-4 hidden justify-center space-x-2 md:flex">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-3 w-3 rounded-full ${
                activeIndex === idx ? "bg-blue-800" : "bg-white"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowToPlay;
