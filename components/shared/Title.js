// @flow
import styled from "styled-components";

const Title = styled.h2`
  font-size: ${({ fontSize }) => fontSize}px;
  text-align: ${({ textAlign }) => textAlign || "left"};
  color: #48505c;
  font-weight: 300;
`;

export default Title;
