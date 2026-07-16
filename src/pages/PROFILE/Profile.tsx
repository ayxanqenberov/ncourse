import React, { useEffect, useState } from "react";
import { getUserById } from "../../services/authService";
import type { User } from "../../types/userType";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { TbBasket } from "react-icons/tb";
import { MdFavorite  } from "react-icons/md";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem("userId");

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
  }, []);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="min-h-screen bg-[#0f0f0f] text-white py-12">
      <div className="mb-8 ml-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-300 hover:text-white duration-200"
        >
          <IoArrowBack size={20} />
          Back
        </button>
      </div>
      <div className="max-w-5xl mx-auto px-6">
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

                <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg duration-200">
                  Edit Profile
                </button>
              </div>

              <p className="text-gray-300 mt-5">
                {user.bio || "No bio added yet."}
              </p>

              <div className="flex gap-10 mt-8">
                <div>
                  <h3 className="text-2xl font-bold">
                    {user.followers.length}
                  </h3>

                  <p className="text-gray-400">Followers</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold">
                    {user.following.length}
                  </h3>

                  <p className="text-gray-400">Following</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-[#1b1b1b] rounded-xl p-6">
            <h2 className="text-xl flex items-center gap-1 font-semibold"> <MdFavorite /> Favorite Courses</h2>

            <p className="text-4xl font-bold mt-5">
                
              {user.favoriteCourses}
            </p>
          </div>

          <div className="bg-[#1b1b1b] rounded-xl p-6">
            <h2 className="text-xl flex items-center gap-1 font-semibold"><TbBasket />Basket</h2>

            <p className="text-4xl font-bold mt-5">
              {user.basket}
            </p>
          </div>
        </div>

        <div className="bg-[#1b1b1b] rounded-xl p-6 mt-8">
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
