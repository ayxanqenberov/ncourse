// import React from "react";
import Home from "./pages/HOME/Home";
import "./index.css";
import { Route, Routes } from "react-router";
import Login from "./pages/REGISTER/Login";
// import Ads from "./Components/Ads/AdsSroll";
import Profile from "./pages/PROFILE/Profile";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default App;
