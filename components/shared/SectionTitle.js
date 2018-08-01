// @flow

import * as React from "react";
import styled from "styled-components";

type Props = {
  title: string,
  subtitle?: string,
  resetPadding?: boolean,
};

const TitleWrapper = styled.div`
  padding: 32px 20px;

  @media (min-width: 1440px) {
    padding: ${({ resetPadding }) => (resetPadding ? 0 : 80)}px 0;
  }
`;

const Title = styled.h2`
  font-size: 30px;
  text-align: ${({ textAlign }) => textAlign || "center"};
  line-height: 1.2;
  color: #46515e;
  font-weight: 300;
  margin: 0 0 4px;

  @media (min-width: 1440px) {
    font-size: 38px;
    padding: 2px 0;
    margin: 0 0 10px;
  }
`;

const SubTitle = styled.h3`
  font-size: 16px;
  text-align: ${({ textAlign }) => textAlign || "center"};
  line-height: 1.2;
  color: #46515e;
  font-weight: 300;
  margin: 0;
  padding: 3px 0;

  @media (min-width: 1440px) {
    font-size: 24px;
  }
`;

const SectionTitle = ({ title, subtitle, resetPadding }: Props) => (
  <TitleWrapper resetPadding={resetPadding}>
    <Title>{title}</Title>
    {subtitle && <SubTitle>{subtitle}</SubTitle>}
  </TitleWrapper>
);

export default SectionTitle;
