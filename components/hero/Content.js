// @flow

import * as React from "react";
import styled from "styled-components";
import { AirplaneDown } from "@kiwicom/orbit-components/lib/icons";
import Text from "@kiwicom/nitro/lib/components/Text";

import Action from "./Action";
import StyledText from "../shared/StyledText";

const MainTitle = styled.h1`
  font-size: 30px;
  font-weight: 500;
  color: #171b1e;
  width: 260px;
  line-height: 1.2;

  @media (min-width: 1440px) {
    font-size: 40px;
    width: 400px;
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
    width: 350px;
    margin-left: -15px;
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
    left: -28px;
    @media (min-width: 740px) {
      left: -28px;
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
    margin-left: -66px;
  }

  @media (min-width: 1440px) {
    width: 300px;
    margin-left: -180px;
  }
`;

const AirplaneWrapper = styled.div`
  position: relative;
  justify-self: start;
  top: -38px;
  left: -3px;
`;

const Content = () => (
  <>
    <MainTitle>
      <Text t="startYourVacation" />
    </MainTitle>
    <TextWrapper>
      <StyledText t="worldOfExperiences" />
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
