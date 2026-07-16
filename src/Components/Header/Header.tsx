import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { SlBasket } from "react-icons/sl";
import "../../App.css";
import { useNavigate } from "react-router";
import { LuCircleUser } from "react-icons/lu";
import Logo from "../Logo/Logo";

const Header = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    const checkUser = () => {
      setUserId(localStorage.getItem("userId"));
    };

    window.addEventListener("storage", checkUser);

    return () => window.removeEventListener("storage", checkUser);
  }, []);

  return (
    <header className="bg-[#171717] w-full items-center flex justify-center h-[60px] text-white">
      <div className="header flex items-center m-auto justify-between w-[70%]">
        <Logo />

        <nav>
          <ul className="flex gap-7">
            <li>
              <a className="hover:text-[#4e86ff] duration-200" href="">
                Courses
              </a>
            </li>

            <li>
              <a className="hover:text-[#4e86ff] duration-200" href="">
                Plus
              </a>
            </li>

            <li>
              <a className="hover:text-[#4e86ff] duration-200" href="">
                Business
              </a>
            </li>
          </ul>
        </nav>

        <div className="w-[40%] bg-[#232323] py-[1.2px] pl-4 hover:bg-[#5C5C5C] duration-200 rounded-md flex items-center">
          <CiSearch />

          <input
            className="w-full bg-transparent pl-1 outline-none"
            placeholder="Search for courses"
            type="text"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="h-[25px] hover:text-blue-700 transition-colors text-xl w-[28px] flex items-center justify-center rounded-[5px]">
            <SlBasket className="cursor-pointer" />
          </button>

          {userId ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/profile")}
                className="text-white text-xl w-full px-3 rounded-[5px] duration-200 hover:text-blue-700 transition-colors"
              >
                <LuCircleUser />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-[#232323] w-[85px] rounded-[5px] duration-200 hover:text-[#f5f0f0] hover:bg-[#3a353a] flex items-center justify-center"
            >
              Register
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
