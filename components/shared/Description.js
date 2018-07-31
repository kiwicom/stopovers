// @flow

import styled from "styled-components";

const Description = styled.p`
  color: #48505c;
  font-size: 16px;
  line-height: 1.43;
  font-weight: 300;
  text-align: center;
  margin-bottom: 24px;

  @media (min-width: 740px) {
    text-align: left;
  }
  @media (min-width: 1440px) {
    font-size: 20px;
    margin-bottom: 50px;
  }
`;

export default Description;
