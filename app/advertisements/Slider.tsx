"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css/pagination";
import "swiper/css";

const Slider = ({ images }: { images: string[] }) => {
  return (
    <Swiper
      loop
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="rounded-md"
    >
      {images.map((src: string) => (
        <SwiperSlide key={src}>
          <img src={src} className="object-cover aspect-square" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
