// @flow

import * as React from "react";
import styled from "styled-components";
import { ButtonLink } from "@kiwicom/orbit-components";
import { ChevronRight } from "@kiwicom/orbit-components/lib/icons";

import { sendEvent } from "../../etc/logLady";

type ArticleType = {|
  id: number,
  title: string,
  description: string,
  linkTitle: string,
  linkUrl: string,
  imageUrl: string,
|};

type Props = {|
  article: ArticleType,
|};

const Article = styled.div`
  flex: 1;
  box-shadow: 0 4px 12px 0 rgba(23, 27, 30, 0.15);
  background-color: #ffffff;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: 740px) {
    flex-direction: row;
    min-width: 288px;
    margin-bottom: 0;
    margin-right: 30px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const ArticleThumbnail = styled.div`
  background: url(${({ src }) => src}) no-repeat 0 0;
  background-size: cover;
  height: 200px;
`;

const ArticleTextWrapper = styled.div`
  padding: 26px 16px 10px;
`;

const Title = styled.h3`
  font-size: 24px;
  line-height: 1.2;
  font-weight: 300;
  margin-bottom: 16px;
`;

const TitleLink = styled.a`
  color: #46515e;
  text-decoration: none;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: 300;
  color: #46515e;
  line-height: 1.5;
`;

const LinkWrapper = styled.div`
  display: grid;
  justify-items: right;
  margin-bottom: 10px;
  padding-right: 10px;
`;

const ArticleItem = ({ article }: Props) => (
  <Article>
    <ArticleThumbnail src={article.imageUrl} />
    <ArticleTextWrapper>
      <Title>
        <TitleLink
          onClick={() => {
            sendEvent("goToStories", article.linkUrl);
          }}
          href={article.linkUrl}
          target="_blank"
          rel="noopener"
        >
          {article.title}
        </TitleLink>
      </Title>
      <Description>{article.description}</Description>
    </ArticleTextWrapper>

    <LinkWrapper>
      <ButtonLink
        onClick={() => {
          sendEvent("goToStories", article.linkUrl);
        }}
        href={article.linkUrl}
        external
        type="secondary"
        icon={<ChevronRight />}
      >
        {article.linkTitle}
      </ButtonLink>
    </LinkWrapper>
  </Article>
);

export default ArticleItem;
