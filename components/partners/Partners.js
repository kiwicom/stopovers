// @flow

import * as React from "react";
import styled from "styled-components";
import { AirplaneDown } from "@kiwicom/orbit-components/lib/icons";

import SectionTitle from "../shared/SectionTitle";
import StyledText from "../shared/StyledText";

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 16px 32px;

  @media only screen and (min-width: 740px) {
    padding: 0 136px 80px;
  }

  @media only screen and (min-width: 1440px) {
    flex-direction: row;
    margin-bottom: 80px;
    padding: 0 136px 37px;

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
  margin-bottom: -24px;
  display: flex;
  flex-direction: column;
  place-items: center;

  @media only screen and (min-width: 740px) {
    margin-bottom: -30px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    order: 1;
    width: 100%;
  }

  @media only screen and (min-width: 1440px) {
    order: 0;
    flex: 1;
    padding: 30px 0;
  }
`;

const LogoWrapper = styled.div`
  margin-bottom: 24px;

  @media only screen and (min-width: 740px) {
    flex-basis: 50%;
    justify-content: center;

    margin-bottom: 30px;
  }
`;

const Logo = styled.img`
  display: block;
  margin: 0 auto;
  width: 225px;
  max-width: calc(100% - 20px);
`;

const Content = styled.div`
  padding: 0 16px;
  text-align: center;
  margin-top: 37px;

  @media only screen and (min-width: 740px) {
    margin-top: 0;
    margin-bottom: 37px;
  }

  @media only screen and (min-width: 1440px) {
    order: 3;
    flex: 1;
    text-align: left;
    padding: 30px 0;
    margin-bottom: 0;
  }
`;

const AirplaneWrapper = styled.div`
  display: none;

  @media only screen and (min-width: 1440px) {
    margin: 0 48px;
    order: 2;
    align-self: flex-end;
    position: relative;
    bottom: -47px;
    display: block;
  }
`;

type LogoType = {
  title: string,
  alt: string,
  url: string,
};

type Props = {
  logos: LogoType[],
};

const Partners = ({ logos }: Props) =>
  logos && logos.length ? (
    <>
      <SectionTitle title="partnersSectionTitle" subtitle="partnersSectionSubtitle" />

      <Wrapper>
        <Logos isOdd={logos.length % 2}>
          {logos.map((logo: LogoType) => (
            <LogoWrapper key={logo.title}>
              <Logo src={logo.url} alt={logo.alt} title={logo.title} />
            </LogoWrapper>
          ))}
        </Logos>
        <Content>
          <StyledText t="partnersSectionDescription" />
        </Content>
        <AirplaneWrapper>
          <AirplaneDown color="tertiary" />
        </AirplaneWrapper>
      </Wrapper>
    </>
  ) : null;

export default Partners;
