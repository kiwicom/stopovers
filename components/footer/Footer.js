// @flow
import * as React from "react";
import styled from "styled-components";
// $FlowFixMe
import { Linkedin, Twitter, Instagram, Facebook } from "@kiwicom/orbit-components/lib/icons";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 120px 1fr 90px;
  border-top: 2px solid #f5f7f9;
  place-items: center;

  @media (min-width: 740px) {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 189px 1fr;
    justify-items: start;
    padding: 40px 32px;
  }

  @media (min-width: 1440px) {
    grid-template-rows: 1fr;
    grid-template-columns: 189px 1fr 220px;
    justify-items: start;
    padding: 46px 50px;
  }
`;

const LogoWrapper = styled.div`
  place-self: center;

  @media (min-width: 740px) {
    justify-self: start;
    align-self: center;
    grid-row: 1 / 3;
  }
`;

const Logo = styled.img`
  vertical-align: middle;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 740px) {
    flex-direction: row;
    justify-self: end;
    align-self: center;
    padding: 12px 0;
    order: 1;
  }

  @media (min-width: 1440px) {
    flex-direction: row;
    justify-self: start;
    align-self: center;
    padding: 12px 0;
    order: 0;
  }
`;

const Link = styled.a`
  font-size: 14px;
  color: #7f91a8;
  text-decoration: none;

  &:not(:last-child) {
    margin-bottom: 24px;

    @media (min-width: 740px) {
      margin-bottom: 0;
      margin-right: 24px;
    }
  }
`;

const Icons = styled.div`
  > * {
    color: #bac7d5;

    &:not(:last-child) {
      margin-right: 24px;
    }
  }

  @media (min-width: 740px) {
    justify-self: end;
    align-self: center;
    padding: 12px 0;
  }
`;

const links = [
  {
    id: 1,
    title: "Terms & Conditions",
    url: "https://www.kiwi.com/en/pages/content/legal",
  },
  { id: 2, title: "Terms of Use", url: "https://www.kiwi.com/en/pages/content/terms" },
  { id: 3, title: "Privacy Policy", url: "https://www.kiwi.com/en/content/privacy" },
  { id: 4, title: "Security", url: "https://www.kiwi.com/en/pages/security" },
];

const icons = [
  {
    id: 1,
    component: <Instagram />,
    url: "https://www.instagram.com/kiwicom247/",
  },
  {
    id: 2,
    component: <Twitter />,
    url: "https://twitter.com/kiwicom247",
  },
  {
    id: 3,
    component: <Linkedin />,
    url: "https://www.linkedin.com/company/Kiwi.com",
  },
  {
    id: 4,
    component: <Facebook />,
    url: "https://www.facebook.com/kiwicom247",
  },
];

const Footer = () => (
  <Wrapper>
    <LogoWrapper>
      <a href="https://kiwi.com">
        <Logo src="static/images/logo.svg" alt="Kiwi.com" />
      </a>
    </LogoWrapper>
    <LinkWrapper>
      {links.map(link => (
        <Link href={link.url} key={link.id} target="_blank" rel="noopener noreferrer">
          {link.title}
        </Link>
      ))}
    </LinkWrapper>
    <Icons>
      {icons.map(icon => (
        <a href={icon.url} key={icon.id} target="_blank" rel="noopener noreferrer">
          {icon.component}
        </a>
      ))}
    </Icons>
  </Wrapper>
);

export default Footer;
