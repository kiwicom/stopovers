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
  background: #ffffff;
  border: none;
  font-size: 14px;
  height: 29px;
  padding: 5px; /* If you add too much padding here, the options won't show in IE */
  width: 268px;

  &:focus {
    outline: none;
  }
`;

export default Dropdown;
