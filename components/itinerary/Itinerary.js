// @flow
import * as React from "react";
import styled from "styled-components";

import ItineraryItem from "./ItineraryItem";
import ItineraryProvider, { ItineraryContext } from "./ItineraryContext";
import Title from "../shared/Title";
import Dropdown, { renderDropdownItem } from "../shared/Dropdown";
import { data, dropdownData } from "./mockedData";

const ItineraryWrapper = styled.div`
  position: relative;
  padding-top: 40px;
  padding-bottom: 40px;
  max-width: 1400px;
  margin: 0 auto;

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

const DropdownWrapper = styled.div`
  text-align: center;
  margin-bottom: 120px;
`;

const Itinerary = () => (
  <ItineraryProvider>
    <ItineraryContext.Consumer>
      {/* $FlowFixMe: add context types */}
      {({ state, changeDropdownValue }) => (
        <ItineraryWrapper>
          <DropdownWrapper>
            <Title fontSize={38} center>
              Choose your traveller
            </Title>
            <Title fontSize={28} center>
              to discover the perfect itinerary
            </Title>
            <Dropdown
              onChange={(e: SyntheticEvent<HTMLSelectElement>) =>
                changeDropdownValue(e.currentTarget.value)
              }
            >
              {dropdownData.map(item => renderDropdownItem(item))}
            </Dropdown>
          </DropdownWrapper>

          <>
            {data[state.dropdownValue].map((itineraryItem, index) => (
              <ItineraryItem key={itineraryItem.id} item={itineraryItem} order={index} />
            ))}
          </>
        </ItineraryWrapper>
      )}
    </ItineraryContext.Consumer>
  </ItineraryProvider>
);

export default Itinerary;
