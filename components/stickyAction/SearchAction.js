// @flow

import * as React from "react";
import { AirplaneRight } from "@kiwicom/orbit-components/lib/icons";
import Text from "@kiwicom/nitro/lib/components/Text";
import { Button } from "@kiwicom/orbit-components";

import { scrollToElement } from "../helpers";
import ActionText from "../shared/ActionText";

const SearchAction = () => (
  <>
    <AirplaneRight customColor="#bac7d5" />
    <ActionText>
      <Text t="searchWithStopover" />
    </ActionText>
    <Button
      size="large"
      onClick={() => {
        scrollToElement("search");
      }}
    >
      <Text t="goToSearch" />
    </Button>
  </>
);

export default SearchAction;
