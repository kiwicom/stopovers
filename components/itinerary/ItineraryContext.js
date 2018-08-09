// @flow

import * as React from "react";

type Props = {
  children: React.Node,
};

type State = {
  dropdownValue: string,
};

export type Context = {
  state: State,
  changeDropdownValue: (value: string) => void,
};

export const ItineraryContext: Object = React.createContext();

class ItineraryProvider extends React.Component<Props, State> {
  state = {
    dropdownValue: "shoppingOnTheGo",
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
