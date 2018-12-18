// @flow

import * as React from "react";
import styled from "styled-components";

import Content from "./Content";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  place-items: center;
  margin-bottom: 35px;

  @media (min-width: 740px) {
    flex-direction: row;
    margin-bottom: 9.5px;

    & > * {
      flex: 1;
    }
  }

  @media (min-width: 1440px) {
    margin-bottom: 0;
  }
`;

const ImageWrapper = styled.div`
  place-self: end;
  height: 250px;

  @media (min-width: 500px) {
    height: 320px;
  }
  @media (min-width: 600px) {
    height: 400px;
  }
  @media (min-width: 740px) {
    height: 510px;
  }
  @media (min-width: 1000px) {
    height: 560px;
  }
  @media (min-width: 1440px) {
    height: 700px;
  }
`;

const Image = styled.img`
  object-fit: cover;
  object-position: 50% 40%;
  width: 100%;
  height: 100%;
  display: block;
  margin: 0 auto;
  @media (min-width: 740px) {
    object-position: 30% 10%;
  }
  @media (min-width: 1200px) {
    object-position: 30% 20%;
  }
  @media (min-width: 1440px) {
    object-position: 30% 20%;
  }
`;

const DubaiLogoWrapper = styled.div`
  position: relative;
  display: flex;
  top: -98px;
  flex-direction: column;
  align-items: flex-end;
  justify-items: flex-end;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(1, 1, 1, 0.6));
  padding: 9px 33px 26px;
`;

const DubaiLogo = styled.img`
  vertical-align: middle;
  opacity: 1;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  justify-self: center;
  align-items: center;
`;

type Props = {
  photo: {
    url: string,
    alt: string,
  },
  logo: {
    url: string,
    alt: string,
  },
  isPriceLoaderShown: boolean,
};

const Hero = ({ photo, logo, isPriceLoaderShown }: Props) => (
  <Wrapper>
    <ContentWrapper>
      <Content isPriceLoading={isPriceLoaderShown} />
    </ContentWrapper>
    <ImageWrapper>
      {photo && <Image src={`${photo.url}?w=1000`} alt={photo.alt} />}
      {logo && (
        <DubaiLogoWrapper>
          <DubaiLogo src={logo.url} alt={logo.alt} />
        </DubaiLogoWrapper>
      )}
    </ImageWrapper>
  </Wrapper>
);

export default Hero;
