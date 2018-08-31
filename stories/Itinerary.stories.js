// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";

import Itinerary from "../components/itinerary/Itinerary";

storiesOf("Itinerary", module).add("full render", () => <Itinerary />);
