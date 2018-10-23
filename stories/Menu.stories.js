// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";

import Menu from "../components/menu/Menu";

storiesOf("Menu", module)
  .add("desktop", () => <Menu isMobile={false} langId="en" />)
  .add("mobile", () => <Menu isMobile langId="en" />);
