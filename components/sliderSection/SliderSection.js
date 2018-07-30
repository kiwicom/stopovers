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
import { ChevronRight, ChevronLeft } from "@kiwicom/orbit-components/lib/icons";

import Button, { Link } from "../shared/Button";
import SectionTitle from "../shared/SectionTitle";
import Description from "../shared/Description";
import { scrollToElement } from "../helpers";

const Wrapper = styled.div`
  display: grid;
  padding: 0 0 22px 0;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto-fit, 1fr);
  background-color: #f6f7f9;
  box-shadow: inset 6px 180px 10px -182px rgba(0, 0, 0, 0.31);

  @media (min-width: 740px) {
    padding: 0 25px 10px;
    grid-template-rows: 100px 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 25px;
  }

  @media (min-width: 1440px) {
    grid-template-rows: 0.7fr 0.55fr 1fr;
    justify-items: left;
    padding: 100px 65px 42px;
    grid-column-gap: 65px;
    align-items: center;
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  @media (min-width: 740px) {
    grid-row: 2 / 4;
  }
  @media (min-width: 1440px) {
    grid-row: 1 / 4;
  }
  .provider {
    display: grid;
    grid-template-columns: 0 1fr 0;
    grid-template-rows: 1fr 58px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .slider {
    position: relative;
    overflow: hidden;
    border-radius: 3px;
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
    right: 38px;
    z-index: 1;
    margin-right: -40px;
    padding: 4px;
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
    left: 38px;
    z-index: 1;
    margin-left: -40px;
    padding: 4px;
  }
  .dots {
    grid-column: 1/3;
    display: flex;
    flex-direction: row;
    place-self: center;
    align-items: center;
  }
  .carousel__dot {
    cursor: pointer;
    border-radius: 50%;
    background-color: #bac7d5;
    border: none;
    padding: 6px;
    margin: 0;
    &:not(:last-child) {
      margin-right: 16px;
    }
  }
  .carousel__dot--selected {
    background-color: #00a991;
    padding: 8px;
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
  @keyframes a {
    0% {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(1turn);
    }
  }
`;

const DescriptionWrapper = styled.div`
  align-self: center;
  justify-self: center;
  padding: 5px 30px 0;
  max-width: 520px;
  @media (min-width: 740px) {
    justify-self: start;
    padding: 0;
  }
  @media (min-width: 1440px) {
    order: 2;
    align-self: center;
  }
  > * {
    margin: 0;
  }
`;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 24px;
  grid-row-gap: 10px;
  align-items: center;
  justify-items: center;
  @media (min-width: 740px) {
    grid-row-gap: 20px;
    margin-top: 0;
    place-items: start;
    grid-template-columns: 145px 1fr;
  }
  @media (min-width: 1440px) {
    order: 3;
    place-self: start;
    margin-top: 20px;
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

const TitleWrapper = styled.div`
  @media (min-width: 740px) {
    grid-column: 1 / 3;
  }
  @media (min-width: 1440px) {
    grid-column: 2 / 3;
    order: 1;
    align-self: end;
  }
`;

const ButtonSrinked = styled(Button)`
  padding: 14px 16px;
`;

const SliderSection = () => (
  <Wrapper>
    <TitleWrapper>
      <SectionTitle title="The Stopover" resetPadding />
    </TitleWrapper>
    <SliderWrapper>
      <CarouselProvider
        naturalSlideWidth={606}
        naturalSlideHeight={400}
        totalSlides={images.length}
        hasMasterSpinner
        className="provider"
      >
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

        <DotGroup className="dots" />
      </CarouselProvider>
    </SliderWrapper>
    <DescriptionWrapper>
      <Description>
        When you book your flights via Dubai, you unlock a city that can be exciting, cultured,
        gramourous, adventurous or relaxing.How you experience it is up to you.
      </Description>
    </DescriptionWrapper>
    <ButtonsWrapper>
      <ButtonSrinked fontSize={16} onClick={() => scrollToElement("search")}>
        Search flights
      </ButtonSrinked>
      <Link onClick={() => scrollToElement("itinerary")}>Choose itinerary</Link>
    </ButtonsWrapper>
  </Wrapper>
);

export default SliderSection;
