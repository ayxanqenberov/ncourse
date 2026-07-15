import React from "react";
import Header from "../../Components/Header/Header";
import "../../App.css";
import Logo from "../../Components/Logo/Logo";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  return (
    <>
      <Header />
      <section className="w-full flex items-center justify-center register">
        <div className="bg-[#110d0d] py-2 text-white flex flex-col items-center  w-[60%]">
          <Logo />
          <div className="w-[90%] flex justify-between h-[400px]">
            <div className="w-[48%] flex flex-col gap-2">
              <span className="mb-3">Sign Up</span>
              <p className="text-[13px] text-[#9395B3] w-[70%]">
                By continuing you indicate that you agree to Ncourse’s{" "}
                <a className="text-[#4e86ff]" href="">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a className="text-[#4e86ff]" href="">
                  Privacy Policy
                </a>
                .
              </p>
              <button className="border flex items-center text-[14px] bottom-1 px-3 py-2 rounded-sm gap-1">
                <FcGoogle /> Continue with Google
              </button>
            </div>
            <span className="w-[1px] h-full bg-white text-white"></span>
            <div className="w-[48%]"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
