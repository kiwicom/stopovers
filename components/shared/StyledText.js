// @flow

import * as React from "react";
import styled from "styled-components";
import Translate from "@kiwicom/nitro/lib/components/Translate";

type Props = {
  t: string,
};

const TextWrapper = styled.span`
  color: #46515e;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5;

  @media (min-width: 1440px) {
    font-size: 20px;
  }
`;

const StyledText = ({ t }: Props) => (
  <TextWrapper>
    <Translate t={t} />
  </TextWrapper>
);

export default StyledText;
