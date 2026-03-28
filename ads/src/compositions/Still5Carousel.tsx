import React from "react";
import { CAROUSEL_CARDS } from "../brand";
import { CarouselCardScene } from "../components/scenes";

export const CarouselSlide: React.FC<{ index: number }> = ({ index }) => {
  return (
    <CarouselCardScene
      card={CAROUSEL_CARDS[index]}
      cardIndex={index}
      totalCards={5}
    />
  );
};
