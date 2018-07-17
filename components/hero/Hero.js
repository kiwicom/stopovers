// @flow
import * as React from "react";
import styled from "styled-components";

import Content from "./Content";
import SearchAction from "./SearchAction";

const Wrapper = styled.div`
  display: grid;
  padding: 0 0 0 152px;
  height: 100%;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-template-rows: 700px 76px;
  grid-template-areas: "Content Image " "SearchAction SearchAction";
`;

const Image = styled.img`
  width: 100%;
  max-height: 100%;
`;

const ImageWrapper = styled.div`
  grid-area: Image;
`;

const ContentWrapper = styled.div`
  padding-top: 155px;
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
