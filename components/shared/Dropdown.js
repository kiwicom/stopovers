// @flow
import * as React from "react";
import Select, { components } from "react-select";
import { ChevronDown, ChevronUp } from "@kiwicom/orbit-components/lib/icons";

const customStyles = {
  dropdownIndicator: base => ({
    ...base,
    color: "grey",
  }),
  option: (base, state) => ({
    ...base,
    borderBottom: "none",
    padding: "0 16px",
    lineHeight: "2.13",
    backgroundColor: "#fff",
    fontWeight: state.isSelected ? 700 : 300,
    color: "#46515e",
  }),
  control: (base, state) => ({
    ...base,
    borderRadius: state.isFocused ? "3px 3px 0 0" : "3px",
    border: state.isFocused ? "solid 1px #fff !important" : "solid 1px #bac7d5",
    fontSize: "16px",
    fontWeight: 500,

    background: "#fff",
    fontFamily: "Roboto",
    padding: "6px 6px",
    boxShadow: state.isFocused ? "0 20px 60px 0 rgba(23, 27, 30, 0.4)" : "none",
  }),
  singleValue: (base, state) => ({
    ...base,
    opacity: state.isDisabled ? 0.5 : 1,
    transition: "opacity 300ms",
    backgroundColor: "#fffff",
    color: "#46515e",
    fontWeight: 700,
  }),
  menu: base => ({
    ...base,
    border: "none",
    marginTop: "-10px",
    overflowY: "hidden",
    borderRadius: "0 0 3px 3px",
    boxShadow: "0 40px 60px 1px rgba(23, 27, 30, 0.4)",
  }),
};

const IndicatorSeparator = () => <div />;

const DropdownIndicator = props =>
  components.DropdownIndicator && (
    <components.DropdownIndicator {...props}>
      {props.isFocused ? <ChevronUp /> : <ChevronDown />}
    </components.DropdownIndicator>
  );

type Props = {
  options: Array<{ value: string, label: string }>,
  onChange: (optionValue: string) => void,
};

const Dropdown = ({ options, onChange }: Props) => (
  <Select
    options={options}
    styles={customStyles}
    isSearchable={false}
    defaultValue={options[0]}
    blurInputOnSelect
    onChange={option => onChange(option.value)}
    components={{ DropdownIndicator, IndicatorSeparator }}
    hideSelectedOptions
    classNamePrefix="react-select"
    instanceId="desktop"
  />
);

export default Dropdown;
