// @flow
import * as React from "react";
import styled from "styled-components";

import Title from "../shared/Title";
import Button from "../shared/Button";

const Wrapper = styled.div`
  margin-top: 100px;
  padding: 80px 65px;
  background-color: #f6f7f9;
`;

const TitleWrapper = styled.div`
  text-align: center;
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

class Search extends React.Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://widget.kiwi.com/scripts/widget-search-iframe.js";
    script.setAttribute("data-width", "100%");
    script.setAttribute("data-to", "Dubai");
    script.setAttribute("data-limit", 3);

    document.head.appendChild(script);
  }

  render() {
    return (
      <Wrapper>
        <TitleWrapper>
          <Title fontSize={38} textAlign="center">
            Your experience starts here
          </Title>
          <Title fontSize={28} textAlign="center">
            Search for flight with a one-day stopover in Dubai
          </Title>
        </TitleWrapper>

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
