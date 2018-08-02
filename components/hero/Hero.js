// @flow

import * as React from "react";
import styled from "styled-components";

import Content from "./Content";
import SearchAction from "./SearchAction";

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
    grid-template-rows: 510px 86px;
    grid-template-areas: "content image" "search-action search-action";
    margin-bottom: 0px;
  }

  @media (min-width: 1000px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 560px 86px;
    grid-template-areas: "content image" "search-action search-action";
    margin-bottom: 0px;
  }

  @media (min-width: 1440px) {
    grid-template-rows: 700px 86px;
  }
`;

const ImageWrapper = styled.div`
  place-self: end;
  grid-area: image;
  display: flex;
  flex-direction: column;
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
    object-position: 50% 10%;
  }
  @media (min-width: 1200px) {
    object-position: 50% 20%;
  }
  @media (min-width: 1440px) {
    object-position: 50% 20%;
  }
`;

const ContentWrapper = styled.div`
  margin-top: 24px;
  display: grid;
  grid-area: content;
  justify-self: center;
  justify-items: center;
`;

const SearchActionWrapper = styled.div`
  grid-area: search-action;
  display: none;

  @media (min-width: 740px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Hero = () => (
  <Wrapper>
    <ContentWrapper>
      <Content />
    </ContentWrapper>
    <ImageWrapper>
      <Image src="/static/images/dubai-hero.jpg" />
    </ImageWrapper>
    <SearchActionWrapper>
      <SearchAction />
    </SearchActionWrapper>
  </Wrapper>
);

export default Hero;
