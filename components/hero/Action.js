// @flow

import * as React from "react";
import styled from "styled-components";
// $FlowFixMe
import { ChevronDown } from "@kiwicom/orbit-components/lib/icons";

import ActionText from "../shared/ActionText";
import { scrollToElement } from "../helpers";

const ActionButton = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  padding: 0;
  box-shadow: 0px 0px 0px 6px rgba(0, 169, 145, 0.63);
  border: 0;
  cursor: pointer;
  background: #00a991;
  margin-right: 20px;
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
    <ActionText>Save on your trip & see Dubai</ActionText>
  </>
);

export default Action;
