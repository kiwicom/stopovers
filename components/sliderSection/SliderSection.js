// @flow

import * as React from "react";
import styled from "styled-components";

import Slider from './Slider';

const Title = styled.h2`
  color: #48505C;
  font-size: 50px;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
`;

const Text = styled.p`
  color: #48505C;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  text-align: center;
  
  @media (min-width: 770px) {
    font-size: 26px;
    text-align: left;
  }
`;

const Button = Text.withComponent('button');

const TransparentButton = Button.extend`
  font-weight: 400;
  border:none;
  background: transparent;
`;

const Layout = styled.div`
  display: grid;
  padding: 45px 35px;
  grid-template-columns: 1fr;
  grid-template-areas: "slider" "description";
  background-color: #F6F7F9;

  @media (min-width: 770px) {
    padding: 100px 65px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-template-areas: "slider description";
  }
`;

const SliderLayout = styled.div`
  grid-area: slider;
  
  @media (min-width: 770px) {
    padding-right: 50px;
  }
`;

const StopoverDescription = styled.div`
  grid-area: description;
  align-self: center;
  font-size: 30px;
  
  @media (min-width: 770px) {
    padding-left: 50px;
  }
`;

const SliderSection = () => (
  <Layout>
    <SliderLayout>
      <img src="static/images/carousel/carousel-first.jpg" style={{width: '100%'}}/>
      {/* <Slider />*/}
    </SliderLayout>

    <StopoverDescription>
      <Title>The Stopover</Title>
      <Text>
        When you book your flight to Asia via Dubai, you unlock a city<br /> that can be exciting,
        cultured, gramourous, adventurous or relaxing.<br />How you experience it is up to you.
      </Text>
      <button>Search flights</button>
      <TransparentButton>> Choose itinerary</TransparentButton>
    </StopoverDescription>
  </Layout>
);

export default SliderSection;
