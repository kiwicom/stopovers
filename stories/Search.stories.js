// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";

import Search from "../components/search/Search";

storiesOf("Search", module).add("default", () => <Search langId="ru" />);
