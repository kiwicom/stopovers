// @flow
import * as React from "react";
import styled from "styled-components";

import Title from "../shared/Title";
import Button from "../shared/Button";
import ArticleItem from "./ArticleItem";
import articles from "./mockedData";

const Wrapper = styled.div`
  margin-top: 100px;
  padding: 80px 65px;
  background-color: #f6f7f9;
`;

const ArticlesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  margin-top: 100px;

  @media (min-width: 770px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const TitleWrapper = styled.div`
  text-align: center;
`;

const ActionWrapper = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 1fr;
  padding: 50px 0;
  justify-items: center;

  @media (min-width: 770px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 1440px) {
    justify-items: end;
    grid-template-columns: 1fr 190px 1fr;
  }
`;

const Articles = () => (
  <Wrapper>
    <TitleWrapper>
      <Title fontSize={38} textAlign="center">
        Dubai in detail
      </Title>
      <Title fontSize={28} textAlign="center">
        More stories, more inspiration
      </Title>
    </TitleWrapper>

    <ArticlesWrapper>
      {articles.map(article => <ArticleItem article={article} key={article.id} />)}
    </ArticlesWrapper>

    <ActionWrapper>
      <Title fontSize={20}>Book your flight to Asia featuring a stopover in Dubai</Title>
      <Button fontSize={16}>Search flight now</Button>
    </ActionWrapper>
  </Wrapper>
);

export default Articles;
