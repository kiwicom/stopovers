// @flow

import * as React from "react";
import { storiesOf } from "@storybook/react";

import SliderSection from "../components/sliderSection/SliderSection";

const sliderImages = [
  {
    id: "1",
    url: "https://www.datocms-assets.com/7631/1539249847-carousel-third.jpg",
  },
  {
    id: "2",
    url: "https://www.datocms-assets.com/7631/1539249850-carousel-second.jpg",
  },
  {
    id: "3",
    url: "https://www.datocms-assets.com/7631/1539249853-carousel-fourth.jpg",
  },
];

storiesOf("SliderSection", module).add("default", () => (
  <SliderSection sliderImages={sliderImages} areItineraries />
));
