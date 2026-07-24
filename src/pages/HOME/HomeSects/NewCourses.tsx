import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaGraduationCap } from "react-icons/fa"; // və ya istədiyiniz başqa icon

import {
  fetchCourses,
  toggleWishlist,
  selectCoursesLoading,
} from "../../../features/courseSlice";
import CourseCard from "../../../Components/CourseCard/CourseCard";

export const NewCourses: React.FC = () => {
  const dispatch = useDispatch<any>();

  const courses = useSelector((state: any) => state.courses.courses || []);
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

  const sortedCourses = [...courses].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (loading) {
    return (
      <h2 className="text-center py-10 text-gray-500">
        Loading new courses...
      </h2>
    );
  }

  return (
    <section id="newCourses" className="w-full py-16 bg-gray-50">
      <div className="mx-auto w-[90%]">
        <div className="mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <FaGraduationCap className="text-blue-600" /> New Courses
          </h2>
          <p className="text-gray-500">
            Recently published courses by instructors
          </p>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={sortedCourses.length > 3}
          spaceBetween={25}
          slidesPerView={4}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {sortedCourses.map((item) => (
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

export default NewCourses;