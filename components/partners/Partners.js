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
  place-items: center;

  @media only screen and (min-width: 740px) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 80px;
    grid-row-gap: 30px;
    order: 1;
    > :last-child {
      ${({ isOdd }) => isOdd && "grid-column: 1/3;"};
    }
  }

  @media only screen and (min-width: 1440px) {
    order: 0;
    padding: 30px 0;
  }
`;

type LogoType = {
  id: number,
  url: string,
  name: string,
  width?: string,
};

const Logo = styled.img`
  width: ${({ width }: LogoType) => width || "225"}px;
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
  { id: 3, name: "Mozio", url: "static/images/partners/mozio.png", width: "160" },
];

const Partners = () => (
  <>
    <SectionTitle title="partnersTitle" subtitle="partnersSubTitle" />

    <Wrapper>
      <Logos isOdd={logos.length % 2}>
        {logos.map((logo: LogoType) => (
          <Logo src={logo.url} alt={logo.name} key={logo.id} width={logo.width} />
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
