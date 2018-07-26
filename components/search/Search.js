// @flow
import * as React from "react";
import styled from "styled-components";

import SectionTitle from "../shared/SectionTitle";
import Button from "../shared/Button";

const Wrapper = styled.div`
  padding: 0 16px;

  @media (min-width: 740px) {
  }

  @media (min-width: 1440px) {
    padding: 0 65px;
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

const ActionWrapper = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr;
  padding: 32px 0 40px;

  @media (min-width: 740px) {
    grid-template-columns: 1fr 165px 1fr;
  }

  @media (min-width: 1440px) {
    grid-gap: 24px;
    grid-column-start: 2;
    grid-template-columns: 1fr 190px 1fr;
  }
`;

const ButtonWrapper = styled.div`
  justify-self: center;

  @media (min-width: 740px) {
    grid-column-start: 2;
  }
`;

const ActionTitle = styled.p`
  font-size: 16px;
  text-align: center;
  line-height: 33px;
  color: #46515e;

  @media (min-width: 740px) {
    text-align: left;
    align-self: center;
  }
`;

class Search extends React.Component<{}> {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://widget.kiwi.com/scripts/widget-search-iframe.js";
    script.setAttribute("data-width", "100%");
    script.setAttribute("data-to", "Dubai");
    script.setAttribute("data-limit", "3");

    if (document.head) {
      document.head.appendChild(script);
    }
  }

  render() {
    return (
      <Wrapper>
        <SectionTitle
          title="Your experience starts here"
          subtitle="Search for flight with a one-day stopover in Dubai"
        />

        <WidgetWrapper>
          <Widget id="widget-holder" />
        </WidgetWrapper>

        <ActionWrapper>
          <ButtonWrapper>
            <Button fontSize={16}>Search flights</Button>
          </ButtonWrapper>

          <ActionTitle>with a one-day stopover in Dubai</ActionTitle>
        </ActionWrapper>
      </Wrapper>
    );
  }
}

export default Search;
