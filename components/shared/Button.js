// @flow
import styled from "styled-components";

const Button = styled.button`
  font-family: Roboto, sans-serif;
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ secondary }) => (secondary ? 300 : 600)};
  background: ${({ secondary }) => (secondary ? "transparent" : "#00a991")};
  color: ${({ secondary }) => (secondary ? "#48505C" : "#ffffff")};
  line-height: 1.43;
  border: none;
  border-radius: 3px;
  padding: 14px 21px;
  text-align: center;
  cursor: pointer;
`;

export default Button;
