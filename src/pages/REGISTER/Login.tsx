import React, { useRef, useState } from "react";
import Logo from "../../Components/Logo/Logo";
import { FcGoogle } from "react-icons/fc";
import { registerUser, getUserByEmail } from "../../services/authService";
import { useNavigate } from "react-router-dom";

import { registerSchema } from "../../validation/authSchema";

const Login = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    const validation = registerSchema.safeParse(registerData);

    if (!validation.success) {
      const error = validation.error.flatten().fieldErrors;

      setErrors({
        name: error.name?.[0] || "",
        email: error.email?.[0] || "",
        password: error.password?.[0] || "",
      });

      return;
    }

    setErrors({
      name: "",
      email: "",
      password: "",
    });

    const exist = await getUserByEmail(registerData.email);

    if (exist.length) {
      setErrors({
        name: "",
        email: "Email already exists",
        password: "",
      });

      return;
    }

    const newUser = await registerUser({
      name: registerData.name,
      username: registerData.name.toLowerCase(),
      email: registerData.email,
      password: registerData.password,

      avatar: "",
      bio: "",

      followers: [],
      following: [],

      favoriteCourses: [],
      basket: [],
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem("userId", newUser.id);

    navigate("/", {
      state: {
        registerSuccess: true,
      },
    });

    setRegisterData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleLogin = async () => {
    const users = await getUserByEmail(loginData.email);

    if (!users.length) {
      setErrors({
        name: "",
        email: "User not found",
        password: "",
      });

      return;
    }

    const user = users[0];

    if (user.password !== loginData.password) {
      setErrors({
        name: "",
        email: "",
        password: "Wrong password",
      });

      return;
    }

    localStorage.setItem("userId", user.id);

    navigate("/", {
      state: {
        loginSuccess: true,
      },
    });

    setLoginData({
      email: "",
      password: "",
    });
  };
  return (
    <>
      <div className="bg-black text-white flex items-center justify-center text-2xl font-semibold h-12 border-b border-gray-700">
        REGISTER
      </div>

      <section className="register min-h-screen flex items-center justify-center py-10">
        <div className="bg-[#121212] text-white rounded-xl shadow-2xl w-[90%] lg:w-[70%] overflow-hidden">
          <div className="flex justify-center py-6">
            <Logo />
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-10">
              <h2 className="text-3xl font-bold mb-2">Create Account</h2>

              <p className="text-sm text-gray-400 mb-6">
                Create your account to continue learning.
              </p>

              <button className="w-full flex items-center justify-center gap-3 border border-gray-600 rounded-lg py-3 hover:bg-white hover:text-black transition">
                <FcGoogle size={22} />
                Continue with Google
              </button>

              <div className="flex items-center my-6">
                <div className="flex-1 h-[1px] bg-gray-700" />

                <span className="mx-3 text-gray-500 text-sm">OR</span>

                <div className="flex-1 h-[1px] bg-gray-700" />
              </div>

              <div className="space-y-2">
                <input
                  ref={nameRef}
                  type="text"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  
                  placeholder="Full Name"
                  className="w-full bg-[#1e1e1e] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                />

                <p className="text-red-500 text-sm">{errors.name}</p>

                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  
                  placeholder="Email Address"
                  className="w-full bg-[#1e1e1e] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                />

                <p className="text-red-500 text-sm">{errors.email}</p>

                <input
                  ref={passwordRef}
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleRegister();
                    }
                  }}
                  placeholder="Password"
                  className="w-full bg-[#1e1e1e] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                />

                <p className="text-red-500 text-sm">{errors.password}</p>

                <button
                  onClick={handleRegister}
                  className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 font-semibold transition"
                >
                  Sign Up
                </button>
              </div>
            </div>

            <div className="hidden lg:block w-[1px] bg-gray-700" />

            <div className="w-full lg:w-1/2 p-10">
              <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>

              <p className="text-sm text-gray-400 mb-6">
                Login to access your account.
              </p>

              <button className="w-full flex items-center justify-center gap-3 border border-gray-600 rounded-lg py-3 hover:bg-white hover:text-black transition">
                <FcGoogle size={22} />
                Continue with Google
              </button>

              <div className="flex items-center my-6">
                <div className="flex-1 h-[1px] bg-gray-700"></div>

                <span className="mx-3 text-gray-500 text-sm">OR</span>

                <div className="flex-1 h-[1px] bg-gray-700"></div>
              </div>

              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Email Address"
                  className="w-full bg-[#1e1e1e] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                />

                <p className="text-red-500 text-sm">{errors.email}</p>

                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Password"
                  className="w-full bg-[#1e1e1e] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                />

                <p className="text-red-500 text-sm">{errors.password}</p>

                <div className="flex justify-end">
                  <button className="text-sm text-blue-400 hover:underline">
                    Forgot Password?
                  </button>
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full bg-green-600 hover:bg-green-700 rounded-lg py-3 font-semibold transition"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
