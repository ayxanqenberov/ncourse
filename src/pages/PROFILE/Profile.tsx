import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoArrowBack } from "react-icons/io5";
import { PiCoinsLight } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import {
  TbBasket,
  TbBookUpload,
  TbChartBar,
  TbEye,
  TbHeart,
} from "react-icons/tb";
import { MdFavorite } from "react-icons/md";

import type { User } from "../../types/userType";
import { getUserById, updateUserProfile } from "../../services/authService";

import { addCourse, fetchCourses } from "../../features/courseSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";

const Profile = () => {
  const dispatch = useAppDispatch();

  const { courses, loading } = useAppSelector((state) => state.courses);

  const [user, setUser] = useState<User | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [level, setLevel] = useState<"Beginner" | "Intermediate" | "Advanced">(
    "Beginner",
  );
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const addCategory = () => {
    const value = categoryInput.trim();

    if (!value) return;

    if (categories.includes(value)) return;

    if (categories.length >= 3) return;

    setCategories([...categories, value]);
    setCategoryInput("");
  };

  const removeCategory = (category: string) => {
    setCategories(categories.filter((item) => item !== category));
  };
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const data = await getUserById(userId);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();

    dispatch(fetchCourses());
  }, [dispatch, userId]);

  if (!user) {
    return <h2 className="text-center text-white py-10">Loading...</h2>;
  }

  const myCourses = courses.filter((course) => course.userId === user.id);

  const totalViews = myCourses.reduce(
    (total, course) => total + course.views,
    0,
  );

  const totalLikes = myCourses.reduce(
    (total, course) => total + course.likes.length,
    0,
  );

  const totalRevenue = myCourses.reduce(
    (total, course) => total + course.price,
    0,
  );

  const handleSwitchToProfessional = async () => {
    if (!userId) return;

    try {
      await updateUserProfile(userId, {
        isProfessional: true,
      });

      setUser({
        ...user,
        isProfessional: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !videoUrl ||
      categories.length === 0 ||
      !price
    ) {
      return;
    }

    dispatch(
      addCourse({
        userId: user.id,
        title,
        description,
        videoUrl,
        categories,
        level,
        price: Number(price),
        views: 0,
        likes: [],
        createdAt: new Date().toISOString(),
      }),
    );

    setTitle("");
    setDescription("");
    setVideoUrl("");
    setCategory('');
    setLevel("Beginner");
    setPrice("");
  };
  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };
  return (
    <section className="min-h-screen bg-[#0f0f0f] text-white py-12">
      <div className="mb-8 flex justify-between items-center mx-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-300 hover:text-white duration-200"
        >
          <IoArrowBack size={20} />
          Back
        </button>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-red-600/20"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-8">
        <div className="bg-[#1b1b1b] rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src={
                user.avatar ||
                `https://ui-avatars.com/api/?name=${user.name}&background=2563eb&color=fff&size=200`
              }
              alt={user.name}
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-600"
            />

            <div className="flex-1">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h1 className="text-4xl font-bold">{user.name}</h1>
                  <p className="text-gray-400 text-lg">@{user.username}</p>
                </div>
                {!user.isProfessional ? (
                  <button
                    onClick={handleSwitchToProfessional}
                    className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg duration-200 font-medium text-sm"
                  >
                    Switch to Professional
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-lg flex items-center justify-center gap-[2px]">
                      <PiCoinsLight />
                      {`0`}
                    </span>
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-2 rounded-lg font-medium text-sm shadow-md shadow-blue-500/20">
                      ★ Professional Account
                    </span>
                  </div>
                )}
              </div>

              <p className="text-gray-300 mt-5">
                {user.bio || "No bio added yet."}
              </p>

              <div className="flex gap-10 mt-8">
                <div>
                  <h3 className="text-2xl font-bold">
                    {user.followers?.length || 0}
                  </h3>
                  <p className="text-gray-400">Followers</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    {user.following?.length || 0}
                  </h3>
                  <p className="text-gray-400">Following</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1b1b1b] rounded-xl p-6">
            <h2 className="text-xl flex items-center gap-1 font-semibold">
              {" "}
              <MdFavorite className="text-red-500" /> Favorite Courses
            </h2>
            <p className="text-4xl font-bold mt-5">
              {user.favoriteCourses?.length || 0}
            </p>
          </div>

          <div className="bg-[#1b1b1b] rounded-xl p-6">
            <h2 className="text-xl flex items-center gap-1 font-semibold">
              <TbBasket className="text-blue-500" />
              Basket
            </h2>
            <p className="text-4xl font-bold mt-5">
              {user.basket?.length || 0}
            </p>
          </div>
        </div>
        {user.isProfessional && (
          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            <div className="bg-[#1b1b1b] rounded-2xl p-6 border border-purple-500/20">
              <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
                <TbBookUpload className="text-green-500" />
                Create Course
              </h2>

              <form onSubmit={handleCreateCourse} className="space-y-3 ">
                <input
                  type="text"
                  placeholder="Course Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#0f0f0f] rounded-lg p-3 border border-gray-700"
                />

                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#0f0f0f] rounded-lg p-3 border border-gray-700 h-24 resize-none"
                />

                <input
                  type="text"
                  placeholder="Youtube Video URL"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full bg-[#0f0f0f] rounded-lg p-3 border border-gray-700"
                />

                <div>
                  <div className="flex w-full justify-between gap-2">
                    <input
                      type="text"
                      placeholder="Category"
                      value={categoryInput}
                      onChange={(e) => setCategoryInput(e.target.value)}
                      className="flex-1 bg-[#0f0f0f] rounded-lg p-3 border w-[70%] border-gray-700"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCategory();
                        }
                      }}
                    />

                    <button
                      type="button"
                      onClick={addCategory}
                      disabled={categories.length >= 3}
                      className="px-4 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Maximum 3 categories
                  </p>

                  <div className="flex flex-wrap gap-1 mt-3 mr-3">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center gap-2 bg-blue-600/20 border border-blue-600 px-3 py-1 rounded-full"
                      >
                        <span>{category}</span>

                        <button
                          type="button"
                          onClick={() => removeCategory(category)}
                          className="text-red-400 hover:text-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <select
                  value={level}
                  onChange={(e) =>
                    setLevel(
                      e.target.value as
                        | "Beginner"
                        | "Intermediate"
                        | "Advanced",
                    )
                  }
                  className="w-full bg-[#0f0f0f] rounded-lg p-3 border border-gray-700"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>

                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-[#0f0f0f] rounded-lg p-3 border border-gray-700"
                />

                <button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold">
                  Publish Course
                </button>
              </form>
            </div>
            <div className="lg:col-span-2 bg-[#1b1b1b] rounded-2xl p-6 border border-blue-500/20">
              <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
                <TbChartBar className="text-blue-500" />
                Course Analytics
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0f0f0f] rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Courses</p>
                  <h3 className="text-3xl font-bold">{myCourses.length}</h3>
                </div>

                <div className="bg-[#0f0f0f] rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Views</p>
                  <h3 className="text-3xl font-bold">{totalViews}</h3>
                </div>

                <div className="bg-[#0f0f0f] rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Likes</p>
                  <h3 className="text-3xl font-bold">{totalLikes}</h3>
                </div>

                <div className="bg-[#0f0f0f] rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Revenue</p>
                  <h3 className="text-3xl font-bold">${totalRevenue}</h3>
                </div>
              </div>

              <div className="space-y-3 max-h-[350px] overflow-y-auto">
                {myCourses.length === 0 ? (
                  <p className="text-center text-gray-500">
                    No courses published.
                  </p>
                ) : (
                  myCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-[#0f0f0f] rounded-xl p-4 flex gap-4 items-center"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold">{course.title}</h3>

                        <p className="text-xs text-gray-500 mt-1">
                          {course.category}
                        </p>

                        <div className="flex gap-4 mt-3 text-sm">
                          <span className="flex items-center gap-1">
                            <TbEye />
                            {course.views}
                          </span>

                          <span className="flex items-center gap-1">
                            <TbHeart />
                            {course.likes.length}
                          </span>

                          <span className="font-semibold text-green-400">
                            ${course.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
        <div className="bg-[#1b1b1b] rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-3 text-gray-300">
            <p>
              <span className="font-semibold text-white">Email:</span>{" "}
              {user.email}
            </p>
            <p>
              <span className="font-semibold text-white">Joined:</span>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
