import React from "react";
import { FaRegHeart, FaStar, FaShoppingCart } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const FirstSect = () => {
  const courses = [
    {
      id: 1,
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/053/733/179/small/every-detail-of-a-sleek-modern-car-captured-in-close-up-photo.jpg",
      title: "Modern Car Design",
      author: "John Smith",
      category: "Design",
      rating: 4.8,
      students: 5000,
      price: 10,
    },
    {
      id: 2,
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/053/733/179/small/every-detail-of-a-sleek-modern-car-captured-in-close-up-photo.jpg",
      title: "Auto Engineering",
      author: "David Lee",
      category: "Engineering",
      rating: 4.9,
      students: 3200,
      price: 15,
    },
    {
      id: 3,
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/053/733/179/small/every-detail-of-a-sleek-modern-car-captured-in-close-up-photo.jpg",
      title: "Creative Design",
      author: "Alex",
      category: "Design",
      rating: 4.7,
      students: 2000,
      price: 20,
    },
    {
      id: 4,
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/053/733/179/small/every-detail-of-a-sleek-modern-car-captured-in-close-up-photo.jpg",
      title: "Business Course",
      author: "Emma",
      category: "Business",
      rating: 5,
      students: 8000,
      price: 25,
    },
    {
      id: 5,
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/053/733/179/small/every-detail-of-a-sleek-modern-car-captured-in-close-up-photo.jpg",
      title: "Business Course",
      author: "Emma",
      category: "Business",
      rating: 5,
      students: 8000,
      price: 25,
    },
  ];

  return (
    <section id="popularCourses" className="w-full py-16">
      <div className="mx-auto w-[90%]">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Popular Courses</h2>

          <p className="text-gray-500">
            Explore our most popular learning programs
          </p>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={courses.length > 3}
          spaceBetween={25}
          slidesPerView={4}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {courses.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="
                  rounded-2xl 
                  shadow-lg 

                  border
                "
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                        h-[180px]
                        w-full
                        object-cover
                      "
                  />

                  <button
                    className="
                        absolute
                        right-4
                        top-4
                        rounded-full
                        bg-black
                        text-white
                        p-3
                        shadow
                        hover:text-red-500
                      "
                  >
                    <FaRegHeart />
                  </button>
                </div>

                <div className="p-5">
                  <span
                    className="
                      rounded-full
                      bg-blue-100
                      px-3
                      py-1
                      text-sm
                      text-blue-600
                    "
                  >
                    {item.category}
                  </span>

                  <h3
                    className="
                      mt-3
                      text-xl
                      font-bold
                    "
                  >
                    {item.title}
                  </h3>

                  <p className="text-gray-500 mt-1">{item.author}</p>

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      gap-3
                      text-sm
                    "
                  >
                    <span className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      {item.rating}
                    </span>

                    <span>{item.students} students</span>
                  </div>

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <span
                      className="
                        text-2xl
                        font-bold
                      "
                    >
                      ${item.price}
                    </span>
                    
                    <div>
                      <button
                      className="
                          flex
                          items-center
                          gap-2
                          rounded-xl
                          bg-black
                          px-4
                          py-2
                          text-white
                          hover:bg-gray-800
                        "
                    >
                      <FaShoppingCart />
                      Add
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FirstSect;
