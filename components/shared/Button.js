// @flow
import styled from "styled-components";

const Button = styled.button`
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ secondary }) => (secondary ? 500 : 700)};
  background: ${({ secondary }) => (secondary ? "transparent" : "#00a991")};
  color: ${({ secondary }) => (secondary ? "#48505C" : "#ffffff")};
  line-height: 1.5;
  border: none;
  border-radius: 3px;
  padding: 14px 21px;
  text-align: center;
  cursor: pointer;
`;

export const Link = styled.a`
  font-size: 14px;
  text-decoration: none;
  font-weight: 500;
  color: #48505c;
  line-height: 1.5;
  text-align: center;
  cursor: pointer;

  &:before {
    content: ">";
    margin-right: 10px;
  }
`;

export default Button;
