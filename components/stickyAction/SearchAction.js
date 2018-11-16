// @flow

import * as React from "react";
import { AirplaneRight } from "@kiwicom/orbit-components/lib/icons";
import Translate from "@kiwicom/nitro/lib/components/Translate";
import { Button } from "@kiwicom/orbit-components";

import { sendEvent } from "../../etc/logLady";
import { scrollToElement } from "../helpers";
import ActionText from "../shared/ActionText";

const SearchAction = () => (
  <>
    <AirplaneRight customColor="#bac7d5" />
    <ActionText>
      <Translate t="stickyBannerText" />
    </ActionText>
    <Button
      size="large"
      onClick={() => {
        scrollToElement("search");
        sendEvent("searchNow");
      }}
    >
      <Translate t="stickyBannerButtonText" />
    </Button>
  </>
);

export default SearchAction;
