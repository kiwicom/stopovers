// @flow
import * as React from "react";
import styled from "styled-components";

import Content from "./Content";
import SearchAction from "./SearchAction";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: minmax(700px, 1fr) 76px;
  grid-template-areas: "content image" "search-action search-action";
`;

const Image = styled.div`
  grid-area: image;
  background: url(/static/dubai-hero.jpg) center center no-repeat;
  background-size: 100% 100%;
`;

const ContentWrapper = styled.div`
  padding-left: 152px;
  grid-area: content;
  align-self: center;
`;

const SearchActionWrapper = styled.div`
  grid-area: search-action;
  display: flex;
  justify-content: center;
  align-items: center;
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
