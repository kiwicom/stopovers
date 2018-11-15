// @flow

import * as React from "react";
import styled from "styled-components";
import Language from "@kiwicom/nitro/lib/components/Language";
import Router from "next/router";
import HeaderLinks from "@kiwicom/nitro/lib/components/HeaderLinks";

import { getCurrentUrlParams } from "../../etc/helpers";

type Props = {
  lang: string,
  isMobile: boolean,
  cityTag: string,
  isStopover: boolean,
  usedLocales: string[],
};

const Wrapper = styled.div`
  display: flex;
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
  @media (max-width: 510px) {
    display: none;
  }
`;

const LogoMobile = styled.img`
  vertical-align: middle;
  @media (min-width: 511px) {
    display: none;
  }
`;

const LanguageWrapper = styled.div`
  ${({ isMobile }) => isMobile && "justify-self: flex-end;"};
  align-self: ${({ isMobile }) => (isMobile ? "center" : "flex-start")};
  margin-right: 5px;
  margin-left: 5px;
  position: relative;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  @media (min-width: 740px) {
    margin-right: 40px;
  }
`;

const Menu = ({ lang, isMobile, cityTag, isStopover, usedLocales }: Props) => {
  const cityType = isStopover ? "stopover" : "destination";
  return (
    <Wrapper>
      <LogoWrapper>
        <a href={`https://www.kiwi.com/${lang || "en"}/`}>
          <Logo src="/static/images/logo-menu.svg" alt="kiwicom logo" />
          <LogoMobile src="/static/images/logo-symbol.svg" alt="kiwicom logo" />
        </a>
      </LogoWrapper>
      <HeaderLinks
        linkFlights={`https://www.kiwi.com/${lang || "en"}/search/`}
        forceNewWindow
        linkRooms={`https://rooms.kiwi.com/?${lang ? `preflang=${lang}` : ""}&adplat=headerlinks`}
        linkCars={`https://cars.kiwi.com/?${lang ? `preflang=${lang}` : ""}&adplat=headerlinks`}
        linkHolidays="https://kiwicom.lastminute.com/flight-hotel/"
      />

      <LanguageWrapper isMobile={isMobile}>
        <Language
          flat
          native={isMobile}
          onChange={langId => {
            const currentParams = getCurrentUrlParams();
            // eslint-disable-next-line fp/no-mutating-methods
            Router.push(
              {
                pathname: "/",
                query: { ...currentParams, langId, cityTag, usedLocales },
              },
              `/${langId}/${cityType}s/${cityTag.split("_")[0]}/`,
            );
          }}
        />
      </LanguageWrapper>
    </Wrapper>
  );
};

export default Menu;
