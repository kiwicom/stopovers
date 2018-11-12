// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";

import Menu from "../components/menu/Menu";

storiesOf("Menu", module)
  .add("desktop", () => <Menu isStopover isMobile={false} langId="en" cityTag="dubai_414745" />)
  .add("mobile", () => <Menu isStopover isMobile langId="en" cityTag="dubai_414745" />);
