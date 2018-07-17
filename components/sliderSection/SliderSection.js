// @flow

import * as React from "react";
import styled from "styled-components";

import Button from "../shared/Button";
import Title from "../shared/Title";
import Description from "../shared/Description";
import Br from "../shared/Br";

const Wrapper = styled.div`
  display: grid;
  padding: 45px 35px;
  grid-template-columns: 1fr;
  grid-template-areas: "slider" "description";
  background-color: #f6f7f9;
  box-shadow: inset 6px 180px 10px -182px rgba(0, 0, 0, 0.31);

  @media (min-width: 770px) {
    padding: 100px 65px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-template-areas: "slider description";
  }
`;

const SliderWrapper = styled.div`
  grid-area: slider;

  @media (min-width: 770px) {
    padding-right: 50px;
  }
`;

const DescriptionWrapper = styled.div`
  grid-area: description;
  align-self: center;
  font-size: 30px;

  @media (min-width: 770px) {
    padding-left: 50px;
  }
`;

const Image = styled.img`
  width: 100%;
`;

const SliderSection = () => (
  <Wrapper>
    <SliderWrapper>
      <Image src="static/images/carousel/carousel-first.jpg" alt="Dubai" />
    </SliderWrapper>

    <DescriptionWrapper>
      <Title fontSize={38}>The Stopover</Title>
      <Description>
        When you book your flight to Asia via Dubai, you unlock a city<Br /> that can be exciting,
        cultured, gramourous, adventurous or relaxing.<Br />How you experience it is up to you.
      </Description>
      <Button fontSize={16}>Search flights</Button>
      <Button fontSize={20} secondary>
        > Choose itinerary
      </Button>
    </DescriptionWrapper>
  </Wrapper>
);

export default SliderSection;
