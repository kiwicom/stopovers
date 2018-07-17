// @flow
import * as React from "react";
import styled from "styled-components";
// $FlowFixMe
import { AirplaneDown } from "@kiwicom/orbit-components/lib/icons";

import Action from "./Action";
import Text from "../shared/Text";

const MainTitle = styled.div`
  font-size: 40px;
  font-weight: 500;
  color: #171b1e;
  margin-bottom: 53px;
`;

const TextWrapper = styled.div`
  border-left: solid 2px #e8edf1;
  padding-left: 38px;
  margin-bottom: 68px;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 340px;
  height: 60px;
  &::before {
    content: "";
    position: relative;
    display: block;
    background: #00a991;
    border-radius: 50%;
    height: 16px;
    width: 16px;
    top: 1.5em;
    left: -2.95em;
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: -25px;
`;

const AirplaneWrapper = styled.div`
  position: relative;
  top: -3.7em;
  left: -0.6em;
`;

const Content = () => (
  <>
    <MainTitle>Start your vacation with a holiday</MainTitle>
    <TextWrapper>
      <Text>
        There’s a world of experiences <br /> waiting on a 24 hour stopover in Dubai
      </Text>
    </TextWrapper>
    <AirplaneWrapper>
      <AirplaneDown customColor="#7f91a8" />
    </AirplaneWrapper>
    <ActionWrapper>
      <Action />
    </ActionWrapper>
  </>
);

export default Content;
