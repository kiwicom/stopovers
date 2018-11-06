// @flow

import * as React from "react";

import { sendEvent } from "../../etc/logLady";

type Props = {
  children: React.Node,
  defaultValue: string,
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
    dropdownValue: this.props.defaultValue,
    isCollapsed: true,
  };

  render() {
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
        {this.props.children}
      </ItineraryContext.Provider>
    );
  }
}

export default ItineraryProvider;
