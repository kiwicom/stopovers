// @flow
import * as React from "react";
// $FlowFixMe
import { AirplaneRight } from "@kiwicom/orbit-components/lib/icons";

import Button from "../shared/Button";
import ActionText from "../shared/ActionText";

const SearchAction = () => (
  <>
    <AirplaneRight customColor="#bac7d5" />
    <ActionText>Search for flights with a one-day stopover in Dubai</ActionText>
    <Button fontSize={14}>Go to search</Button>
  </>
);

export default SearchAction;
