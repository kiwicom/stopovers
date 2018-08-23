// @flow

import * as React from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import Text from "@kiwicom/nitro/lib/components/Text";
import { Button, ButtonLink } from "@kiwicom/orbit-components";
import { ArrowDown } from "@kiwicom/orbit-components/lib/icons";

import { sendEvent } from "../../etc/logLady";
import { scrollToElement } from "../helpers";
import ItineraryItem from "./ItineraryItem";
import ItineraryProvider, { ItineraryContext, type Context } from "./ItineraryContext";
import SectionTitle from "../shared/SectionTitle";
import DropdownMobile, { renderDropdownItem } from "../shared/DropdownMobile";
import Dropdown from "../shared/Dropdown";
import { data, dropdownData } from "./mockedData";

const Wrapper = styled.div`
  display: grid;
  max-width: 1400px;
  margin: 0 auto;
  @media (min-width: 740px) {
    width: 60%;
  }
  @media (min-width: 1440px) {
    width: 70%;
  }
`;

const ItineraryWrapper = styled.div`
  display: grid;
  position: relative;
  padding-bottom: 0;
  padding-top: 40px;

  justify-items: center;

  @media (min-width: 1440px) {
    padding-bottom: 60px;

    padding-top: 0;
    background-image: none;
  }

  &:before {
    content: "";
    position: absolute;
    top: 300px;
    left: 28px;
    height: calc(100% - 300px);
    width: 2px;
    background: #e8e8e8;

    @media (min-width: 1440px) {
      left: 50%;
      margin-left: -2px;
    }
  }
  ${({ isCutBottom }) =>
    isCutBottom &&
    `&:after {
    content: "";
    position: absolute;
    bottom: 0;
    height: 120px;
    width: 100%;
    background-image: linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0));
  }`};
`;

const StyledButton = styled(Button)`
  justify-self: center;
  margin-top: 35px;
  @media (min-width: 740px) {
    margin-bottom: 40px;
  }
  @media (min-width: 1440px) {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

const StyledLink = styled(ButtonLink)`
  justify-self: start;
  margin-left: 9px;
  margin-top: 10px;
`;

const DropdownWrapper = styled.div`
  display: none;

  @media (min-width: 1440px) {
    position: relative;
    display: block;
    width: 100%;
  }
`;

const DropdownWrapperMobile = styled.div`
  position: relative;
  margin-bottom: 46px;

  &:after {
    content: "";
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 5;
    transform: rotate(45deg);
    border: solid #7f91a8;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
  }

  @media (min-width: 1440px) {
    display: none;
  }
`;

const DropdownGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  grid-gap: 10px;

  @media (min-width: 1440px) {
    grid-gap: 25px;
    grid-template-columns: 1fr 26% 1fr;
    margin-top: -50px;
    margin-bottom: 46px;
  }
`;

const DropdownTitle = styled.div`
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5;
  color: #46515e;

  @media (min-width: 1440px) {
    margin-bottom: 0;
    width: 100%;
    text-align: right;
  }
`;

const Itinerary = () => (
  <ItineraryProvider>
    <ItineraryContext.Consumer>
      {({
        state: { dropdownValue, isCollapsed, isMobile },
        changeDropdownValue,
        showMore,
      }: Context) => {
        const isMobileCollapsed = isMobile && isCollapsed;
        const items = data[dropdownValue];
        const itemsDisplayed = isMobileCollapsed ? items.slice(0, 2) : items;
        return (
          <Wrapper>
            <ItineraryWrapper isCutBottom={isMobileCollapsed}>
              <SectionTitle title="itineraryTitle" subtitle="itinerarySubTitle" />
              <DropdownGroup>
                <DropdownTitle>
                  <Text t="selectItinerary" />
                </DropdownTitle>
                <DropdownWrapperMobile>
                  <DropdownMobile
                    onChange={(e: SyntheticEvent<HTMLSelectElement>) => {
                      const { value } = e.currentTarget;
                      changeDropdownValue(value);
                      sendEvent("discoverTips", value);
                    }}
                  >
                    {dropdownData.map(item => renderDropdownItem(item))}
                  </DropdownMobile>
                </DropdownWrapperMobile>
                <DropdownWrapper>
                  <Dropdown onChange={changeDropdownValue} options={dropdownData} />
                </DropdownWrapper>
              </DropdownGroup>

              <Fade>
                {itemsDisplayed.map((itineraryItem, index) => (
                  <ItineraryItem
                    key={itineraryItem.id}
                    item={itineraryItem}
                    order={index}
                    hasNoMargin={isMobile && itemsDisplayed.length === index + 1}
                  />
                ))}
              </Fade>
            </ItineraryWrapper>
            {isMobile &&
              isCollapsed && (
                <StyledLink
                  type="secondary"
                  icon={<ArrowDown color="secondary" />}
                  onClick={() => showMore()}
                >
                  <Text t="showMore" />
                </StyledLink>
              )}
            <StyledButton
              size="large"
              onClick={() => {
                scrollToElement("search");
                sendEvent("startYourTrip");
              }}
            >
              <Text t="startYourTripNow" />
            </StyledButton>
          </Wrapper>
        );
      }}
    </ItineraryContext.Consumer>
  </ItineraryProvider>
);

export default Itinerary;
