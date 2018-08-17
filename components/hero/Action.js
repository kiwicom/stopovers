// @flow

import * as React from "react";
import styled from "styled-components";
import { ChevronDown } from "@kiwicom/orbit-components/lib/icons";
import Text from "@kiwicom/nitro/lib/components/Text";

import { sendEvent } from "../../etc/logLady";
import ActionText from "../shared/ActionText";
import { scrollToElement } from "../helpers";

const ActionButton = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  padding: 0;
  box-shadow: 0 0 0 0 rgba(178, 229, 222, 0);
  border: 0;
  cursor: pointer;
  background: #00a991;
  order: 1;
  justify-self: end;
  animation: pulse 2s infinite;

  @media (min-width: 740px) {
    margin-right: 20px;
    order: 0;
  }
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 0 0 12px rgba(178, 229, 222, 0.8);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(178, 229, 222, 0);
    }
  }
`;

const Action = () => (
  <>
    <ActionButton
      onClick={() => {
        scrollToElement("slider");
        sendEvent("saveAndSee");
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
