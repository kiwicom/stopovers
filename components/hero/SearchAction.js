// @flow

import * as React from "react";
import { AirplaneRight } from "@kiwicom/orbit-components/lib/icons";
import Text from "@kiwicom/nitro/lib/components/Text";

import { scrollToElement } from "../helpers";
import Button from "../shared/Button";
import ActionText from "../shared/ActionText";

const SearchAction = () => (
  <>
    <AirplaneRight customColor="#bac7d5" />
    <ActionText>
      <Text t="searchWithStopover" />
    </ActionText>
    <Button
      fontSize={14}
      onClick={() => {
        scrollToElement("search");
      }}
    >
      <Text t="goToSearch" />
    </Button>
  </>
);

export default SearchAction;
