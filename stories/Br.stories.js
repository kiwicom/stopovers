// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";

import Description from "../components/shared/Description";
import Br from "../components/shared/Br";

storiesOf("Br", module).add("default", () => (
  <Description>
    When you book your flight to Asia via Dubai, you unlock a city<Br /> that can be exciting,
    cultured, gramourous, adventurous or relaxing.<Br />How you experience it is up to you.
  </Description>
));
