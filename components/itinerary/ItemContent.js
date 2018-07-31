// @flow

import * as React from "react";
import styled from "styled-components";

import Text from "../shared/Text";

const Wrapper = styled.div`
  width: calc(100% - 96px);
  margin-left: 64px;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  @media only screen and (min-width: 1440px) {
    margin: 0 80px;
    width: calc(50% - 70px);
    margin: 0;
    padding-top: 40px;
    order: ${({ isOdd }) => (isOdd ? -1 : 1)};
    align-items: ${({ isOdd }) => (isOdd ? "flex-end" : "flex-start")};
  }
`;

type Props = {
  time: string,
  title: string,
  description: string,
  isOdd: boolean,
};

const Time = styled.div`
  color: #7f91a8;
  font-size: 16px;
  margin-bottom: 3px;
`;

const ItineraryTitle = styled.h2`
  font-size: 20px;
  color: #7f91a8;
  font-weight: 500;
  margin-bottom: 16px;
`;

const Circle = styled.div`
  position: absolute;
  left: 0;
  margin-top: 10px;
  border-radius: 50%;
  height: 16px;
  width: 16px;
  background: #00a991;
  box-shadow: 0px 0px 0px 6px #b2e5de;
  margin-left: 20px;
  @media (min-width: 1440px) {
    margin-top: 0;
    left: 50%;
    margin-left: -8px;
    top: 50px;
  }
`;

const ItemContent = ({ isOdd, title, time, description }: Props) => (
  <>
    <Wrapper isOdd={isOdd}>
      <Circle />
      <Time> {time}</Time>
      <ItineraryTitle fontSize={20}>{title}</ItineraryTitle>
      <Text>{description}</Text>
    </Wrapper>
  </>
);

export default ItemContent;
