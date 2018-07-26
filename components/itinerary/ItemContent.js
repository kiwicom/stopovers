// @flow
import * as React from "react";
import styled from "styled-components";

import Text from "../shared/Text";
import Title from "../shared/Title";

const Wrapper = styled.div`
  width: calc(100% - 160px);
  margin-left: 80px;
  margin-right: 80px;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  @media only screen and (min-width: 740px) {
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

const ItemContent = ({ isOdd, title, time, description }: Props) => (
  <>
    <Wrapper isOdd={isOdd}>
      <Text> {time}</Text>
      <Title fontSize={20}>{title}</Title>
      <Text>{description}</Text>
    </Wrapper>
  </>
);

export default ItemContent;
