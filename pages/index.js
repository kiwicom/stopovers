// @flow

import * as React from "react";
import styled from "styled-components";

import SliderSection from "../components/sliderSection/SliderSection";

const Title = styled.h1`
  color: blue;
  font-size: 50px;
`;

const Layout = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`;

const Index = () => (
  <Layout>
    <Title>Stopovers</Title>
    <SliderSection />
  </Layout>
);

export default Index;
