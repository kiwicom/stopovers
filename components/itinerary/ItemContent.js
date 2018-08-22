// @flow

import * as React from "react";
import styled from "styled-components";
import { DateTime } from "luxon";
import Text from "@kiwicom/nitro/lib/components/Text";
import { Consumer } from "@kiwicom/nitro/lib/services/intl/context";

import StyledText from "../shared/StyledText";

const Wrapper = styled.div`
  width: calc(100% - 96px);
  margin-left: 64px;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  padding-top: 20px;

  @media (min-width: 740px) {
    margin-top: 20px;
  }

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
  left: 1px;
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
    margin-left: -9px;
    top: 50px;
  }
`;

const getIntlTime = (time: string, langId: string) => {
  const intlTime = DateTime.fromString(time, "h a", { zone: "utc" })
    .setLocale(langId)
    .toLocaleString({
      hour: "numeric",
      minute: "2-digit",
    });
  // now we need to remove :00 from time in 12h format
  const pattern = /:00(?= [AP]M)/i;
  return intlTime.replace(pattern, "");
};

const ItemContent = ({ isOdd, title, time, description }: Props) => (
  <Consumer>
    {intl => (
      <Wrapper isOdd={isOdd}>
        <Circle />
        <div>
          <Time>{getIntlTime(time, intl.language ? intl.language.id : "en")}</Time>
          <ItineraryTitle fontSize={20}>
            <Text t={title} />
          </ItineraryTitle>
        </div>
        <StyledText t={description} />
      </Wrapper>
    )}
  </Consumer>
);

export default ItemContent;
