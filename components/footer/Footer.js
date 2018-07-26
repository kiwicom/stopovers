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
    grid-template-rows: 118px;
    grid-template-columns: 189px 1fr 220px;
    justify-items: start;
  }
`;

const LogoWrapper = styled.div`
  margin: 0;
  padding: 0;
  place-self: center;
  vertical-align: middle;
`;

const Logo = styled.img`
  vertical-align: middle;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 740px) {
    flex-direction: row;
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
`;

const links = [
  {
    title: "Terms & Conditions",
    url: "https://www.kiwi.com/en/pages/content/legal",
  },
  { title: "Terms of Use", url: "https://www.kiwi.com/en/pages/content/terms" },
  { title: "Privacy Policy", url: "https://www.kiwi.com/en/content/privacy" },
  { title: "Security", url: "https://www.kiwi.com/en/pages/security" },
];

const icons = [
  {
    component: <Instagram />,
    url: "https://www.instagram.com/kiwicom247/",
  },
  {
    component: <Twitter />,
    url: "https://twitter.com/kiwicom247",
  },
  {
    component: <Linkedin />,
    url: "https://www.linkedin.com/company/Kiwi.com",
  },
  {
    component: <Facebook />,
    url: "https://www.facebook.com/kiwicom247",
  },
];

const Footer = () => (
  <Wrapper>
    <LogoWrapper>
      <Logo src="static/images/logo.svg" alt="kiwicom logo" />
    </LogoWrapper>
    <Links>
      {links.map(link => (
        <Link href={link.url} target="_blank" rel="noopener noreferrer">
          {link.title}
        </Link>
      ))}
    </Links>
    <Icons>
      {icons.map(icon => (
        <a href={icon.url} target="_blank" rel="noopener noreferrer">
          {icon.component}
        </a>
      ))}
    </Icons>
  </Wrapper>
);

export default Footer;
