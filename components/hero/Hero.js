// @flow
import * as React from "react";
import styled from "styled-components";

import Content from "./Content";
import SearchAction from "./SearchAction";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: "image" "content";
  grid-template-rows: 0.8fr 1fr;
  place-items: center;
  @media (min-width: 500px) {
    grid-template-rows: 1fr 1fr;
  }
  @media (min-width: 600px) {
    grid-template-rows: 1.2fr 1fr;
  }
  @media (min-width: 740px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 510px 86px;
    grid-template-areas: "content image" "search-action search-action";
  }

  @media (min-width: 1440px) {
    grid-template-rows: 700px 86px;
  }
`;

const Image = styled.div`
  grid-area: image;
  background: url(/static/images/dubai-hero.jpg);
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
`;

const ContentWrapper = styled.div`
  margin-top: 24px;
  display: grid;
  grid-area: content;
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
    <Image />
    <SearchActionWrapper>
      <SearchAction />
    </SearchActionWrapper>
  </Wrapper>
);

export default Hero;
