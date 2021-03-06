// @flow

import * as React from "react";
import styled from "styled-components";
import Translate from "@kiwicom/nitro/lib/components/Translate";
import { Button } from "@kiwicom/orbit-components";

import type { ArticleType } from "./ArticleItem";
import { scrollToElement } from "../helpers";
import SectionTitle from "../shared/SectionTitle";
import ArticleItem from "./ArticleItem";
import { sendEvent } from "../../etc/logLady";

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
  align-items: flex-start;
  align-content: flex-start;

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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0;

  @media (min-width: 740px) {
    padding: 60px 0 80px;
  }

  @media (min-width: 1440px) {
    justify-content: center;
    flex-direction: row;
    padding: 60px 0 80px;

    & > :first-child,
    & > :last-child {
      flex: 1;
      margin: 0 30px;
      text-align: end;
    }
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

type Props = {
  items: ArticleType[],
};

const Articles = ({ items }: Props) => (
  <Wrapper>
    <SectionTitle title="articlesSectionTitle" subtitle="articlesSectionSubtitle" />

    <ArticlesWrapper>
      {items.map(item => (
        <ArticleItem article={item} key={item.id} />
      ))}
    </ArticlesWrapper>

    <ActionWrapper>
      <ActionTitle>
        <Translate t="articlesSectionCtaDescription" />
      </ActionTitle>
      <Button
        size="large"
        onClick={() => {
          scrollToElement("search");
          sendEvent("bookNow");
        }}
      >
        <Translate t="articlesSectionCtaButtonText" />
      </Button>
      <div />
    </ActionWrapper>
  </Wrapper>
);

export default Articles;
