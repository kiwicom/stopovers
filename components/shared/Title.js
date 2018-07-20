// @flow
import styled from "styled-components";

const Title = styled.h2`
  font-size: ${({ fontSize }) => fontSize}px;
  text-align: ${({ center }) => (center ? "center" : "left")};
  color: #48505c;
  font-weight: 300;
`;

export default Title;
