// @flow

import * as React from "react";
import styled from "styled-components";
import Text from "@kiwicom/nitro/lib/components/Text";
import Language from "@kiwicom/nitro/lib/components/Language";
import Router from "next/router";

import { getCurrentUrlParams, UTM_PARAMS } from "../../etc/helpers";

type Props = {
  langId: ?string,
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 99px auto auto;
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
  padding-right: 5px;
  padding-left: 5px;
  @media (min-width: 740px) {
    padding-right: 40px;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  overflow-x: auto;
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

const Menu = ({ langId }: Props) => (
  <Wrapper>
    <LogoWrapper>
      <a href={`https://www.kiwi.com/${UTM_PARAMS}`}>
        <Logo src="/static/images/logo-menu.svg" alt="kiwicom logo" />
      </a>
    </LogoWrapper>
    <Links>
      <Link
        href={`https://www.kiwi.com/search/${UTM_PARAMS}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text t="travel" />
      </Link>

      <Link
        href={`https://rooms.kiwi.com/?${langId ? `preflang=${langId}&` : ""}adplat=headerlinks`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text t="rooms" />
      </Link>

      <Link
        href={`https://cars.kiwi.com/?${langId ? `preflang=${langId}&` : ""}adplat=headerlinks`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text t="cars" />
      </Link>

      <Link
        href={`https://kiwicom.lastminute.com/flight-hotel/${UTM_PARAMS}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text t="holidays" />
      </Link>
    </Links>
    <LanguageWrapper>
      <Language
        flat
        onChange={lang => {
          const currentParams = getCurrentUrlParams();
          // eslint-disable-next-line fp/no-mutating-methods
          Router.push(
            {
              pathname: "/",
              query: { ...currentParams, lang },
            },
            `/${lang}/stopovers/dubai/`,
          );
        }}
      />
    </LanguageWrapper>
  </Wrapper>
);

export default Menu;
