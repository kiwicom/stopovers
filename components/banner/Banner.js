// @flow
import * as React from "react";
import styled from "styled-components";
import { AirplaneRight, Search } from "@kiwicom/orbit-components/lib/icons";

import { scrollToElement } from "../helpers";
import Button from "../shared/Button";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 55px 1fr 76px;
  place-items: center;
  position: fixed;
  left: 0px;
  bottom: 0px;
  height: 60px;
  width: 100%;
  background-color: white;
  box-shadow: 0 -2px 4px 0 rgba(23, 27, 30, 0.1);
  @media (min-width: 740px) {
    display: none;
  }
`;

const BannerTitle = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #171b1e;
`;

const SquaredButton = styled(Button)`
  padding: 10px;
`;

type State = {
  isHidden: boolean,
};

class Banner extends React.Component<{}, State> {
  state = {
    isHidden: false,
  };

  scrollToSearch = () => {
    scrollToElement("search", this.setState({ isHidden: true }));
  };

  render() {
    const { isHidden } = this.state;
    return !isHidden ? (
      <Wrapper>
        <AirplaneRight customColor="bac7d5" />
        <BannerTitle>Search for flights with a one-day stopover in Dubai</BannerTitle>
        <SquaredButton onClick={this.scrollToSearch}>
          <Search />
        </SquaredButton>
      </Wrapper>
    ) : null;
  }
}

export default Banner;
