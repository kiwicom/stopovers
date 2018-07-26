// @flow
import * as React from "react";
import styled from "styled-components";

import { scrollToElement } from "../helpers";
import SectionTitle from "../shared/SectionTitle";
import Button from "../shared/Button";
import ArticleItem from "./ArticleItem";
import articles from "./mockedData";

const Wrapper = styled.div`
  padding: 0 16px;
  background-color: #f6f7f9;

  @media (min-width: 1440px) {
    padding: 0 65px;
  }
`;

const ArticlesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;

  @media (min-width: 740px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1440px) {
    grid-template-columns: 1fr 1fr 1fr;
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
    grid-template-columns: 1fr 200px 1fr;
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
    <SectionTitle title="Dubai in detail" subtitle="More stories, more inspiration" />

    <ArticlesWrapper>
      {articles.map(article => <ArticleItem article={article} key={article.id} />)}
    </ArticlesWrapper>

    <ActionWrapper>
      <ActionTitle>Book your flight to Asia featuring a stopover in Dubai</ActionTitle>
      <Button
        fontSize={16}
        onClick={() => {
          scrollToElement("search");
        }}
      >
        Search flights now
      </Button>
    </ActionWrapper>
  </Wrapper>
);

export default Articles;
