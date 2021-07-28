import React from 'react'

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.min.css'


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y,Autoplay]);


const SwiperJs = () => {
   return (
      <Swiper
         spaceBetween={50}
         slidesPerView={1}
         pagination={{ clickable: true }}
         onSlideChange={() => console.log('slide change')}
         onSwiper={(swiper) => console.log(swiper)}
         Autoplay
      >
         <SwiperSlide>
            <img src="https://picsum.photos/200/300" alt="Slider1" />
         </SwiperSlide>
         <SwiperSlide><img src="https://picsum.photos/400/300" alt="Slider2" /></SwiperSlide>
         <SwiperSlide><img src="https://picsum.photos/200/300" alt="Slider3" /></SwiperSlide>
         <SwiperSlide><img src="https://picsum.photos/200/300" alt="Slider4" /></SwiperSlide>
         ...
      </Swiper>
   )
}

export default SwiperJs
