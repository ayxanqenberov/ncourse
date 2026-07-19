import { FaRegHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../features/courseSlice";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
const CourseCard = ({ item, getEmbedUrl, addWishList }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const rawCategory = item.category || item.categories || item.tags;
  let categoriesArray: string[] = [];
  if (Array.isArray(rawCategory)) {
    categoriesArray = rawCategory;
  } else if (typeof rawCategory === "string") {
    categoriesArray = rawCategory.split(",").map((c) => c.trim());
  }
  const visibleCategories = categoriesArray.slice(0, 2);
  const hiddenCategories = categoriesArray.slice(2);

  return (
    <div className="rounded-2xl shadow-lg border bg-white overflow-hidden transition-all duration-300">
      <div className="relative h-[200px] shrink-0">
        <iframe
          src={getEmbedUrl(item.videoUrl)}
          title={item.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full rounded-t-2xl"
        ></iframe>
        <button
          onClick={() => addWishList(item.id)}
          className="absolute right-4 top-4 rounded-full bg-black text-white p-3 shadow hover:text-red-500"
        >
          <FaRegHeart />
        </button>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-1.5 items-center transition-all duration-300">
          {visibleCategories.map((cat, index) => (
            <span
              key={index}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600 max-w-[120px] truncate inline-block"
            >
              {cat}
            </span>
          ))}

          {hiddenCategories.length > 0 && !isExpanded && (
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="rounded-full bg-gray-100 hover:bg-gray-200 px-2.5 py-1 text-xs text-gray-600 font-semibold transition-colors duration-200"
            >
              +{hiddenCategories.length}
            </button>
          )}
          <div
            className={`w-full flex flex-wrap gap-1.5 transition-all duration-300 overflow-hidden ${
              isExpanded ? "max-h-24 mt-2 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {hiddenCategories.map((cat, index) => (
              <span
                key={index}
                className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-600 max-w-[120px] truncate inline-block"
              >
                {cat}
              </span>
            ))}

            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-xs text-red-500 hover:underline ml-auto font-medium"
            >
              Hide
            </button>
          </div>
        </div>
        <h3 className="mt-3 text-xl font-bold">{item.title}</h3>

        <p className="text-gray-500 mt-1">{item.author || "Instructor"}</p>

        <div className="mt-4 flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            {item.rating || 5.0}
          </span>
          <span>{item.views || 0} views</span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-bold">${item.price}</span>
          <div>
            <button className="flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-white hover:bg-gray-800">
              <FaShoppingCart />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const FirstSect = () => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const addWishList = (courseId) => {
    
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtube.com/embed/")) return url;

    let videoId = "";
    if (url.includes("v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };
  if (loading) {
    return (
      <h2 className="text-center text-gray-500 py-10">Loading courses...</h2>
    );
  }

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
          navigation={courses && courses.length > 3}
          spaceBetween={25}
          slidesPerView={4}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {courses &&
            courses.map((item) => (
              <SwiperSlide key={item.id}>
                <CourseCard
                  item={item}
                  getEmbedUrl={getEmbedUrl}
                  addWishList={addWishList}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FirstSect;