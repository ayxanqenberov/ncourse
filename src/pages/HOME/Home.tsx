import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Header from "../../Components/Header/Header";
import AdsSroll from "../../Components/Ads/AdsSroll";
import Carousel1 from "../../Components/Carousels/Carousel1";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import NewCourses from "./HomeSects/NewCourses";
import { Popular } from "./HomeSects/Popular";
import { BestCourse } from "./HomeSects/BestCourse";



const Home = () => {

  const location = useLocation();

  const [successOpen, setSuccessOpen] = useState(false);


  useEffect(() => {

    if (location.state?.registerSuccess) {

      setSuccessOpen(true);
      window.history.replaceState({}, document.title);

    }

  }, [location]);


  return (
    <>
      <Header />

      <AdsSroll />

      <Carousel1 />

      <Popular />
      <NewCourses/>
      <BestCourse/>

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Alert
          onClose={() => setSuccessOpen(false)}
          severity="success"
          variant="filled"
        >
          Account created successfully 🎉
        </Alert>
      </Snackbar>
    </>
  );
};


export default Home;