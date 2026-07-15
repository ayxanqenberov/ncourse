import React from "react";
import Home from "./pages/HOME/Home";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/REGISTER/Login";
import Ads from "./Components/Ads/AdsSroll";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
