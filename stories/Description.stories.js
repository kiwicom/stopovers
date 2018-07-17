// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";

import Description from "../components/shared/Description";

storiesOf("Description", module).add("default", () => (
  <Description>
    When you book your flight to Asia via Dubai, you unlock a city that can be exciting, cultured,
    gramourous, adventurous or relaxing. How you experience it is up to you.
  </Description>
));
