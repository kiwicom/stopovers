// @flow

import * as React from "react";
import styled from "styled-components";
import YouTube from "react-youtube";

import SectionTitle from "../shared/SectionTitle";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 17px;

  @media (min-width: 740px) {
    padding: 0 20px;
  }
`;

const Video = () => (
  <Wrapper>
    <SectionTitle title="videoTitle" subtitle="videoSubTitle" />
    <YouTube videoId="euqPNQ199Mw" className="youtube-embed" />
  </Wrapper>
);

export default Video;
