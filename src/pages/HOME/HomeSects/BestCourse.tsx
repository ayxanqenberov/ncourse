import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaStar } from "react-icons/fa";

import {
  fetchCourses,
  toggleWishlist,
  selectBestCourses,
  selectCoursesLoading,
} from "../../../features/courseSlice";
import CourseCard from "../../../Components/CourseCard/CourseCard";

export const BestCourse: React.FC = () => {
  const dispatch = useDispatch<any>();
  const courses = useSelector(selectBestCourses); 
  const loading = useSelector(selectCoursesLoading);

  const currentUserId = "tRGg1Y156AM"; 

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleWishlistToggle = (courseId: string) => {
    if (!currentUserId) {
      alert("Xahiş olunur daxil olun!");
      return;
    }
    dispatch(toggleWishlist({ courseId, currentUserId }))
      .unwrap()
      .then(() => {
        dispatch(fetchCourses());
      });
  };

  if (loading) {
    return <h2 className="text-center py-10 text-gray-500">Loading best courses...</h2>;
  }

  return (
    <section id="bestCourses" className="w-full py-16 bg-gray-50">
      <div className="mx-auto w-[90%]">
        <div className="mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <FaStar className="text-yellow-500" /> Best Courses
          </h2>
          <p className="text-gray-500">
            Most wishlisted courses by students
          </p>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={courses.length > 3}
          spaceBetween={25}
          slidesPerView={4}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {courses.map((item) => (
            <SwiperSlide key={item.id} className="py-2">
              <CourseCard
                item={item}
                currentUserId={currentUserId}
                onWishlistToggle={handleWishlistToggle}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BestCourse;