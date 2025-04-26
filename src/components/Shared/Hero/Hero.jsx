import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";

const Hero = () => {
  const heroData = [
    {
      title: "Make a Difference Today!",
      text: "Explore volunteering activities that match your interests and skills.",
    },
    {
      title: "Make a Difference Today!",
      text: "Explore volunteering activities that match your interests and skills.",
    },
    {
      title: "Make a Difference Today!",
      text: "Explore volunteering activities that match your interests and skills.",
    },
    {
      title: "Make a Difference Today!",
      text: "Explore volunteering activities that match your interests and skills.",
    },
  ];

  return (
    <section className="bg-white shadow-sm shadow-gray-300">
      <div className="max-w-[1336px] w-full mx-auto px-5 md:px-10">
        <div className="text-center py-20 md:py-32">
          <Swiper modules={[Scrollbar]} className="mySwiper">
            {heroData.map((item, id) => (
              <SwiperSlide key={id}>
                <h2 className="text-black font-bold text-4xl md:text-5xl lg:text-[60px] leading-[100%] mb-6 md:mb-8">
                  {item.title}
                </h2>
                <p className="text-black font-normal text-base md:text-lg leading-[27px]">
                  {item.text}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Hero;