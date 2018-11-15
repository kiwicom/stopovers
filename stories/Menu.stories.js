// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";

import Menu from "../components/menu/Menu";

const usedLocales = ["en-GB", "ru-RU"];

storiesOf("Menu", module)
  .add("desktop", () => (
    <Menu isStopover isMobile={false} lang="en" usedLocales={usedLocales} cityTag="dubai_414745" />
  ))
  .add("mobile", () => (
    <Menu isStopover isMobile lang="en" usedLocales={usedLocales} cityTag="dubai_414745" />
  ));
