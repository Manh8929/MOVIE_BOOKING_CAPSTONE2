import React, { useState, useEffect } from "react";
import slider1 from "../../assets/img/slider/slider1.jpg";
import slider2 from "../../assets/img/slider/slider2.jpg";
import slider3 from "../../assets/img/slider/slider3.jpg";

const images = [slider1, slider2, slider3];

const SliderComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[500px] relative overflow-hidden">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default SliderComponent;
