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
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 740px) {
    grid-template-columns: 1fr 704px 1fr;
  }
`;

const Widget = styled.div`
  grid-column-start: 1;

  @media (min-width: 740px) {
    grid-column-start: 2;
  }
`;

type Props = {
  langId: ?string,
};

class Search extends React.Component<Props> {
  componentDidMount() {
    const { langId } = this.props;
    const { from, to } = getCurrentUrlParams();
    const userId = getUserId();
    const script = document.createElement("script");
    script.src = "https://widget-multi-ui.fe.staging.kiwi.com/scripts/widget-stopover-iframe.js";
    script.setAttribute("data-width", "100%");
    script.setAttribute("data-stopover-location", "dubai_ae,DWC,DXB,SHJ");
    script.setAttribute("data-lang", langId || "en");
    script.setAttribute("data-from", from || "");
    script.setAttribute("data-to", to || "");
    script.setAttribute("data-hide-cookie-banner", "true");
    script.setAttribute("data-user-id", userId);
    if (document.head) {
      document.head.appendChild(script);
    }
  }

  render() {
    return (
      <Wrapper>
        <SectionTitle title="widgetTitle" subtitle="widgetSubTitle" />

        <WidgetWrapper>
          <Widget id="widget-holder" />
        </WidgetWrapper>
      </Wrapper>
    );
  }
}

export default Search;
