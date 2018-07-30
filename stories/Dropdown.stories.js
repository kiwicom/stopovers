// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";

import Dropdown from "../components/shared/Dropdown";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

storiesOf("Dropdown", module).add("test styling", () => (
  <div style={{ width: "288px", padding: 200 }}>
    <Dropdown options={options} onChange={() => {}} />
  </div>
));
