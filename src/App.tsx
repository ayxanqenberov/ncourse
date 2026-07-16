import React from "react";
import Home from "./pages/HOME/Home";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/REGISTER/Login";
import Ads from "./Components/Ads/AdsSroll";
import Profile from "./pages/PROFILE/Profile";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
