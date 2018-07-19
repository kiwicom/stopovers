// @flow
import * as React from "react";
import styled from "styled-components";

const ItineraryWrapper = styled.div`
  position: relative;
  padding-top: 40px;
  padding-bottom: 40px;
  max-width: 1400px;
  margin: 0 auto;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 28px;
    height: 100%;
    width: 2px;
    background: #e8e8e8;
    @media (min-width: 770px) {
      left: 50%;
      margin-left: -2px;
    }
  }
`;

type Props = {
  children: React.Node,
};

const Itinerary = ({ children }: Props) => (
  <>
    <ItineraryWrapper>{children}</ItineraryWrapper>
  </>
);

export default Itinerary;
