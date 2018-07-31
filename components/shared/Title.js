// @flow

import styled from "styled-components";

const Title = styled.h2`
  font-size: 30px;
  text-align: ${({ textAlign }) => textAlign || "center"};
  color: #46515e;
  font-weight: 300;
  margin: 0 0 4px;

  @media (min-width: 1440px) {
    font-size: 38px;
    padding: 2px 0;
    margin: 0 0 10px;
  }
`;

export const SubTitle = styled.h3`
  font-size: 16px;
  text-align: ${({ textAlign }) => textAlign || "center"};
  color: #46515e;
  font-weight: 300;
  margin: 0;
  padding: 3px 0;

  @media (min-width: 1440px) {
    font-size: 24px;
  }
`;

export default Title;
