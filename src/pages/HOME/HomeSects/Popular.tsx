import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { TbChartBarPopular } from "react-icons/tb";
import { fetchCourses, selectPopularCourses, selectCoursesLoading } from "../../../features/courseSlice";
import { CourseCard, CourseItem } from "../../../Components/CourseCard/CourseCard";
export const Popular: React.FC = () => {
  const dispatch = useDispatch<any>();
  const courses = useSelector(selectPopularCourses);
  const loading = useSelector(selectCoursesLoading);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading) return <h2 className="text-center py-10">Loading courses...</h2>;

  return (
    <section className="w-full py-16">
      <div className="mx-auto w-[90%]">
        <h2 className="text-3xl font-bold flex items-center gap-2 mb-8">
          <TbChartBarPopular /> Popular Courses
        </h2>

        <Swiper modules={[Navigation]} navigation={courses.length > 3} spaceBetween={25} slidesPerView={4}>
          {courses.map((item: CourseItem) => (
            <SwiperSlide key={item.id}>
              <CourseCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};