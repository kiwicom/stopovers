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
  box-shadow: 0 4px 12px 0 rgba(23, 27, 30, 0.15);
  background-color: #ffffff;
`;

const ArticleThumbnail = styled.div`
  background: url(${({ src }) => src}) no-repeat 0 0;
  background-size: cover;
  height: 250px;
`;

const ArticleText = styled.div`
  padding: 20px;
`;

const LinkWrapper = styled.div`
  padding: 20px 0 10px;
  text-align: right;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 300;
  color: #46515e;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: 300;
  color: #46515e;
`;

const ArticleItem = ({ article }: Props) => (
  <Article>
    <ArticleThumbnail src={article.imageUrl} />
    <ArticleText>
      <Title fontSize={24}>{article.title}</Title>
      <Description>{article.description}</Description>
      <LinkWrapper>
        <Link href={article.linkUrl} target="_blank">
          {article.linkTitle}
        </Link>
      </LinkWrapper>
    </ArticleText>
  </Article>
);

export default ArticleItem;
