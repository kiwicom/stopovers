// @flow

import * as React from "react";
import styled from "styled-components";
import { ButtonLink } from "@kiwicom/orbit-components";
import { ChevronRight } from "@kiwicom/orbit-components/lib/icons";

import { sendEvent } from "../../etc/logLady";

export type ArticleType = {|
  id: string,
  title: string,
  description: string,
  linkText: string,
  url: string,
  photo: { url: string },
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
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  padding-right: 10px;
`;

const ArticleItem = ({ article }: Props) => (
  <Article>
    <ArticleThumbnail src={`${article.photo.url}?w=700`} />
    <ArticleTextWrapper>
      <Title>
        <TitleLink
          onClick={() => {
            sendEvent("goToStories", article.url);
          }}
          href={article.url}
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
          sendEvent("goToStories", article.url);
        }}
        href={article.url}
        external
        type="secondary"
        icon={<ChevronRight />}
      >
        {article.linkText}
      </ButtonLink>
    </LinkWrapper>
  </Article>
);

export default ArticleItem;
