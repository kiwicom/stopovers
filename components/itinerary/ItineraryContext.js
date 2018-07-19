// @flow
import * as React from "react";

type Props = {
  children: React.Node,
};

type State = {
  dropdownValue: string,
};

export const ItineraryContext = React.createContext();

class ItineraryProvider extends React.Component<Props, State> {
  state = {
    dropdownValue: "shopping",
  };

  render() {
    const { children } = this.props;
    return (
      <ItineraryContext.Provider
        value={{
          state: this.state,
          changeDropdownValue: (value: string) =>
            this.setState({
              dropdownValue: value,
            }),
        }}
      >
        {children}
      </ItineraryContext.Provider>
    );
  }
}

export default ItineraryProvider;
