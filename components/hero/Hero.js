// @flow
import * as React from "react";
import styled from "styled-components";

import Content from "./Content";
import SearchAction from "./SearchAction";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: "image" "content";
  grid-template-rows: 1.3fr 1fr;

  @media (min-width: 770px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(700px, 1fr) 76px;
    grid-template-areas: "content image" "search-action search-action";
  }
`;

const Image = styled.div`
  grid-area: image;
  background: url(/static/dubai-hero.jpg) center center no-repeat;
  background-size: 100% 100%;
`;

const ContentWrapper = styled.div`
  grid-area: content;
  align-self: center;
  @media (min-width: 770px) {
    padding: 0 0 0 152px;
  }
`;

const SearchActionWrapper = styled.div`
  grid-area: search-action;
  display: none;
  @media (min-width: 770px) {
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
