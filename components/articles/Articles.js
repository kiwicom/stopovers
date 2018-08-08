// @flow

import * as React from "react";
import styled from "styled-components";
import Text from "@kiwicom/nitro/lib/components/Text";

import { scrollToElement } from "../helpers";
import SectionTitle from "../shared/SectionTitle";
import Button from "../shared/Button";
import ArticleItem from "./ArticleItem";
import articles from "./mockedData";

const Wrapper = styled.div`
  background-color: #f6f7f9;
  padding: 0 16px;

  @media (min-width: 740px) {
    padding: 0;
  }

  @media (min-width: 1440px) {
    padding: 0 65px;
  }
`;

const ArticlesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (min-width: 740px) {
    flex-direction: row;
    padding: 0 16px;
    min-width: 95%;
    padding-bottom: 20px;
    overflow-x: auto;
  }

  @media (min-width: 1440px) {
    overflow-x: visible;
    padding-bottom: 0;
  }
`;

const ActionWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  padding: 32px 0;

  @media (min-width: 740px) {
    grid-template-columns: 1fr;
    padding: 60px 0 80px;
  }

  @media (min-width: 1440px) {
    justify-items: end;
    grid-template-columns: 1fr auto 1fr;
    padding: 60px 0 80px;
    grid-gap: 30px;
  }
`;

const ActionTitle = styled.h4`
  font-size: 16px;
  font-weight: 300;
  color: #46515e;
  text-align: center;
  margin-bottom: 24px;

  @media (min-width: 1440px) {
    font-size: 20px;
    margin-bottom: 0;
    align-self: center;
  }
`;

const Articles = () => (
  <Wrapper>
    <SectionTitle title="articlesTitle" subtitle="articlesSubTitle" />

    <ArticlesWrapper>
      {articles.map(article => (
        <ArticleItem article={article} key={article.id} />
      ))}
    </ArticlesWrapper>

    <ActionWrapper>
      <ActionTitle>
        <Text t="bookYourFlight" />
      </ActionTitle>
      <Button
        fontSize={16}
        onClick={() => {
          scrollToElement("search");
        }}
      >
        <Text t="searchFlightsNow" />
      </Button>
    </ActionWrapper>
  </Wrapper>
);

export default Articles;
