// @flow

import * as React from "react";
import styled from "styled-components";
import YouTube from "react-youtube";

import SectionTitle from "../shared/SectionTitle";
import { sendEvent } from "../../etc/logLady";

const Wrapper = styled.div`
  display: flex;
  ${({ isGrey }) => isGrey && "background-color: #f6f7f9"};
  flex-direction: column;
  align-items: center;
  padding: 0 17px;

  @media (min-width: 740px) {
    padding: 0 20px 30px;
  }
  @media (min-width: 1440px) {
    padding-bottom: 40px;
  }
`;

const Video = ({ isGrey, id }: { isGrey?: boolean, id: ?string }) =>
  id ? (
    <Wrapper isGrey={isGrey}>
      <SectionTitle title="videoSectionTitle" subtitle="videoSectionSubtitle" />
      <YouTube
        videoId={id}
        className="youtube-embed"
        onPlay={() => {
          sendEvent("watchVideo");
        }}
      />
    </Wrapper>
  ) : null;

export default Video;
