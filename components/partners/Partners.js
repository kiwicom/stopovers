// @flow

import * as React from "react";
import styled from "styled-components";
import { AirplaneDown } from "@kiwicom/orbit-components/lib/icons";

import SectionTitle from "../shared/SectionTitle";
import StyledText from "../shared/StyledText";

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 37px;
  align-items: center;
  padding: 0 16px 32px;

  @media only screen and (min-width: 740px) {
    padding: 0 136px 80px;
  }

  @media only screen and (min-width: 1440px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1.2fr 0;
    grid-column-gap: 120px;
    margin-bottom: 80px;
    padding: 30px 136px 0;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      height: calc(100%);
      width: 2px;
      background: #e8e8e8;
      margin-left: -2px;
    }
  }
`;

const Logos = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;

  @media only screen and (min-width: 740px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 80px;
    order: 1;
  }

  @media only screen and (min-width: 1440px) {
    grid-gap: 80px;
    order: 0;
    padding: 30px 0;
  }
`;

const Logo = styled.img`
  width: 225px;
  justify-self: center;

  @media only screen and (min-width: 1440px) {
    width: 225px;
  }
`;

const Content = styled.div`
  padding: 0 16px;
  text-align: center;

  @media only screen and (min-width: 1440px) {
    padding: 0 16px;
    text-align: left;
    padding: 30px 0;
  }
`;

const AirplaneWrapper = styled.div`
  display: none;

  @media only screen and (min-width: 1440px) {
    grid-column: 1 /3;
    justify-self: center;
    align-self: end;
    position: relative;
    bottom: -10px;
    display: block;
  }
`;

const logos = [
  { id: 1, name: "renralcars.com", url: "static/images/partners/rentalcars.png" },
  { id: 2, name: "Get your guide", url: "static/images/partners/get-your-guide.png" },
];

const Partners = () => (
  <>
    <SectionTitle title="partnersTitle" subtitle="partnersSubTitle" />

    <Wrapper>
      <Logos>
        {logos.map(logo => (
          <Logo src={logo.url} alt={logo.name} key={logo.id} />
        ))}
      </Logos>
      <Content>
        <StyledText t="partnersDescription" />
      </Content>
      <AirplaneWrapper>
        <AirplaneDown customColor="7f91a8" />
      </AirplaneWrapper>
    </Wrapper>
  </>
);

export default Partners;
