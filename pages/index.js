// @flow
import * as React from "react";
import styled from "styled-components";
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

const Layout = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`;

const Index = () => (
  <Layout>
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
  </Layout>
);

export default Index;
