// @flow
import * as React from "react";
import styled from "styled-components";

import { Link } from "../shared/Button";

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
  color: #46515e;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: 300;
  color: #46515e;
  line-height: 1.2;
`;

const LinkWrapper = styled.div`
  display: grid;
  justify-items: right;
  margin-bottom: 10px;
`;

const ArticleItem = ({ article }: Props) => (
  <Article>
    <ArticleThumbnail src={article.imageUrl} />
    <ArticleTextWrapper>
      <Title>{article.title}</Title>
      <Description>{article.description}</Description>
    </ArticleTextWrapper>

    <LinkWrapper>
      <Link href={article.linkUrl} target="_blank">
        {article.linkTitle}
      </Link>
    </LinkWrapper>
  </Article>
);

export default ArticleItem;
