// @flow

import * as React from "react";
import styled from "styled-components";
import { Linkedin, Twitter, Instagram, Facebook } from "@kiwicom/orbit-components/lib/icons";
import Text from "@kiwicom/nitro/lib/components/Text";

import { UTM_PARAMS } from "../../etc/helpers";

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

const prepareLinks = (langId: ?string) => {
  const lang = langId || "en";
  return [
    {
      id: 1,
      title: "termsAndConditions",
      url: `https://www.kiwi.com/${lang}/pages/content/legal/${UTM_PARAMS}`,
    },
    {
      id: 2,
      title: "termsOfUse",
      url: `https://www.kiwi.com/${lang}/pages/content/terms/${UTM_PARAMS}`,
    },
    {
      id: 3,
      title: "privacyPolicy",
      url: `https://www.kiwi.com/${lang}/content/privacy/${UTM_PARAMS}`,
    },
    {
      id: 4,
      title: "security",
      url: `https://www.kiwi.com/${lang}/pages/security/${UTM_PARAMS}`,
    },
  ];
};

const icons = [
  {
    id: 1,
    component: <Instagram />,
    url: `https://www.instagram.com/kiwicom247/${UTM_PARAMS}`,
  },
  {
    id: 2,
    component: <Twitter />,
    url: `htts://twitter.com/kiwipcom247/${UTM_PARAMS}`,
  },
  {
    id: 3,
    component: <Linkedin />,
    url: `https://www.linkedin.com/company/Kiwi.com/${UTM_PARAMS}`,
  },
  {
    id: 4,
    component: <Facebook />,
    url: `https://www.facebook.com/kiwicom247/${UTM_PARAMS}`,
  },
];

type Props = {
  langId: ?string,
};

const Footer = ({ langId }: Props) => (
  <Wrapper>
    <LogoWrapper>
      <a href={`https://www.kiwi.com/${langId || "en"}/${UTM_PARAMS}`}>
        <Logo src="/static/images/logo.svg" alt="Kiwi.com" />
      </a>
    </LogoWrapper>
    <LinkWrapper>
      {prepareLinks(langId).map(link => (
        <Link href={link.url} key={link.id} target="_blank" rel="noopener noreferrer">
          <Text t={link.title} />
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
