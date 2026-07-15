import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Carousel1 = () => {
  const courses = [
    {
      title: "Digital Marketing Masterclass",
      category: "Marketing",
      desc: "Brend yaratmaq, reklam strategiyaları və müştəri qazanma üsullarını öyrən.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    },
    {
      title: "Modern Web Development",
      category: "Technology",
      desc: "Müasir texnologiyalar ilə professional layihələr hazırlamağı öyrən.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      title: "Creative Design Academy",
      category: "Design",
      desc: "UI/UX və kreativ dizayn bacarıqlarını inkişaf etdir.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    },
    {
      title: "Business & Leadership",
      category: "Business",
      desc: "Liderlik və biznes strategiyalarını öyrən.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
    },
  ];

  return (
    <section className="h-[450px] w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={2000}
        className="h-full w-full"
      >
        {courses.map((course, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full overflow-hidden">

              <img
                src={course.image}
                alt={course.title}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

              <div className="relative z-10 flex h-full flex-col justify-center px-10 md:px-20 text-white">

                <span className="mb-4 w-fit rounded-full bg-white/20 px-5 py-2 backdrop-blur-md">
                  {course.category}
                </span>

                <h1 className="max-w-3xl text-4xl font-bold md:text-6xl">
                  {course.title}
                </h1>

                <p className="mt-5 max-w-xl text-lg text-gray-200">
                  {course.desc}
                </p>

                <button className="mt-8 w-fit rounded-xl bg-white px-8 py-3 font-semibold text-black transition hover:scale-105">
                  Start Learning
                </button>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Carousel1;