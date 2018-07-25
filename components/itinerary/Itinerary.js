// @flow
import * as React from "react";
import styled from "styled-components";

import { scrollToElement } from "../helpers";
import ItineraryItem from "./ItineraryItem";
import ItineraryProvider, { ItineraryContext } from "./ItineraryContext";
import SectionTitle from "../shared/SectionTitle";
import Button from "../shared/Button";
import Dropdown, { renderDropdownItem } from "../shared/Dropdown";
import { data, dropdownData } from "./mockedData";

const Wrapper = styled.div`
  display: grid;
`;

const ItineraryWrapper = styled.div`
  display: grid;
  position: relative;
  padding-top: 40px;
  padding-bottom: 0;
  max-width: 1400px;
  margin: 0 auto;
  justify-items: center;

  @media (min-width: 770px) {
    padding-bottom: 60px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 300px;
    left: 28px;
    height: calc(100% - 300px);
    width: 2px;
    background: #e8e8e8;

    @media (min-width: 770px) {
      left: 50%;
      margin-left: -2px;
    }
  }
`;

const StyledButton = styled(Button)`
  margin-top: 40px;
  justify-self: center;
  @media (min-width: 770px) {
    margin-top: 0;
    margin-bottom: 40px;
  }
`;

const DropdownWrapper = styled.div`
  display: block;
  position: relative;
  text-align: center;
  margin-bottom: 120px;
`;

const Itinerary = () => (
  <ItineraryProvider>
    <ItineraryContext.Consumer>
      {/* $FlowFixMe: add context types */}
      {({ state, changeDropdownValue }) => (
        <Wrapper>
          <ItineraryWrapper>
            <SectionTitle
              title="Choose your traveller"
              subtitle="to discover the perfect itinerary"
            />

            <DropdownWrapper>
              <Dropdown
                onChange={(e: SyntheticEvent<HTMLSelectElement>) =>
                  changeDropdownValue(e.currentTarget.value)
                }
              >
                {dropdownData.map(item => renderDropdownItem(item))}
              </Dropdown>
            </DropdownWrapper>

            {data[state.dropdownValue].map((itineraryItem, index) => (
              <ItineraryItem key={itineraryItem.id} item={itineraryItem} order={index} />
            ))}
          </ItineraryWrapper>
          <StyledButton fontSize={16} onClick={() => scrollToElement("search")}>
            Start your trip now
          </StyledButton>
        </Wrapper>
      )}
    </ItineraryContext.Consumer>
  </ItineraryProvider>
);

export default Itinerary;
