"use client";
import React, { ReactNode } from "react";
import Slider from "react-slick";

type Props = {
  children: ReactNode;
  settings?: object;
};

export default function CarouselContainer({ children, settings }: Props) {
  const config = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
    ...settings,
  };

  return <Slider {...config}>{children}</Slider>;
}