// @flow
import * as React from "react";
import styled from "styled-components";

import Hero from "../components/hero/Hero";
import SliderSection from "../components/sliderSection/SliderSection";
import Itinerary from "../components/itinerary/Itinerary";

const Layout = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`;

const Index = () => (
  <Layout>
    <Hero />
    <SliderSection />
    <Itinerary />
  </Layout>
);

export default Index;
