// @flow

import * as React from "react";
import styled from "styled-components";
import { ChevronRight } from "@kiwicom/orbit-components/lib/icons";
import Text from "@kiwicom/nitro/lib/components/Text";
import { Button, ButtonLink } from "@kiwicom/orbit-components";

import { sendEvent } from "../../etc/logLady";
import SectionTitle from "../shared/SectionTitle";
import Description from "../shared/Description";
import { scrollToElement } from "../helpers";
import Slider from "./Slider";
import sliderImages from "./mockedData";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 0 22px 0;
  background-color: #f6f7f9;

  @media (min-width: 740px) {
    padding: 0 25px 10px;
  }

  @media (min-width: 1440px) {
    justify-items: left;
    padding: 100px 65px 42px;
    align-items: center;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media (min-width: 740px) {
    margin-left: 25px;
    max-width: calc(50% - 25px);
  }

  @media (min-width: 1440px) {
    margin-left: 65px;
  }
`;

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 520px;
  padding-top: 5px;
  margin-bottom: 24px;

  @media (min-width: 740px) {
    flex-basis: 50%;
    justify-content: flex-start;
    padding: 0;
  }

  @media (min-width: 1440px) {
    margin-top: 24px;
    margin-bottom: 40px;
  }

  > * {
    margin: 0;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;

  & > :first-child {
    margin-bottom: 10px;
  }

  @media (min-width: 740px) {
    flex-direction: row;
    margin-top: 0;
    place-items: start;

    & > :first-child {
      margin-bottom: 0px;
      margin-right: 28px;
    }
  }

  @media (min-width: 1440px) {
    order: 3;
    place-self: start;
    margin-top: 20px;

    & > :first-child {
      margin-bottom: 0px;
      margin-right: 60px;
    }
  }
`;

const TitleDesktop = styled.div`
  display: none;

  @media (min-width: 1440px) {
    display: block;
    align-self: flex-start;
  }
`;

const TitleMobile = styled.div`
  margin: 0 auto;

  @media (min-width: 740px) {
    width: 100%;
  }

  @media (min-width: 1440px) {
    display: none;
  }
`;

const SliderSection = () => (
  <Wrapper>
    <TitleMobile>
      <SectionTitle title="stopoverTitle" resetPadding />
    </TitleMobile>
    <Slider sliderImages={sliderImages} />
    <ContentWrapper>
      <TitleDesktop>
        <SectionTitle title="stopoverTitle" resetPadding />
      </TitleDesktop>

      <DescriptionWrapper>
        <Description>
          <Text t="stopoverDescription" />
        </Description>
      </DescriptionWrapper>
      <ButtonsWrapper>
        <Button
          size="large"
          onClick={() => {
            scrollToElement("search");
            sendEvent("searchFlights");
          }}
        >
          <Text t="searchFlights" />
        </Button>
        <ButtonLink
          type="secondary"
          size="large"
          icon={<ChevronRight />}
          onClick={() => {
            scrollToElement("itinerary");
            sendEvent("discoverTips");
          }}
        >
          <Text t="chooseItinerary" />
        </ButtonLink>
      </ButtonsWrapper>
    </ContentWrapper>
  </Wrapper>
);

export default SliderSection;
