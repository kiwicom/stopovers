// @flow

import * as React from "react";
import styled from "styled-components";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
  Image,
} from "pure-react-carousel";
// $FlowFixMe
import { ChevronRight, ChevronLeft } from "@kiwicom/orbit-components/lib/icons";

import Button from "../shared/Button";
import Description from "../shared/Description";
import Br from "../shared/Br";
import { scrollToElement } from "../helpers";

const Wrapper = styled.div`
  display: grid;
  padding: 45px 35px;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto-fit, 1fr);
  justify-items: center;
  background-color: #f6f7f9;
  box-shadow: inset 6px 180px 10px -182px rgba(0, 0, 0, 0.31);

  @media (min-width: 740px) {
    justify-items: left;
    padding: 100px 65px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-template-rows: 1fr;
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  .provider {
    margin-bottom: 26px;
  }
  .slider {
    position: relative;
    overflow: hidden;
  }
  .next {
    cursor: pointer;

    color: #46515e;
    background-color: #f5f7f9;
    border: none;
    opacity: 0.9;
    border-radius: 3px;
    padding: 0;
    margin: 0;
    position: relative;
    right: 2.5em;
    z-index: 1;
  }
  .back {
    cursor: pointer;
    color: #46515e;
    background-color: #f5f7f9;
    border: none;
    opacity: 0.9;
    border-radius: 3px;
    padding: 0;
    margin: 0;
    position: relative;
    left: 2.5em;
    z-index: 1;
  }
  .dots {
    margin-top: 21px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .carousel__dot {
    cursor: pointer;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #bac7d5;
    border: none;
    padding: 0;
    margin: 0;
    &:not(:last-child) {
      margin-right: 16px;
    }
  }
  .carousel__dot--selected {
    background-color: #00a991;
    width: 16px;
    height: 16px;
  }
  .carousel__image {
    display: block;
    width: 100%;
    height: 100%;
  }

  .carousel__slide {
    float: left;
    position: relative;
    display: block;
    box-sizing: border-box;
    height: 0;
    margin: 0;
    list-style-type: none;
  }

  .carousel__slider-tray {
    transition: transform 0.5s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    will-change: transform;
  }

  .carousel__spinner {
    position: absolute;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
    width: 30px;
    height: 30px;
    animation-name: a;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    border-width: 4px;
    border-style: solid;
    border-top-color: #000;
    border-right-color: #a9a9a9;
    border-bottom-color: #a9a9a9;
    border-left-color: #a9a9a9;
    border-radius: 30px;
  }
`;

const SliderGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DescriptionWrapper = styled.div`
  align-self: center;
  font-size: 30px;

  @media (min-width: 740px) {
    padding-left: 35px;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media (min-width: 740px) {
    justify-content: start;
  }
`;

const Title = styled.h2`
  font-size: 48px;
  line-height: 1.2;
  font-weight: 300;
  color: #46515e;
  margin-bottom: 16px;
  text-align: center;

  @media (min-width: 740px) {
    text-align: left;
  }
`;

const images = [
  {
    url: "static/images/carousel/carousel-first.jpg",
    title: "Slide Dubai 1",
  },
  {
    url: "static/images/carousel/carousel-second.jpg",
    title: "Slide Dubai 2",
  },
  {
    url: "static/images/carousel/carousel-third.jpg",
    title: "Slide Dubai 3",
  },
  {
    url: "static/images/carousel/carousel-fourth.jpg",
    title: "Slide Dubai 4",
  },
];

const SliderSection = () => (
  <Wrapper>
    <SliderWrapper>
      <CarouselProvider
        naturalSlideWidth={606}
        naturalSlideHeight={400}
        totalSlides={images.length}
        hasMasterSpinner
        className="provider"
      >
        <SliderGroup>
          <ButtonBack className="back">
            <ChevronLeft size="large" />
          </ButtonBack>
          <Slider className="slider">
            {images.map((image, index) => (
              <Slide index={index} key={image.title}>
                <Image src={image.url} alt={image.title} />
              </Slide>
            ))}
          </Slider>

          <ButtonNext className="next">
            <ChevronRight size="large" />
          </ButtonNext>
        </SliderGroup>
        <DotGroup className="dots" />
      </CarouselProvider>
    </SliderWrapper>
    <DescriptionWrapper>
      <Title>The Stopover</Title>
      <Description>
        When you book your flights via Dubai, you unlock a city<Br /> that can be exciting,
        cultured, gramourous, adventurous or relaxing.<Br />How you experience it is up to you.
      </Description>
      <ButtonsWrapper>
        <Button fontSize={16} onClick={() => scrollToElement("search")}>
          Search flights
        </Button>
        <Button fontSize={14} secondary onClick={() => scrollToElement("itinerary")}>
          {"> Choose itinerary"}
        </Button>
      </ButtonsWrapper>
    </DescriptionWrapper>
  </Wrapper>
);

export default SliderSection;
