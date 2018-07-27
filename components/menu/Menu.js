// @flow
import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 99px 1fr;
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

const Links = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Link = styled.a`
  font-size: 12px;
  color: #46515e;
  text-decoration: none;
  margin-left: 20px;
`;

const links = [
  {
    id: 1,
    title: "Travel",
    url: "https://www.kiwi.com/search",
  },
  { id: 2, title: "Rooms", url: "https://rooms.kiwi.com" },
  { id: 3, title: "Cars", url: "https://cars.kiwi.com" },
  {
    id: 4,
    title: "Holidays",
    url: "https://kiwicom.lastminute.com/flight-hotel",
  },
];

const Menu = () => (
  <Wrapper>
    <LogoWrapper>
      <Logo src="static/images/logo-menu.svg" alt="kiwicom logo" />
    </LogoWrapper>
    <Links>
      {links.map(link => (
        <Link href={link.url} key={link.id} target="_blank" rel="noopener noreferrer">
          {link.title}
        </Link>
      ))}
    </Links>
  </Wrapper>
);

export default Menu;
