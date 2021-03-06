// @flow

import * as React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";

import SearchAction from "./SearchAction";

const SearchActionWrapper = styled.div`
  display: none;

  @media (min-width: 740px) {
    display: ${({ isHidden }) => (isHidden ? "none" : "flex")};
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

type State = {
  isHidden: boolean,
};

class StickyAction extends React.Component<{}, State> {
  state = {
    isHidden: false,
  };

  hide = () => {
    this.setState({ isHidden: true });
  };

  show = () => {
    this.setState({ isHidden: false });
  };

  render() {
    const { isHidden } = this.state;
    return (
      <SearchActionWrapper isHidden={isHidden}>
        <SearchAction />
        <Link style={{ display: "none" }} to="articles" onSetActive={this.show} spy />
        <Link style={{ display: "none" }} to="video" onSetActive={this.hide} spy />
      </SearchActionWrapper>
    );
  }
}

export default StickyAction;
