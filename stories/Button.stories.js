// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";

import Button from "../components/shared/Button";

storiesOf("Button", module).add("Primary", () => <Button fontSize={16}>Do not click me!</Button>);
storiesOf("Button", module).add("Secondary", () => <Button fontSize={16} secondary>> Do not click me!</Button>);
