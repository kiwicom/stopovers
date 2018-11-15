// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";

import Itinerary from "../components/itinerary/Itinerary";
import itinerariesMock from "./itinerariesMock";

storiesOf("Itinerary", module).add("default", () => <Itinerary isMobile data={itinerariesMock} />);
