// @flow

import * as React from "react";
import styled from "styled-components";
import { ChevronDown } from "@kiwicom/orbit-components/lib/icons";
import Text from "@kiwicom/nitro/lib/components/Text";

import ActionText from "../shared/ActionText";
import { scrollToElement } from "../helpers";

const ActionButton = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  padding: 0;
  box-shadow: 0px 0px 0px 6px rgba(178, 229, 222, 1);
  border: 0;
  cursor: pointer;
  background: #00a991;
  order: 1;
  justify-self: end;

  @media (min-width: 740px) {
    margin-right: 20px;
    order: 0;
  }
`;

const Action = () => (
  <>
    <ActionButton
      onClick={() => {
        scrollToElement("search");
      }}
    >
      <ChevronDown customColor="#ffffff" size="medium" />
    </ActionButton>
    <ActionText>
      <Text t="saveOnTrip" />
    </ActionText>
  </>
);

export default Action;
