// @flow

import * as React from "react";
import styled from "styled-components";
import Language from "@kiwicom/nitro/lib/components/Language";
import Router from "next/router";
import HeaderLinks from "@kiwicom/nitro/lib/components/HeaderLinks";

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

const Menu = ({ langId }: Props) => (
  <Wrapper>
    <LogoWrapper>
      <a href={`https://www.kiwi.com/${langId || "en"}/${UTM_PARAMS}`}>
        <Logo src="/static/images/logo-menu.svg" alt="kiwicom logo" />
      </a>
    </LogoWrapper>
    <HeaderLinks
      linkFlights={`https://www.kiwi.com/${langId || "en"}/searchDeep${UTM_PARAMS}&pageName=search`}
      linkRooms={`https://rooms.kiwi.com/${UTM_PARAMS}${
        langId ? `&preflang=${langId}` : ""
      }&adplat=headerlinks`}
      linkCars={`https://cars.kiwi.com/${UTM_PARAMS}${
        langId ? `&preflang=${langId}` : ""
      }&adplat=headerlinks`}
      linkHolidays={`https://kiwicom.lastminute.com/flight-hotel/${UTM_PARAMS}`}
    />

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
