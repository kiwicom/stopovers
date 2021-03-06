// @flow

import * as React from "react";
import { Consumer as IntlConsumer } from "@kiwicom/nitro/lib/services/intl/context";
import styled, { keyframes } from "styled-components";
import {
  CarouselProvider,
  Slider as Carousel,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
  Image,
} from "pure-react-carousel";
import { ChevronRight, ChevronLeft } from "@kiwicom/orbit-components/lib/icons";

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledProvider = styled(CarouselProvider)`
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledCarousel = styled(Carousel)`
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: flex-end;
`;

const StyledSlide = styled(Slide)`
  width: 100%;
  float: left;
  position: relative;
  display: block;
  box-sizing: border-box;
  margin: 0;
  list-style-type: none;
  padding: 0 !important;

  .carousel__inner-slide {
    height: 100%;
  }
`;

const StyledImage = styled(Image)`
  display: block;
  width: 100%;
  height: 100%;
`;

const getButtonStyles = (direction: "left" | "right") => `
  cursor: pointer;
  color: #46515e;
  background-color: #f5f7f9;
  border: none;
  opacity: 0.9;
  border-radius: 3px;
  margin: 0;
  position: relative;
  ${direction}: 38px;
  z-index: 1;
  margin-${direction}: -40px;
  padding: 4px;
`;

const StyledButtonBack = styled(ButtonBack)`
  ${getButtonStyles("left")};
`;

const StyledButtonNext = styled(ButtonNext)`
  ${getButtonStyles("right")};
`;

const StyledDotGroup = styled(DotGroup)`
  height: 58px;
  display: flex;
  flex-direction: row;
  place-self: center;
  align-items: center;

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
`;

const spin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(1turn);
    }
`;

const SliderWrapper = styled.div`
  width: 100%;

  .carousel__master-spinner-container {
    display: flex;
    align-items: center;
    height: 470px;

    @media (min-width: 750px) {
      height: 200px;
    }

    @media (min-width: 1440px) {
      height: 440px;
    }
  }

  .carousel__slider-tray {
    margin: 0;
    padding: 0;
    position: relative;
    display: flex;
    transition: transform 0.5s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    will-change: transform;
  }

  .carousel__spinner {
    position: relative;
    width: 30px;
    height: 30px;
    animation: ${spin} 1s linear infinite;
    border-width: 4px;
    border-style: solid;
    border-top-color: #000;
    border-right-color: #a9a9a9;
    border-bottom-color: #a9a9a9;
    border-left-color: #a9a9a9;
    border-radius: 30px;
  }

  @media (min-width: 740px) {
    max-width: calc(50% - 75px);
  }

  @media (min-width: 800px) {
    max-width: calc(50% - 25px);
  }
`;

export type Props = {|
  sliderImages: $ReadOnlyArray<{|
    +id: string,
    +url: string,
  |}>,
|};

const Slider = ({ sliderImages }: Props) => (
  <SliderWrapper>
    <StyledProvider
      naturalSlideWidth={856}
      naturalSlideHeight={470}
      totalSlides={sliderImages.length}
      className="provider"
      hasMasterSpinner
    >
      <CarouselWrapper>
        <StyledButtonBack className="back">
          <ChevronLeft size="large" />
        </StyledButtonBack>
        <StyledCarousel className="slider">
          <IntlConsumer>
            {intl =>
              sliderImages.map((image, index) => {
                const alt = intl.translate(`sliderPhotos.${image.id}.alt`);
                const title = intl.translate(`sliderPhotos.${image.id}.title`);
                const defaultDesc = `Slide ${intl.translate("name")} ${index + 1}`;
                const validate = (text: string) => (/sliderPhotos/.test(text) ? defaultDesc : text);
                return (
                  <StyledSlide index={index} key={image.id}>
                    <StyledImage
                      src={`${image.url}?w=840`}
                      title={validate(title)}
                      alt={validate(alt)}
                    />
                  </StyledSlide>
                );
              })
            }
          </IntlConsumer>
        </StyledCarousel>

        <StyledButtonNext className="next">
          <ChevronRight size="large" />
        </StyledButtonNext>
      </CarouselWrapper>
      <StyledDotGroup />
    </StyledProvider>
  </SliderWrapper>
);

export default Slider;
