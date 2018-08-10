// @flow

import * as React from "react";
import styled from "styled-components";
import { AirplaneRight, Search } from "@kiwicom/orbit-components/lib/icons";
import Text from "@kiwicom/nitro/lib/components/Text";
import { Button } from "@kiwicom/orbit-components";

import { scrollToElement } from "../helpers";

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
  z-index: 5;
`;

const BannerTitle = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #171b1e;
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
        <BannerTitle>
          <Text t="bannerTitle" />
        </BannerTitle>
        <Button icon={<Search />} onClick={this.scrollToSearch} />
      </Wrapper>
    ) : null;
  }
}

export default Banner;
