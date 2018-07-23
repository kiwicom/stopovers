// @flow
import * as React from "react";
import styled from "styled-components";
import YouTube from "react-youtube";

import Title from "../shared/Title";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 89px;
`;

const VideoWrapper = styled.div`
  margin-top: 57px;
`;

const Video = () => (
  <Wrapper>
    <Title fontSize={38} center>
      Still want more?
    </Title>
    <Title fontSize={28} center>
      Checkout this video
    </Title>
    <VideoWrapper>
      <YouTube videoId="-peUvHblzaQ" />
    </VideoWrapper>
  </Wrapper>
);

export default Video;
