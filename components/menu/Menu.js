// @flow

import * as React from "react";
import styled from "styled-components";
import Text from "@kiwicom/nitro/lib/components/Text";
import Language from "@kiwicom/nitro/lib/components/Language";
import Router from "next/router";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 99px 1fr auto;
  height: 50px;
  align-items: center;
  padding-left: 10px;
`;

const LogoWrapper = styled.div`
  margin-right: 10px;
  padding: 5px 0;
  place-self: center;
`;

const Logo = styled.img`
  vertical-align: middle;
`;

const LanguageWrapper = styled.div`
  justify-self: end;
  padding-right: 10px;
  @media (min-width: 740px) {
    padding-right: 40px;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Link = styled.a`
  font-size: 12px;
  color: #46515e;
  text-decoration: none;
  margin-right: 10px;
  @media (min-width: 740px) {
    margin-right: 0;
    margin-left: 20px;
  }
`;

const links = [
  {
    id: 1,
    title: "travel",
    url: "https://www.kiwi.com/search",
  },
  { id: 2, title: "rooms", url: "https://rooms.kiwi.com" },
  { id: 3, title: "cars", url: "https://cars.kiwi.com" },
  {
    id: 4,
    title: "holidays",
    url: "https://kiwicom.lastminute.com/flight-hotel",
  },
];

const isProd = process.env.NODE_ENV === "production";

const Menu = () => (
  <Wrapper>
    <LogoWrapper>
      <a href="https://www.kiwi.com">
        <Logo src="/static/images/logo-menu.svg" alt="kiwicom logo" />
      </a>
    </LogoWrapper>
    <Links>
      {links.map(link => (
        <Link href={link.url} key={link.id} target="_blank" rel="noopener noreferrer">
          <Text t={link.title} />
        </Link>
      ))}
    </Links>
    <LanguageWrapper>
      <Language
        flat
        onChange={lang => {
          // eslint-disable-next-line fp/no-mutating-methods
          Router.push({
            pathname: isProd ? `/${lang}/stopovers/dubai/` : "/",
            query: isProd ? {} : { lang },
          });
        }}
      />
    </LanguageWrapper>
  </Wrapper>
);

export default Menu;
