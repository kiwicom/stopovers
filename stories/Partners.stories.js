// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";

import Partners from "../components/partners/Partners";

const logos = [
  {
    format: "png",
    size: 70998,
    width: 1600,
    height: 203,
    title: "Get Your Guide",
    alt: "Get Your Guide",
    url: "https://www.datocms-assets.com/7631/1539249879-get-your-guide.png",
  },
  {
    format: "png",
    size: 7181,
    width: 527,
    height: 107,
    title: "Mozio",
    alt: "Mozio",
    url: "https://www.datocms-assets.com/7631/1539249882-mozio.png",
  },
  {
    format: "png",
    size: 16292,
    width: 600,
    height: 80,
    title: "rentalcars.com",
    alt: "rentalcars.com",
    url: "https://www.datocms-assets.com/7631/1539249883-rentalcars.png",
  },
];

storiesOf("Partners", module).add("default", () => <Partners logos={logos} />);
