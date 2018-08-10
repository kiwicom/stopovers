// @flow

import * as React from "react";
import styled from "styled-components";

import SearchAction from "./SearchAction";

const SearchActionWrapper = styled.div`
  display: none;

  @media (min-width: 740px) {
    display: flex;
    position: sticky;
    top: 0;
    justify-content: center;
    align-items: center;
    z-index: 5;
    background-color: #fff;
    height: 76px;
    box-shadow: 0 2px 4px 0 rgba(23, 27, 30, 0.1);
  }
`;

const StickyAction = () => (
  <SearchActionWrapper>
    <SearchAction />
  </SearchActionWrapper>
);

export default StickyAction;
