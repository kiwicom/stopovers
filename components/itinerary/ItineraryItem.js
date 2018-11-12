// @flow

import * as React from "react";
import styled from "styled-components";

import type { Tip } from "./Itinerary";
import ItemContent from "./ItemContent";

type Props = {
  item: Tip,
  order: number,
  hasNoMargin: boolean,
  itineraryId: string,
};

const ItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${({ hasNoMargin }) => (hasNoMargin ? 0 : 20)}px;

  @media (min-width: 740px) {
    margin-bottom: ${({ hasNoMargin }) => (hasNoMargin ? 0 : 40)}px;
  }

  @media (min-width: 1440px) {
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  box-shadow: 0 4px 12px rgba(23, 37, 30, 0.15);

  @media (min-width: 1440px) {
    width: calc(50% - 70px);
    margin: 0;
  }
`;

const ItineraryItem = ({ itineraryId, item, order, hasNoMargin }: Props) => {
  const {
    photo: { url },
    time,
    id,
  } = item;
  const isOdd = !(order % 2);
  const translationPrefix = `itineraries.${itineraryId}.tips.${id}`;
  return (
    <ItemWrapper hasNoMargin={hasNoMargin}>
      <Image src={url} />

      <ItemContent
        isOdd={isOdd}
        time={time}
        description={`${translationPrefix}.description`}
        title={`${translationPrefix}.title`}
      />
    </ItemWrapper>
  );
};

export default ItineraryItem;
