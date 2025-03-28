import React from "react";
import SliderComponent from "../components/SliderComponent/SliderComponent";
import MoviesSection from "../components/MovieListComponent/MoviesSection";
import PromotionSectionComponent from "../components/PromotionSectionComponent/PromotionSection";

const HomePage = () => {
  return (
    <div className="mt-[80px] w-full flex items-center flex-col bg-gradient-to-br from-black via-black to-[#4f111e]">
      <SliderComponent />
      <MoviesSection />
      <PromotionSectionComponent/>
    </div>
  );
};

export default HomePage;
