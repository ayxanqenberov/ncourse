import React from 'react'
import Header from '../../Components/Header/Header'
import AdsSroll from '../../Components/Ads/AdsSroll'
import Carousel1 from '../../Components/Carousels/Carousel1'
import FirstSect from './HomeSects/FirstSect'

const Home = () => {
  return (
    <>
     <Header/> 
     <AdsSroll/>
     <Carousel1/>
     <FirstSect/>
    </>
  )
}

export default Home
