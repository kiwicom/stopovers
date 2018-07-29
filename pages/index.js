// @flow
import * as React from "react";
import { Element } from "react-scroll";

import Menu from "../components/menu/Menu";
import Hero from "../components/hero/Hero";
import SliderSection from "../components/sliderSection/SliderSection";
import Itinerary from "../components/itinerary/Itinerary";
import Partners from "../components/partners/Partners";
import Articles from "../components/articles/Articles";
import Video from "../components/video/Video";
import Search from "../components/search/Search";
import Footer from "../components/footer/Footer";
import Banner from "../components/banner/Banner";

const Index = () => (
  <>
    <Menu />
    <Hero />
    <SliderSection />
    <Element name="itinerary">
      <Itinerary />
    </Element>
    <Partners />
    <Articles />
    <Video />
    <Element name="search">
      <Search />
    </Element>
    <Footer />
    <Banner />
  </>
);

export default Index;
