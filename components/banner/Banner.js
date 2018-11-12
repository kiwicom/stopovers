// @flow

import * as React from "react";
import styled from "styled-components";
import { AirplaneRight, Search } from "@kiwicom/orbit-components/lib/icons";
import Text from "@kiwicom/nitro/lib/components/Text";
import { Button } from "@kiwicom/orbit-components";
import { Link } from "react-scroll";

import { scrollToElement } from "../helpers";
import { sendEvent } from "../../etc/logLady";

const Wrapper = styled.div`
  display: ${({ isHidden }) => (isHidden ? "none" : "flex")};
  place-items: center;
  position: fixed;
  left: 0px;
  bottom: 0px;
  height: 60px;
  width: 100%;
  background-color: white;
  box-shadow: 0 -2px 4px 0 rgba(23, 27, 30, 0.1);
  z-index: 5;

  @media (min-width: 740px) {
    display: none;
  }

  & > * {
    display: flex;
    justify-content: center;
  }
`;

const StyledAirplaneRight = styled(AirplaneRight)`
  flex: 0 0 55px;
`;

const BannerTitle = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #171b1e;
  flex: 1;
`;

const ButtonWrapper = styled.div`
  flex: 0 0 76px;
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
    sendEvent("mobileBannerSearch");
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
      <Wrapper isHidden={isHidden}>
        <StyledAirplaneRight customColor="bac7d5" />
        <BannerTitle>
          <Text t="stickyBannerText" />
        </BannerTitle>
        <ButtonWrapper>
          <Button icon={<Search />} onClick={this.scrollToSearch} />
        </ButtonWrapper>
        <Link style={{ display: "none" }} to="partners" onSetActive={this.show} spy />
        <Link style={{ display: "none" }} to="video" onSetActive={this.hide} spy />
      </Wrapper>
    );
  }
}

export default Banner;
