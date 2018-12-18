// @flow

import * as React from "react";
import styled from "styled-components";
import { AirplaneDown } from "@kiwicom/orbit-components/lib/icons";
import Translate from "@kiwicom/nitro/lib/components/Translate";

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: -19px;
  width: 272px;

  @media (min-width: 740px) {
    justify-content: flex-start;
    width: 260px;
    margin-left: -34px;
  }

  @media (min-width: 1440px) {
    width: 350px;
    margin-left: -87px;
  }
`;

const AirplaneWrapper = styled.div`
  position: relative;
  top: -38px;
  left: -3px;
  width: 260px;

  @media (min-width: 1440px) {
    width: 400px;
  }
`;

type Props = {
  isPriceLoading: boolean,
};

const Content = ({ isPriceLoading }: Props) => (
  <React.Fragment>
    <MainTitle>
      <Translate t="mainTitle" />
    </MainTitle>
    <TextWrapper>
      <StyledText t="mainDescription" />
    </TextWrapper>
    <AirplaneWrapper>
      <AirplaneDown color="secondary" />
    </AirplaneWrapper>
    <ActionWrapper>
      <Action isPriceLoading={isPriceLoading} />
    </ActionWrapper>
  </React.Fragment>
);

export default Content;
