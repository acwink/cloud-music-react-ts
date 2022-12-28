import React, { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import { SliderWrapper } from "./style";

interface ISliderProps {
  bannerList: any[];
}

const Slider = memo((props: ISliderProps) => {
  const { bannerList = [] } = props;

  return (
    <SliderWrapper>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
          >
            {bannerList.map((item, index) => (
              <SwiperSlide key={index}>
                <img
                  src={item.imageUrl}
                  width="100%"
                  height="100%"
                  alt="suggest"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderWrapper>
  );
});

export default Slider;
