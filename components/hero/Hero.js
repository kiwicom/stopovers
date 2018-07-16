// @flow
import * as React from "react";
import styled from "styled-components";

import Content from "./Content";
import SearchAction from "./SearchAction";

const Wrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 700px 76px;
  grid-template-areas: "Content Image " "SearchAction SearchAction";
  font-family: Roboto, sans-serif;
`;

const Image = styled.img`
  width: 720px;
  height: 700px;
  position: relative;
  right: 0px;
  grid-area: Image;
  max-height: 100%;
`;

const ImageWrapper = styled.div`
  grid-area: Image;
  display: flex;
  justify-content: flex-end;
`;

const ContentWrapper = styled.div`
  padding-top: 155px;
  margin-left: 87px;
  grid-area: Content;
`;

const SearchActionWrapper = styled.div`
  grid-area: SearchAction;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Hero = () => (
  <Wrapper>
    <ContentWrapper>
      <Content />
    </ContentWrapper>
    <ImageWrapper>
      <Image src="/static/dubai-hero.jpg" alt="hero" />
    </ImageWrapper>
    <SearchActionWrapper>
      <SearchAction />
    </SearchActionWrapper>
  </Wrapper>
);

export default Hero;
