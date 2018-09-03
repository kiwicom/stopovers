// @flow

import * as React from "react";

import { sendEvent } from "../../etc/logLady";

type Props = {
  children: React.Node,
};

type State = {
  dropdownValue: string,
  isCollapsed: boolean,
};

export type Context = {
  state: State,
  changeDropdownValue: (value: string) => void,
  showMore: () => void,
};

export const ItineraryContext: Object = React.createContext();

class ItineraryProvider extends React.Component<Props, State> {
  state = {
    dropdownValue: "shoppingOnTheGo",
    isCollapsed: true,
  };

  render() {
    const { children } = this.props;
    return (
      <ItineraryContext.Provider
        value={{
          state: this.state,
          changeDropdownValue: (value: string) => {
            this.setState({
              dropdownValue: value,
            });
            sendEvent("discoverTips", value);
          },
          showMore: () => {
            this.setState({
              isCollapsed: false,
            });
            sendEvent("showMoreTips");
          },
        }}
      >
        {children}
      </ItineraryContext.Provider>
    );
  }
}

export default ItineraryProvider;
