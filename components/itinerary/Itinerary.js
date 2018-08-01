// @flow

import * as React from "react";
import styled from "styled-components";
import Text from "@kiwicom/nitro/lib/components/Text";

import { scrollToElement } from "../helpers";
import ItineraryItem from "./ItineraryItem";
import ItineraryProvider, { ItineraryContext } from "./ItineraryContext";
import SectionTitle from "../shared/SectionTitle";
import Button from "../shared/Button";
import DropdownMobile, { renderDropdownItem } from "../shared/DropdownMobile";
import Dropdown from "../shared/Dropdown";
import { data, dropdownData } from "./mockedData";

const Wrapper = styled.div`
  display: grid;
`;

const ItineraryWrapper = styled.div`
  display: grid;
  position: relative;
  padding-bottom: 0;
  padding-top: 40px;
  max-width: 1400px;
  margin: 0 auto;
  justify-items: center;

  @media (min-width: 740px) {
    margin: 0 20%;
  }

  @media (min-width: 1440px) {
    padding-bottom: 60px;
    margin: 0 auto;
    padding-top: 0;
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
`;

const StyledButton = styled(Button)`
  margin-top: 40px;
  justify-self: center;

  @media (min-width: 1440px) {
    margin-top: 0;
  }
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
    grid-template-columns: 1fr 20% 1fr;
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
      {/* $FlowFixMe: add context types */}
      {({ state, changeDropdownValue }) => (
        <Wrapper>
          <ItineraryWrapper>
            <SectionTitle title="itineraryTitle" subtitle="itinerarySubTitle" />
            <DropdownGroup>
              <DropdownTitle>
                <Text t="selectItinerary" />
              </DropdownTitle>
              <DropdownWrapperMobile>
                <DropdownMobile
                  onChange={(e: SyntheticEvent<HTMLSelectElement>) =>
                    changeDropdownValue(e.currentTarget.value)
                  }
                >
                  {dropdownData.map(item => renderDropdownItem(item))}
                </DropdownMobile>
              </DropdownWrapperMobile>
              <DropdownWrapper>
                <Dropdown onChange={changeDropdownValue} options={dropdownData} />
              </DropdownWrapper>
            </DropdownGroup>
            {data[state.dropdownValue].map((itineraryItem, index) => (
              <ItineraryItem key={itineraryItem.id} item={itineraryItem} order={index} />
            ))}
          </ItineraryWrapper>
          <StyledButton fontSize={16} onClick={() => scrollToElement("search")}>
            <Text t="startYourTripNow" />
          </StyledButton>
        </Wrapper>
      )}
    </ItineraryContext.Consumer>
  </ItineraryProvider>
);

export default Itinerary;
