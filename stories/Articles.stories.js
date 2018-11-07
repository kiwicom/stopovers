// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";

import Articles from "../components/articles/Articles";
import articles from "./articlesMock";

storiesOf("Articles", module).add("default", () => <Articles items={articles} />);
