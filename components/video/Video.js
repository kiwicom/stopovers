// @flow
import * as React from "react";
import styled from "styled-components";
import YouTube from "react-youtube";

import SectionTitle from "../shared/SectionTitle";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const Video = () => (
  <Wrapper>
    <SectionTitle title="Still want more?" subtitle="Checkout this video" />
    <YouTube videoId="-peUvHblzaQ" />
  </Wrapper>
);

export default Video;
