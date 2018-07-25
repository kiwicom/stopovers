// @flow
import * as React from "react";
import styled from "styled-components";

import SectionTitle from "../shared/SectionTitle";
import Text from "../shared/Text";

const PartnersWrapper = styled.div`
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  padding-top: 30px;
  padding-bottom: 30px;
  flex-direction: column;

  @media (min-width: 770px) {
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
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const Logos = styled.div`
  width: calc(100% - 160px);
  display: flex;
  flex-direction: column;
  margin-left: 80px;
  margin-right: 80px;

  @media only screen and (min-width: 770px) {
    flex-direction: row;
    width: calc(50% - 70px);
    margin: 0;
    justify-content: space-evenly;
  }
`;

const Logo = styled.img`
  height: 100%;
  width: calc(100% - 30px);
  margin-bottom: 40px;
  @media only screen and (min-width: 770px) {
    width: calc(33% - 30px);
  }
`;

const Content = styled.div`
  width: calc(100% - 160px);
  margin-left: 80px;
  margin-right: 80px;
  display: flex;
  flex-direction: row;
  @media only screen and (min-width: 770px) {
    width: calc(50% - 70px);
    margin: 0;
  }
`;

const logos = [
  { name: "renralcars.com", url: "static/images/partners/rentalcars.png" },
  { name: "Get your guide", url: "static/images/partners/get-your-guide.png" },
];

const Partners = () => (
  <>
    <SectionTitle title="Book your flight and get discounts" subtitle="from our partners" />

    <PartnersWrapper>
      <Logos>{logos.map(logo => <Logo src={logo.url} alt={logo.name} key={logo.name} />)}</Logos>
      <Content>
        <Text>
          Book your flight with a Dubai stopover and receive discount codes for our partner
          companies via email after your flight has been confirmed.
        </Text>
      </Content>
    </PartnersWrapper>
  </>
);

export default Partners;
