// @flow
import * as React from "react";
import styled from "styled-components";
// $FlowFixMe
import { AirplaneDown } from "@kiwicom/orbit-components/lib/icons";

import Action from "./Action";
import Text from "../shared/Text";
import Br from "../shared/Br";

const MainTitle = styled.h1`
  font-size: 30px;
  font-weight: 500;
  color: #171b1e;

  @media (min-width: 1440px) {
    font-size: 40px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  border-left: solid 2px #e8edf1;
  margin-bottom: 35px;
  margin-left: 5px;
  margin-top: 24px;
  padding: 0 0 8px 19px;
  width: 230px;

  @media (min-width: 740px) {
    margin-top: 35px;
  }

  @media (min-width: 1440px) {
    width: 378px;
    margin-top: 68px;
    margin-bottom: 100px;
    padding: 0 0 0 38px;
  }

  &::before {
    content: "";
    position: relative;
    display: block;
    background: #00a991;
    border-radius: 50%;
    flex-shrink: 0;
    height: 16px;
    width: 16px;
    top: 0.4em;
    left: -1.7em;

    @media (min-width: 1440px) {
      left: -2.9em;
      top: 0em;
    }
  }
`;

const ActionWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  align-items: center;
  justify-content: space-between;
  margin-left: -19px;
  width: 272px;

  @media (min-width: 740px) {
    grid-template-columns: 94px 1fr;
    margin-left: -40px;
  }

  @media (min-width: 1440px) {
    width: 400px;
  }
`;

const AirplaneWrapper = styled.div`
  position: relative;
  top: -38px;
  left: -5px;

  @media (min-width: 1440px) {
    top: -102px;
  }
`;

const Content = () => (
  <>
    <MainTitle>
      Start your vacation<br /> with a holiday
    </MainTitle>
    <TextWrapper>
      <Text>
        There’s a world of experiences <Br />waiting on a 24 hour stopover in Dubai
      </Text>
    </TextWrapper>
    <AirplaneWrapper>
      <AirplaneDown customColor="7f91a8" />
    </AirplaneWrapper>
    <ActionWrapper>
      <Action />
    </ActionWrapper>
  </>
);

export default Content;
