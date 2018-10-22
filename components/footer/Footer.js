// @flow

import * as React from "react";
import styled from "styled-components";
import { Linkedin, Twitter, Instagram, Facebook } from "@kiwicom/orbit-components/lib/icons";
import Text from "@kiwicom/nitro/lib/components/Text";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 2px solid #f5f7f9;
  padding: 24px;

  @media (min-width: 740px) {
    flex-direction: row;
    padding: 40px 50px;
  }
`;

const LogoWrapper = styled.div`
  margin: 0 0 40px 0;

  @media (min-width: 740px) {
    margin: 0 50px 0 0;
  }
`;

const Logo = styled.img`
  vertical-align: middle;
`;

const LinksAndIconsWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-end;

  @media (min-width: 1440px) {
    flex-direction: row;
    align-items: center;
  }
  @media (max-width: 740px) {
    align-items: center;
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;

  @media (min-width: 740px) {
    margin: 0;
    flex-direction: row;

    @media (max-width: 1440px) {
      margin-top: 24px;
    }
  }
`;

const Link = styled.a`
  font-size: 14px;
  color: #7f91a8;
  text-decoration: none;

  &:not(:last-child) {
    @media (max-width: 740px) {
      margin-bottom: 24px;
    }
    @media (min-width: 740px) {
      margin-right: 24px;
    }
  }
`;

const Icons = styled.div`
  margin-left: auto;

  @media (min-width: 740px) {
    @media (max-width: 1440px) {
      order: -1;
    }
  }
`;

const IconsLink = styled.a`
  :not(:last-child) {
    margin-right: 24px;
  }
`;

const prepareLinks = (langId: ?string) => {
  const lang = langId || "en";
  return [
    {
      id: 1,
      title: "termsAndConditions",
      url: `https://www.kiwi.com/${lang}/pages/content/legal/`,
    },
    {
      id: 2,
      title: "termsOfUse",
      url: `https://www.kiwi.com/${lang}/pages/content/terms/`,
    },
    {
      id: 3,
      title: "privacyPolicy",
      url: `https://www.kiwi.com/${lang}/content/privacy/`,
    },
    {
      id: 4,
      title: "security",
      url: `https://www.kiwi.com/${lang}/pages/security/`,
    },
  ];
};

const icons = [
  {
    id: 1,
    component: <Instagram color="tertiary" />,
    url: `https://www.instagram.com/kiwicom247/`,
  },
  {
    id: 2,
    component: <Twitter color="tertiary" />,
    url: `https://twitter.com/kiwicom247/`,
  },
  {
    id: 3,
    component: <Linkedin color="tertiary" />,
    url: `https://www.linkedin.com/company/Kiwi.com/`,
  },
  {
    id: 4,
    component: <Facebook color="tertiary" />,
    url: `https://www.facebook.com/kiwicom247/`,
  },
];

type Props = {
  langId: ?string,
};

const Footer = ({ langId }: Props) => (
  <Wrapper>
    <LogoWrapper>
      <a href={`https://www.kiwi.com/${langId || "en"}/`}>
        <Logo src="/static/images/logo.svg" alt="Kiwi.com" />
      </a>
    </LogoWrapper>
    <LinksAndIconsWrapper>
      <LinksWrapper>
        {prepareLinks(langId).map(link => (
          <Link href={link.url} key={link.id} target="_blank" rel="noopener noreferrer">
            <Text t={link.title} />
          </Link>
        ))}
      </LinksWrapper>
      <Icons>
        {icons.map(icon => (
          <IconsLink href={icon.url} key={icon.id} target="_blank" rel="noopener noreferrer">
            {icon.component}
          </IconsLink>
        ))}
      </Icons>
    </LinksAndIconsWrapper>
  </Wrapper>
);

export default Footer;
