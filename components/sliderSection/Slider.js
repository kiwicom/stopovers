// @flow

import * as React from "react";
import styled from "styled-components";
import Carousel from 'nuka-carousel';

/*
const Title = styled.h1`
  color: blue;
  font-size: 50px;
`;

const Layout = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`;
*/

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SliderSection = () => (
    <Carousel>
      <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1" />
      <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2" />
      <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3" />
      <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4" />
      <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5" />
      <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6" />
    </Carousel>
);

export default SliderSection;
