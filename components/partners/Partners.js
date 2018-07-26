// @flow
import * as React from "react";
import styled from "styled-components";

import SectionTitle from "../shared/SectionTitle";
import Text from "../shared/Text";

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
    grid-gap: 120px;
    margin-bottom: 80px;
    padding: 30px 136px 30px;

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
  }
`;

const logos = [
  { id: 1, name: "renralcars.com", url: "static/images/partners/rentalcars.png" },
  { id: 2, name: "Get your guide", url: "static/images/partners/get-your-guide.png" },
];

const Partners = () => (
  <>
    <SectionTitle title="Book your flight and get discounts" subtitle="from our partners" />

    <Wrapper>
      <Logos>{logos.map(logo => <Logo src={logo.url} alt={logo.name} key={logo.id} />)}</Logos>
      <Content>
        <Text>
          Book your flight with a Dubai stopover and receive discount codes for our partner
          companies via email after your flight has been confirmed.
        </Text>
      </Content>
    </Wrapper>
  </>
);

export default Partners;
