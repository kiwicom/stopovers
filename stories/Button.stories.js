// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";

import Button from "../components/shared/Button";

storiesOf("Button", module).add("default", () => <Button>Don't click me!</Button>);
