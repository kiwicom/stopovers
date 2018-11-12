// @flow

import * as React from "react";
import styled from "styled-components";
import Language from "@kiwicom/nitro/lib/components/Language";
import Router from "next/router";
import HeaderLinks from "@kiwicom/nitro/lib/components/HeaderLinks";

import { getCurrentUrlParams } from "../../etc/helpers";

type Props = {
  langId: ?string,
  isMobile: boolean,
  cityTag: string,
  isStopover: boolean,
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

const Menu = ({ langId, isMobile, cityTag, isStopover }: Props) => {
  const cityType = isStopover ? "stopover" : "destination";
  return (
    <Wrapper>
      <LogoWrapper>
        <a href={`https://www.kiwi.com/${langId || "en"}/`}>
          <Logo src="/static/images/logo-menu.svg" alt="kiwicom logo" />
        </a>
      </LogoWrapper>
      <HeaderLinks
        linkFlights={`https://www.kiwi.com/${langId || "en"}/search/`}
        forceNewWindow
        linkRooms={`https://rooms.kiwi.com/?${
          langId ? `preflang=${langId}` : ""
        }&adplat=headerlinks`}
        linkCars={`https://cars.kiwi.com/?${langId ? `preflang=${langId}` : ""}&adplat=headerlinks`}
        linkHolidays="https://kiwicom.lastminute.com/flight-hotel/"
      />

      <LanguageWrapper isMobile={isMobile}>
        <Language
          flat
          native={isMobile}
          onChange={lang => {
            const currentParams = getCurrentUrlParams();
            // eslint-disable-next-line fp/no-mutating-methods
            Router.push(
              {
                pathname: "/",
                query: { ...currentParams, lang, cityTag },
              },
              `/${lang}/${cityType}s/${cityTag.split("_")[0]}/`,
            );
          }}
        />
      </LanguageWrapper>
    </Wrapper>
  );
};

export default Menu;
