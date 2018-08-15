// @flow

import * as React from "react";
import styled from "styled-components";

import Content from "./Content";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: "image" "content";
  grid-template-rows: 250px 1fr;
  place-items: center;
  margin-bottom: 35px;

  @media (min-width: 500px) {
    grid-template-rows: 320px 1fr;
  }

  @media (min-width: 600px) {
    grid-template-rows: 400px 1fr;
  }

  @media (min-width: 740px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 510px;
    grid-template-areas: "content image";
    margin-bottom: 9.5px;
  }

  @media (min-width: 1000px) {
    grid-template-rows: 560px;
  }

  @media (min-width: 1440px) {
    margin-bottom: 0;
    grid-template-rows: 700px;
  }
`;

const ImageWrapper = styled.div`
  place-self: end;
  grid-area: image;
  height: 100%;
`;

const Image = styled.img`
  object-fit: cover;
  object-position: 50% 40%;
  width: 100%;
  height: 100%;
  display: block;
  margin: 0 auto;
  @media (min-width: 740px) {
    object-position: 30% 10%;
  }
  @media (min-width: 1200px) {
    object-position: 30% 20%;
  }
  @media (min-width: 1440px) {
    object-position: 30% 20%;
  }
`;

const DubaiLogoWrapper = styled.div`
  position: relative;
  display: flex;
  top: -98px;
  flex-direction: column;
  align-items: flex-end;
  justify-items: flex-end;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(1, 1, 1, 0.6));
  padding: 9px 33px 26px;
`;

const DubaiLogo = styled.img`
  vertical-align: middle;
  opacity: 1;
`;

const ContentWrapper = styled.div`
  margin-top: 24px;
  display: grid;
  grid-area: content;
  justify-self: center;
  justify-items: center;
`;

const Hero = () => (
  <Wrapper>
    <ContentWrapper>
      <Content />
    </ContentWrapper>
    <ImageWrapper>
      <Image src="/static/images/dubai-hero.jpg" />
      <DubaiLogoWrapper>
        <DubaiLogo src="/static/images/dubai-logo.svg" alt="dubai logo" />
      </DubaiLogoWrapper>
    </ImageWrapper>
  </Wrapper>
);

export default Hero;
