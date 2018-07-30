// @flow
import * as React from "react";
import styled from "styled-components";

type DropdownItem = {
  id: number,
  value: string,
  title: string,
};

export const renderDropdownItem = ({ value, id, title }: DropdownItem) => (
  <option value={value} key={id}>
    {title}
  </option>
);

const Dropdown = styled.select`
  border-radius: 3px;
  background-color: #ffffff;
  border: solid 1px #bac7d5;
  font-size: 16px;
  font-weight: 500;
  appearance: none;
  padding: 11px 16px;
  font-family: Roboto;

  &:focus {
    outline: none;
  }
`;

export default Dropdown;
