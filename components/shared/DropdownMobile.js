// @flow

import * as React from "react";
import styled from "styled-components";
import Text from "@kiwicom/nitro/lib/components/Text";

export const renderDropdownItem = (id: string) => (
  <option value={id} key={id}>
    <Text t={`itineraries.${id}.title`} />
  </option>
);

const DropdownMobile = styled.select`
  border-radius: 3px;
  background-color: #ffffff;
  border: solid 1px #bac7d5;
  font-size: 16px;
  font-weight: 500;
  appearance: none;
  padding: 15px 50px 15px 20px;
  font-family: Roboto;

  &:focus {
    outline: none;
  }
`;

export default DropdownMobile;
