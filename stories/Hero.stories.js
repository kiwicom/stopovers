// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";

import Hero from "../components/hero/Hero";

storiesOf("Hero", module).add("default", () => (
  <Hero
    photo={{
      url: "https://www.datocms-assets.com/7631/1539249822-dubai-hero.jpg",
      alt: "photo alt",
    }}
    logo={{ url: "https://www.datocms-assets.com/7631/1539250255-dubai-logo.svg", alt: "logo alt" }}
  />
));
