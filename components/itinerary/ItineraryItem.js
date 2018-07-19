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

  @media (min-width: 770px) {
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const Image = styled.img`
  width: calc(100% - 160px);
  height: 100%;
  border-radius: 5px;
  margin-left: 80px;
  margin-right: 80px;
  @media (min-width: 770px) {
    width: calc(50% - 70px);
    margin: 0;
  }
`;

const Circle = styled.div`
  position: absolute;
  top: 60px;
  left: 0;

  border-radius: 50%;
  height: 16px;
  width: 16px;
  background: #00a991;
  box-shadow: 0px 0px 0px 6px #b2e5de;
  margin-left: 20px;
  @media (min-width: 770px) {
    left: 50%;
    margin-left: -8px;
  }
`;

const ItineraryItem = ({ item, order }: Props) => {
  const { imageUrl, time, title, description } = item;
  const isOdd = !(order % 2);

  return (
    <ItemWrapper>
      <Circle />
      <Image src={imageUrl} />
      <ItemContent isOdd={isOdd} time={time} description={description} title={title} />
    </ItemWrapper>
  );
};

export default ItineraryItem;
