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
import type { ArticleType } from "../components/articles/ArticleItem";

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
  articles: ArticleType[],
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

    cookies.set("SKYPICKER_AFFILIATE", affilid || "acquisiton", {
      expires: 30,
      domain: ".www.kiwi.com",
    });

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
    const staticPath = `${isServer ? `http://localhost:3000` : ""}/static/`;
    const cityPath = `${staticPath}cities/${cityTag}/`;
    const translations = await fetchJson(`${cityPath}locales/${language.phraseApp}.json`);
    const cityData = await fetchJson(`${cityPath}cms_data.json`);
    const menuTranslations = await fetchJson(
      `${staticPath}locales/menuItems/${language.phraseApp}.json`,
    );
    const fetched = {
      ...fetchedDefault,
      brandLanguage,
    };

    const articles: ArticleType[] = Object.keys(cityData.articles).map(
      (id: string) => cityData.articles[id],
    );

    return {
      translations,
      menuTranslations,
      cityData,
      language,
      fetched,
      langId,
      currentPath: asPath,
      cityTag,
      articles,
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
      articles,
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
          metaDescription: translations?.metaDescription,
          metaTitle: translations?.metaTitle,
        });

    const socialPhotos = {
      twitter: cityData.photoForTwitterCard?.url,
      facebook: cityData.photoForFacebookCard?.url,
    };
    const areArticlesShown =
      ["en-GB", "en-US"].includes(language.phraseApp) &&
      Object.keys(cityData.articles).length !== 0;
    const sliderImages =
      cityData.sliderPhotos &&
      cityData.sliderPhotos.map(
        (image, index) =>
          image && {
            url: image.url,
            title: `Slide ${cityData.cityName} ${index + 1}`,
          },
      );
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
            <Menu
              langId={langId}
              isMobile={isMobile}
              cityTag={cityTag}
              isStopover={cityData.isStopover}
            />
          </FetchedProvider>
          <Hero logo={cityData.cityLogo} photo={cityData.mainPhoto} />
          <StickyAction />
          <Element name="slider">
            <SliderSection sliderImages={sliderImages} />
          </Element>
          <Element name="itinerary">
            <Itinerary data={cityData.itineraries} isMobile={isMobile} />
          </Element>
          <Element name="partners">
            <Partners logos={cityData.partnerLogos} />
          </Element>
          {areArticlesShown && (
            <Element name="articles">
              <Articles items={articles} />
            </Element>
          )}
          <Element name="video">
            <Video isGrey={!areArticlesShown} id={cityData.videoYoutubeUrl?.providerUid} />
          </Element>
          <Element name="search">
            <Search langId={langId} />
          </Element>
          <Footer langId={langId} />
          <Banner />
        </Provider>
      </React.Fragment>
    );
  }
}
