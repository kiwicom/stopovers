// @flow

import * as React from "react";
import { Element } from "react-scroll";
import { Provider } from "@kiwicom/nitro/lib/services/intl/context";
import { type LangInfos, type LangInfo } from "@kiwicom/nitro/lib/records/LangInfo";
import { type BrandLanguage } from "@kiwicom/nitro/lib/records/BrandLanguage";
import { type Fetched, fetchedDefault } from "@kiwicom/nitro/lib/records/Fetched";
import { type Translations } from "@kiwicom/nitro/lib/services/intl/translate";
import { Provider as FetchedProvider } from "@kiwicom/nitro/lib/services/fetched/context";
import cookies from "js-cookie";
import "isomorphic-unfetch";

import { GA_TRACKING_ID } from "../etc/gtag";
import {
  filterLanguages,
  filterBrandLanguage,
  mapLanguage,
  usedLangIds,
  getUserId,
  getCurrentUrlParams,
} from "../etc/helpers";
import { sendEvent } from "../etc/logLady";
import { saveToSession } from "../etc/marketingHelpers";
import MetaHead from "../components/shared/MetaHead";
import Menu from "../components/menu/Menu";
import Hero from "../components/hero/Hero";
import SliderSection from "../components/sliderSection/SliderSection";
import Itinerary from "../components/itinerary/Itinerary";
import Partners from "../components/partners/Partners";
import Articles from "../components/articles/Articles";
import Video from "../components/video/Video";
import Search from "../components/search/Search";
import Footer from "../components/footer/Footer";
import Banner from "../components/banner/Banner";
import StickyAction from "../components/stickyAction/StickyAction";
import langsData from "../static/languages.json";
import brandLangsData from "../static/brandLanguages.json";

const isProd = process.env.NODE_ENV === "production";

const fetchJson = (url: string) => fetch(url).then(x => x.json());

type Query = {
  lang?: string,
  from?: string,
  to?: string,
  cityTag: string,
};

type Props = {
  translations: Translations,
  language: LangInfo,
  fetched: Fetched,
  langId: string,
  currentPath: string,
  socialPhotos: { twitter: ?string, facebook: ?string },
  menuTranslations: { header: { [key: string]: string }, footer: { [key: string]: string } },
  cityTag: string,
  cityData: Object,
};

type State = {
  areKeysShown: boolean,
  isMobile: boolean,
};

export default class Index extends React.Component<Props, State> {
  state = { areKeysShown: false, isMobile: false };

  componentDidMount() {
    this.detectMobile();
    window.addEventListener("resize", this.detectMobile);
    window.document.addEventListener("keydown", this.handleKeyDown.bind(this));
    const { affilid, ...marketingParams } = getCurrentUrlParams();
    if (affilid) {
      cookies.set("SKYPICKER_AFFILIATE", affilid, { expires: 30 });
    }
    saveToSession(marketingParams);
    window.gtag("config", GA_TRACKING_ID, {
      client_id: getUserId(),
      dimension1: "stopovers",
      send_page_view: isProd,
    });
    sendEvent("pageLoaded");
  }

  componentWillUnmount() {
    window.document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    window.removeEventListener("resize", this.detectMobile);
  }

  detectMobile = () => {
    this.setState({ isMobile: window.innerWidth < 740 });
  };

  static async getInitialProps({
    query: { lang, cityTag },
    req,
    asPath,
  }: {
    query: Query,
    req: any,
    asPath: string,
  }) {
    const langId = lang && usedLangIds.includes(lang) ? lang : "en";
    const langInfos: LangInfos = filterLanguages(langsData);
    const brandLanguage: BrandLanguage = filterBrandLanguage(brandLangsData, langId);
    const language = mapLanguage(brandLanguage.languages[langId], langInfos[langId]);
    const isServer = !!req;
    const staticPath = `${isServer ? `http://localhost:3000` : ""}/static`;
    const cityPath = `${staticPath}/cities/${cityTag}`;
    const translations = await fetchJson(`${cityPath}/locales/${language.phraseApp}.json`);
    const cityData = await fetchJson(`${cityPath}/cms_data.json`);
    const menuTranslations = await fetchJson(
      `${staticPath}/locales/menuItems/${language.phraseApp}.json`,
    );
    const fetched = {
      ...fetchedDefault,
      brandLanguage,
    };
    return {
      translations,
      menuTranslations,
      cityData,
      language,
      fetched,
      langId,
      currentPath: asPath,
      cityTag,
    };
  }

  handleKeyDown(event: SyntheticKeyboardEvent<>) {
    const keyCode = "which" in event ? event.which : event.keyCode;
    if (event.altKey && event.ctrlKey && keyCode === 84) {
      this.setState(prevState => ({
        areKeysShown: !prevState.areKeysShown,
      }));
    }
  }

  render() {
    const {
      translations,
      menuTranslations,
      language,
      fetched,
      langId,
      currentPath,
      cityData,
      cityTag,
    } = this.props;
    const { isMobile, areKeysShown } = this.state;
    const translationsForMenu = menuTranslations
      ? {
          "search.service.travel_anywhere": menuTranslations.header.travel,
          "search.service.holidays": menuTranslations.header.holidays,
          "search.service.cars": menuTranslations.header.cars,
          "search.service.rooms": menuTranslations.header.rooms,
        }
      : {};

    const translationsForHead =
      translations &&
      Object.keys(translations)
        .filter(key => /otherMetaTags/.test(key))
        .reduce((result, key) => ({ ...result, [key]: translations[key] }), {
          metaDescription: translations.metaDescription,
          metaTitle: translations.metaTitle,
        });

    // TODO: introduce optional chaining to the app for undefined check
    // see https://github.com/tc39/proposal-optional-chaining
    const socialPhotos = {
      twitter: cityData.photoForTwitterCard.url,
      facebook: cityData.photoForFacebookCard.url,
    };
    const areArticlesShown = ["en-GB", "en-US"].includes(language.phraseApp);
    return (
      <React.Fragment>
        <Provider
          translations={
            areKeysShown
              ? {}
              : { ...translations, ...translationsForMenu, ...menuTranslations.footer }
          }
          language={language}
        >
          <MetaHead
            translations={translationsForHead}
            locale={language.iso}
            currentPath={currentPath}
            socialPhotos={socialPhotos}
            otherMetaTagIds={Object.keys(cityData.otherMetaTags)}
          />
          <FetchedProvider value={fetched}>
            <Menu langId={langId} isMobile={isMobile} cityTag={cityTag} />
          </FetchedProvider>
          <Hero logo={cityData.cityLogo} photo={cityData.mainPhoto} />
          <StickyAction />
          {/* <Element name="slider">
            <SliderSection />
          </Element>
          <Element name="itinerary">
            <Itinerary isMobile={isMobile} />
          </Element>
          <Element name="partners">
            <Partners />
          </Element>
          {areArticlesShown && (
            <Element name="articles">
              <Articles />
            </Element>
          )}
          <Element name="video">
            <Video isGrey={!areArticlesShown} />
          </Element>
          <Element name="search">
            <Search langId={langId} />
          </Element>
          <Footer langId={langId} />
          <Banner /> */}
        </Provider>
      </React.Fragment>
    );
  }
}
