// @flow

import * as React from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import Translate from "@kiwicom/nitro/lib/components/Translate";
import { Button, ButtonLink } from "@kiwicom/orbit-components";
import { ArrowDown } from "@kiwicom/orbit-components/lib/icons";
import { Consumer as IntlConsumer } from "@kiwicom/nitro/lib/services/intl/context";

import { sendEvent } from "../../etc/logLady";
import { scrollToElement } from "../helpers";
import ItineraryItem from "./ItineraryItem";
import ItineraryProvider, { ItineraryContext, type Context } from "./ItineraryContext";
import SectionTitle from "../shared/SectionTitle";
import DropdownMobile, { renderDropdownItem } from "../shared/DropdownMobile";
import Dropdown from "../shared/Dropdown";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  margin: 0 auto;
  @media (min-width: 740px) {
    width: 60%;
  }
  @media (min-width: 1440px) {
    width: 70%;
  }
`;

const ItineraryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 0;
  padding-top: 40px;

  justify-items: center;

  @media (min-width: 1440px) {
    padding-bottom: 60px;

    padding-top: 0;
    background-image: none;
  }

  &:before {
    content: "";
    position: absolute;
    top: 300px;
    left: 28px;
    height: calc(100% - 300px);
    width: 2px;
    background: #e8e8e8;

    @media (min-width: 1440px) {
      left: 50%;
      margin-left: -2px;
    }
  }
  ${({ isCutBottom }) =>
    isCutBottom &&
    `&:after {
    content: "";
    position: absolute;
    bottom: 0;
    height: 120px;
    width: 100%;
    background-image: linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0));
  }`};
`;

const StyledButton = styled(Button)`
  align-self: center;
  margin-top: 35px;
  @media (min-width: 740px) {
    margin-bottom: 40px;
  }
  @media (min-width: 1440px) {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

const StyledLink = styled(ButtonLink)`
  align-self: start;
  margin-left: 9px;
  margin-top: 10px;
`;

const DropdownWrapper = styled.div`
  display: none;

  @media (min-width: 1440px) {
    position: relative;
    display: block;
    width: 26%;
    margin: 0 25px;
  }
`;

const DropdownWrapperMobile = styled.div`
  position: relative;
  margin-top: 10px;
  margin-bottom: 46px;

  &:after {
    content: "";
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 5;
    transform: rotate(45deg);
    border: solid #7f91a8;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
  }

  @media (min-width: 1440px) {
    display: none;
  }
`;

const DropdownGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1440px) {
    flex-direction: row;
    margin-top: -50px;
    margin-bottom: 46px;
  }
`;

const DropdownTitle = styled.div`
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5;
  color: #46515e;

  @media (min-width: 1440px) {
    margin-bottom: 0;
    width: calc(37% - 25px);
    text-align: right;
  }
`;

export type Tip = {
  id: string,
  photo: {
    url: string,
  },
  time: string,
};

type Tips = {
  [key: string]: Tip,
};

type Props = {
  isMobile: boolean,
  data: {
    [key: string]: {
      id: string,
      tips: Tips,
    },
  },
};

const Itinerary = ({ isMobile, data }: Props) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }
  return (
    <ItineraryProvider defaultValue={Object.keys(data)[0]}>
      <ItineraryContext.Consumer>
        {({ state: { dropdownValue, isCollapsed }, changeDropdownValue, showMore }: Context) => {
          const isMobileCollapsed = isMobile && isCollapsed;
          const itineraryTips: Tips = data[dropdownValue].tips;
          const items: Tip[] = Object.keys(itineraryTips).map(tipId => itineraryTips[tipId]);
          const itemsDisplayed = isMobileCollapsed ? items.slice(0, 2) : items;
          return (
            <Wrapper>
              <ItineraryWrapper isCutBottom={isMobileCollapsed}>
                <SectionTitle title="itinerarySectionTitle" subtitle="itinerarySectionSubtitle" />
                <DropdownGroup>
                  <DropdownTitle>
                    <Translate t="itinerarySelectorDescription" />
                  </DropdownTitle>
                  <DropdownWrapperMobile>
                    <DropdownMobile
                      onChange={(e: SyntheticEvent<HTMLSelectElement>) => {
                        const { value } = e.currentTarget;
                        changeDropdownValue(value);
                      }}
                    >
                      <IntlConsumer>
                        {intl =>
                          Object.keys(data).map((id: string) =>
                            renderDropdownItem(id, intl.translate(`itineraries.${id}.title`)),
                          )
                        }
                      </IntlConsumer>
                    </DropdownMobile>
                  </DropdownWrapperMobile>
                  <DropdownWrapper>
                    <Dropdown
                      onChange={changeDropdownValue}
                      options={Object.keys(data).map(id => ({
                        value: id,
                        label: `itineraries.${id}.title`,
                      }))}
                    />
                  </DropdownWrapper>
                </DropdownGroup>

                <Fade>
                  {itemsDisplayed.map((itineraryItem, index) => (
                    <ItineraryItem
                      itineraryId={dropdownValue}
                      key={itineraryItem.id}
                      item={itineraryItem}
                      order={index}
                      hasNoMargin={isMobile && itemsDisplayed.length === index + 1}
                    />
                  ))}
                </Fade>
              </ItineraryWrapper>
              {isMobile &&
                isCollapsed && (
                  <StyledLink
                    type="secondary"
                    icon={<ArrowDown color="secondary" />}
                    onClick={() => showMore()}
                  >
                    <Translate t="showMore" />
                  </StyledLink>
                )}
              <StyledButton
                size="large"
                onClick={() => {
                  scrollToElement("search");
                  sendEvent("startYourTrip");
                }}
              >
                <Translate t="itineraryCtaButtonText" />
              </StyledButton>
            </Wrapper>
          );
        }}
      </ItineraryContext.Consumer>
    </ItineraryProvider>
  );
};

export default Itinerary;
