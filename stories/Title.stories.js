// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";

import Title from "../components/shared/Title";

storiesOf("Title", module).add("default", () => <Title fontSize={38}>The Stopover</Title>);
