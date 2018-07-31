// @flow strict

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs/react";

storiesOf("Text", module)
  .addDecorator(withKnobs)
  .add("default", () => <span>{text("Text", "kek")}</span>);
