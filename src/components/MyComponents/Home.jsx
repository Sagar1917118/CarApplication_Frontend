import React, { Component, useEffect, useState } from "react";

import Navbar from "../Navbar/Navbar";
import Services from "../Services/Services";
import CarList from "./CarList";
import AppStoreBanner from "../AppStoreBanner/AppStoreBanner";
import Testimonial from "../Testimonial/Testimonial";
import Footer from "../Footer/Footer";
import HeroCarSearch from "./HeroCarSearch";
import BrowseByType from "./BrowseByType";
function Home({theme,setTheme}){
  return (
    <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
      {/* <Hero theme={theme} /> */}
      <HeroCarSearch theme={theme} setItem={setTheme}></HeroCarSearch>
      <BrowseByType theme={theme}></BrowseByType>
      <Services />
      <Testimonial />
      <AppStoreBanner />
      <Footer />
    </div>
)}
export default Home;