// @flow

import * as React from "react";
import { Element } from "react-scroll";
import InitIntl from "@kiwicom/nitro/lib/components/InitIntl";
import { Provider as IntlProvider } from "@kiwicom/nitro/lib/services/intl/context";
import { type LangInfo } from "@kiwicom/nitro/lib/records/LangInfo";
import { type Fetched, fetchedDefault } from "@kiwicom/nitro/lib/records/Fetched";
import { type Translations } from "@kiwicom/nitro/lib/services/intl/translate";
import { Provider as FetchedProvider } from "@kiwicom/nitro/lib/services/fetched/context";
import cookies from "js-cookie";
import "isomorphic-unfetch";

import { GA_TRACKING_ID } from "../etc/gtag";
import {
  filterLanguages,
  getLanguage,
  getBrandLanguage,
  getUserId,
  getCurrentUrlParams,
} from "../etc/helpers";
import fetchLowestPrice from "../etc/fetchLowestPrice";
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
import type { ArticleType } from "../components/articles/ArticleItem";

const isProd = process.env.NODE_ENV === "production";

const fetchJson = (url: string) => fetch(url).then(x => x.json());

type Query = {
  langId: string,
  from?: string,
  to?: string,
  cityTag: string,
  translateLocale: string,
  usedLocales: string[],
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
  usedLocales: string[],
};

type State = {
  areKeysShown: boolean,
  isMobile: boolean,
  isPriceLoaded: boolean,
  lowestPrice: string,
};

export default class Index extends React.Component<Props, State> {
  state = { areKeysShown: false, isMobile: false, lowestPrice: "", isPriceLoaded: false };

  async componentDidMount() {
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
    const lowestPrice =
      !this.props.cityData.isStopover &&
      (await fetchLowestPrice(this.props.cityData.searchWidgetDataLocation));
    if (lowestPrice) this.setState({ isPriceLoaded: true, lowestPrice });
  }

  componentWillUnmount() {
    window.document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    window.removeEventListener("resize", this.detectMobile);
  }

  detectMobile = () => {
    this.setState({ isMobile: window.innerWidth < 740 });
  };

  static async getInitialProps({
    query: { langId, usedLocales, cityTag },
    req,
    asPath,
  }: {
    query: Query,
    req: any,
    asPath: string,
  }) {
    const supportedLangs = filterLanguages(usedLocales);

    const currentLang = getLanguage(langId);
    const currentBrandLang = getBrandLanguage(langId, supportedLangs);

    // This string is in the same format as ISO locale, but does not always
    // correspond to it. For example: English (Canada) has 'en-CA' ISO code, but
    // 'en-GB' phraseApp code.
    const phraseAppLocale = usedLocales.includes(currentLang.phraseApp)
      ? currentLang.phraseApp
      : "en-GB";

    const isServer = !!req;
    const staticPath = `${isServer ? `http://localhost:3000` : ""}/static/`;
    const cityPath = `${staticPath}cities/${cityTag}/`;
    const translations = await fetchJson(`${cityPath}locales/${phraseAppLocale}.json`);
    const cityData = await fetchJson(`${cityPath}cms_data.json`);
    const menuTranslations = await fetchJson(
      `${staticPath}locales/menuItems/${phraseAppLocale}.json`,
    );

    const articles: ArticleType[] = Object.keys(cityData.articles).map(
      (id: string) => cityData.articles[id],
    );

    return {
      translations,
      menuTranslations,
      langId,
      cityTag,
      articles,
      usedLocales,
      language: currentLang,
      currentPath: asPath,
      cityData: {
        ...cityData,
      },
      fetched: {
        ...fetchedDefault,
        brandLanguage: currentBrandLang,
      },
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
      usedLocales,
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

    const socialPhotos = {
      twitter: cityData.photoForTwitterCard?.url,
      facebook: cityData.photoForFacebookCard?.url,
    };

    const areArticlesShown =
      ["en-GB", "en-US"].includes(language.phraseApp) &&
      Object.keys(cityData.articles).length !== 0;

    const sliderImagesObj = cityData.sliderPhotos;
    const sliderImages =
      sliderImagesObj &&
      Object.keys(sliderImagesObj).map(key => {
        const image = sliderImagesObj[key];
        return {
          id: key,
          url: image.url,
        };
      });

    const intl = {
      language,
      translations: areKeysShown
        ? {}
        : { ...translations, ...translationsForMenu, ...menuTranslations.footer },
    };

    return (
      <React.Fragment>
        <InitIntl raw={intl}>
          {intlFull => {
            const translate = (key, value) =>
              intlFull.translate(key, value).replace(/\[price\]/g, this.state.lowestPrice);

            return (
              <IntlProvider value={cityData.isStopover ? intlFull : { ...intlFull, translate }}>
                <MetaHead
                  locale={language.iso}
                  currentPath={currentPath}
                  socialPhotos={socialPhotos}
                  otherMetaTagIds={Object.keys(cityData.otherMetaTags)}
                />
                <FetchedProvider value={fetched}>
                  <Menu
                    lang={langId}
                    isMobile={isMobile}
                    cityTag={cityTag}
                    isStopover={cityData.isStopover}
                    usedLocales={usedLocales}
                  />
                </FetchedProvider>
                <Hero
                  logo={cityData.cityLogo}
                  photo={cityData.mainPhoto}
                  isPriceLoaderShown={!cityData.isStopover && !this.state.isPriceLoaded}
                />
                <StickyAction />
                <Element name="slider">
                  <SliderSection
                    sliderImages={sliderImages}
                    areItineraries={Object.keys(cityData.itineraries).length !== 0}
                  />
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
                  <Search
                    langId={langId}
                    isStopover={cityData.isStopover}
                    location={cityData.searchWidgetDataLocation}
                    affilid={cityData.searchWidgetDataAffilid}
                  />
                </Element>
                <Footer langId={langId} />
                <Banner />
              </IntlProvider>
            );
          }}
        </InitIntl>
      </React.Fragment>
    );
  }
}
