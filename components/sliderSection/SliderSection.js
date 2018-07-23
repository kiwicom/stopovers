// @flow

import * as React from "react";
import styled from "styled-components";
import Carousel from "nuka-carousel";

import Button from "../shared/Button";
import Title from "../shared/Title";
import Description from "../shared/Description";
import Br from "../shared/Br";

const Wrapper = styled.div`
  display: grid;
  padding: 45px 35px;
  grid-template-columns: 1fr;
  grid-template-areas: "slider" "description";
  justify-items: center;
  background-color: #f6f7f9;
  box-shadow: inset 6px 180px 10px -182px rgba(0, 0, 0, 0.31);

  @media (min-width: 770px) {
    justify-items: left;
    padding: 100px 65px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-template-rows: 1fr;
    grid-template-areas: "slider description";
  }
`;

const SliderWrapper = styled.div`
  grid-area: slider;

  width: 600px;
  @media (min-width: 770px) {
    padding-right: 30px;
    width: 100%;
  }
`;

const DescriptionWrapper = styled.div`
  grid-area: description;
  align-self: center;
  font-size: 30px;

  @media (min-width: 770px) {
    padding-left: 35px;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media (min-width: 770px) {
    justify-content: start;
  }
`;

const SliderSection = () => (
  <Wrapper>
    <SliderWrapper>
      <Carousel>
        <img src="static/images/carousel/carousel-first.jpg" alt="Carousel Dubai" />
        <img src="static/images/carousel/carousel-second.jpg" alt="Carousel Dubai" />
        <img src="static/images/carousel/carousel-third.jpg" alt="Carousel Dubai" />
        <img src="static/images/carousel/carousel-fourth.jpg" alt="Carousel Dubai" />
      </Carousel>
    </SliderWrapper>

    <DescriptionWrapper>
      <Title fontSize={38}>The Stopover</Title>
      <Description>
        When you book your flight to Asia via Dubai, you unlock a city<Br /> that can be exciting,
        cultured, gramourous, adventurous or relaxing.<Br />How you experience it is up to you.
      </Description>
      <ButtonsWrapper>
        <Button fontSize={16}>Search flights</Button>
        <Button fontSize={14} secondary>
          {"> Choose itinerary"}
        </Button>
      </ButtonsWrapper>
    </DescriptionWrapper>
  </Wrapper>
);

export default SliderSection;
