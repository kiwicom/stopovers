// @flow

import * as React from "react";
import styled from "styled-components";

import ItemContent from "./ItemContent";

type ItineraryItemType = {
  imageUrl: string,
  order: number,
  time: string,
  title: string,
  description: string,
};

type Props = {
  item: ItineraryItemType,
  order: number,
};

const ItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;

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

const ItineraryItem = ({ item, order }: Props) => {
  const { imageUrl, time, title, description } = item;
  const isOdd = !(order % 2);

  return (
    <ItemWrapper>
      <Image src={imageUrl} />

      <ItemContent isOdd={isOdd} time={time} description={description} title={title} />
    </ItemWrapper>
  );
};

export default ItineraryItem;
