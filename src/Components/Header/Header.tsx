import React from "react";
import { CiSearch } from "react-icons/ci";
import { SlBasket } from "react-icons/sl";
import "../../App.css";
import { useNavigate } from "react-router";
import Logo from "../Logo/Logo";
const Header = () => {
  const navigate = useNavigate()
  return (
    <header className="bg-[#171717] w-full items-center flex justify-center h-[60px] text-white">
      <div className="header flex items-center m-auto justify-between w-[70%]">
        <Logo/>
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
          <button className="h-[25px] hover:bg-[#2a262a] w-[28px] flex items-center justify-center rounded-[5px]">
            <SlBasket className=" cursor-pointer " />
          </button>
          <button onClick={()=>navigate(`/login`)} className="bg-[#232323] w-[60px] rounded-[5px] duration-200 hover:text-[#e3e3e3] hover:bg-[#2a262a] flex items-center justify-center">
            Log in
          </button>
          <button className="hover:bg-[#2a262a] w-[60px] rounded-[5px] hover:text-[#e3e3e3]">
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
