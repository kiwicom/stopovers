// @flow

import * as React from "react";
import styled from "styled-components";

import { getUserId, getCurrentUrlParams } from "../../etc/helpers";
import SectionTitle from "../shared/SectionTitle";

const Wrapper = styled.div`
  padding: 0 16px;
  margin-bottom: 20px;

  @media (min-width: 740px) {
    margin-bottom: 30px;
  }

  @media (min-width: 1440px) {
    padding: 0 65px;
    margin-bottom: 100px;
  }
`;

const WidgetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 704px;
  margin: 0 auto;
`;

/* eslint-disable react/no-unused-prop-types */
type Props = {
  langId: ?string,
  location: string,
  isStopover: boolean,
  affilid: ?string,
};

const generateScript = ({ langId, location, isStopover, affilid }: Props) => {
  const { from, to, passengers, departure, returnDate } = getCurrentUrlParams();

  const userId = getUserId();
  const script = document.createElement("script");
  script.src = "https://widget.kiwi.com/scripts/widget-stopover-iframe.js";
  script.setAttribute("data-width", "100%");
  script.setAttribute("data-stopover-location", isStopover ? location : "");
  script.setAttribute("data-lang", langId || "en");
  script.setAttribute("data-from", from || "");
  script.setAttribute("data-to", isStopover ? to || "" : location);
  script.setAttribute("data-passengers", passengers || "1");
  script.setAttribute("data-departure", departure || "");
  script.setAttribute("data-return", returnDate || "");
  script.setAttribute("data-hide-cookie-banner", "true");
  script.setAttribute("data-user-id", userId);
  script.setAttribute("data-affilid", affilid || "acquisition");
  return script;
};

class Search extends React.Component<Props> {
  script: HTMLScriptElement;

  componentDidMount() {
    const script = generateScript(this.props);
    if (document.head) {
      document.head.appendChild(script);
    }
    this.script = script;
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.langId !== prevProps.langId) {
      if (document.head) {
        document.head.removeChild(this.script);
      }
      const script = generateScript(this.props);
      if (document.head) {
        document.head.appendChild(script);
      }
      this.script = script;
    }
  }

  componentWillUnmount() {
    if (document.head) {
      document.head.removeChild(this.script);
    }
  }

  render() {
    return (
      <Wrapper>
        <SectionTitle title="searchSectionTitle" subtitle="searchSectionSubtitle" />
        <WidgetWrapper>
          <div id="widget-holder" />
        </WidgetWrapper>
      </Wrapper>
    );
  }
}

export default Search;
