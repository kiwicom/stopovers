// @flow
import * as React from "react";
import styled from "styled-components";
import { ChevronDown, AirplaneDown, AirplaneRight } from "@kiwicom/orbit-components/lib/icons";

const Image = styled.img`
  width: 720px;
  height: 700px;
  position: relative;
  right: 0px;
  grid-area: Image;
  max-height: 100%;
`;

const ImageWrapper = styled.div`
  grid-area: Image;
  display: flex;
  justify-content: flex-end;
`;

const Wrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 700px 76px;
  grid-template-areas: "Content Image " "SearchAction SearchAction";
  font-family: Roboto, sans-serif;
`;

const Content = styled.div`
  padding-top: 155px;
  color: #46515e;
  margin-left: 87px;
  grid-area: Content;
`;

const Title = styled.div`
  width: 338px;
  font-size: 40px;
  font-weight: 500;
  color: #171b1e;
  padding-bottom: 68px;
`;

const TextWrapper = styled.div`
  border-left: solid 2px #e8edf1;
  padding-left: 38px;
  margin-bottom: 68px;
  padding-top: 8px;
  padding-bottom: 8px;
  &::before {
    content: "";
    position: relative;
    display: block;
    background: #00a991;
    border-radius: 50%;
    height: 16px;
    width: 16px;
    top: 1.5em;

    left: -2.95em;
  }
`;
const Text = styled.div`
  width: 340px;
  height: 60px;
  margin-top: -15px;

  font-size: 20px;
  line-height: 1.5;
`;

const Action = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: -25px;
`;

const ActionText = styled.div`
  height: 34px;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.7;
  margin: 0 16px;
`;

const ActionButton = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  padding: 0;
  box-shadow: 0px 0px 0px 6px rgba(0, 169, 145, 0.63);
  border: 0;
  cursor: pointer;
  background: #00a991;
  margin-right: 20px;
`;

const AirplaneWrapper = styled.div`
  position: relative;
  display: block;
  top: -3.7em;
  left: -0.6em;
`;

const SearchAction = styled.div`
  grid-area: SearchAction;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 127px;
  height: 44px;
  border-radius: 3px;
  background-color: #00a991;
  border: none;
  cursor: pointer;
  font-family: Roboto;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.43;
  text-align: center;
  color: #ffffff;
`;

const Hero = () => (
  <Wrapper>
    <Content>
      <Title>Start your vacation with a holiday</Title>
      <TextWrapper>
        <Text>
          There's a world of experiences <br />waiting on a 24 hour stopover in Dubai
        </Text>
      </TextWrapper>
      <AirplaneWrapper>
        <AirplaneDown customColor="#7f91a8" />
      </AirplaneWrapper>
      <Action>
        <ActionButton>
          <ChevronDown customColor="#ffffff" size="medium" />
        </ActionButton>
        <ActionText>Save on your trip & see Dubai</ActionText>
      </Action>
    </Content>
    <ImageWrapper>
      <Image src="/static/dubai-hero.jpg" alt="hero" />
    </ImageWrapper>
    <SearchAction>
      <AirplaneRight customColor="#bac7d5" />
      <ActionText>Search for flights with a one-day stopover in Dubai</ActionText>
      <Button>Go to search</Button>
    </SearchAction>
  </Wrapper>
);

export default Hero;
