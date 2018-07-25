// @flow
import * as React from "react";
import styled from "styled-components";

import SectionTitle from "../shared/SectionTitle";
import Title from "../shared/Title";
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

  @media (min-width: 770px) {
    grid-template-columns: 1fr 704px 1fr;
  }
`;

const Widget = styled.div`
  grid-column-start: 1;

  @media (min-width: 770px) {
    grid-column-start: 2;
  }
`;

const ActionWrapper = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 1fr;
  padding: 50px 0;

  @media (min-width: 770px) {
    grid-template-columns: 1fr 154px 1fr;
  }

  @media (min-width: 1440px) {
    grid-column-start: 2;
    grid-template-columns: 1fr 190px 1fr;
  }
`;

const ButtonWrapper = styled.div`
  grid-column-start: 1;

  @media (min-width: 770px) {
    grid-column-start: 2;
  }
`;

const ActionTitleWrapper = styled.div`
  justify-items: center;

  @media (min-width: 770px) {
    justify-items: left;
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
          <ActionTitleWrapper>
            <Title fontSize={20}>with a one-day stopover in Dubai</Title>
          </ActionTitleWrapper>
        </ActionWrapper>
      </Wrapper>
    );
  }
}

export default Search;