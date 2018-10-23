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

type Query = {
  lang?: string,
  from?: string,
  to?: string,
};

type Props = {
  translations: Translations,
  language: LangInfo,
  fetched: Fetched,
  langId: string,
  currentPath: string,
  socialPhotos: { twitter: ?string, facebook: ?string },
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
    query: { lang },
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
    const translationsUrl = `${isServer ? `http://localhost:3000` : ""}/static/locales/${
      language.phraseApp
    }.json`;
    const translations = await fetch(translationsUrl).then(x => x.json());
    const fetched = {
      ...fetchedDefault,
      brandLanguage,
    };
    return {
      translations,
      language,
      fetched,
      langId,
      currentPath: asPath,
      socialPhotos: {
        twitter:
          "https://www.datocms-assets.com/7631/1539703853-dubaitwittersummaryimage1200x643.jpg",
        facebook: "https://www.datocms-assets.com/7631/1539703866-dubaifacebook1200x630.png",
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
    const { translations, language, fetched, langId, currentPath, socialPhotos } = this.props;
    const { isMobile, areKeysShown } = this.state;
    const translationsForMenu = translations
      ? {
          "search.service.travel_anywhere": translations.travel,
          "search.service.holidays": translations.holidays,
          "search.service.cars": translations.cars,
          "search.service.rooms": translations.rooms,
        }
      : {};
    const translationsForHead = translations && {
      metaDescription: translations["dubai_414745.metaDescription"],
      metaTitle: translations["dubai_414745.metaTitle"],
      otherMetaTags: {
        "434528": { value: translations["dubai_414745.otherMetaTags.434528.value"] },
        "434527": { value: translations["dubai_414745.otherMetaTags.434527.value"] },
        "434526": { value: translations["dubai_414745.otherMetaTags.434526.value"] },
        "434525": { value: translations["dubai_414745.otherMetaTags.434525.value"] },
      },
    };
    const areArticlesShown = ["en-GB", "en-US"].includes(language.phraseApp);
    return (
      <React.Fragment>
        <Provider
          translations={areKeysShown ? {} : { ...translations, ...translationsForMenu }}
          language={language}
        >
          <MetaHead
            translations={translationsForHead}
            locale={language.iso}
            currentPath={currentPath}
            socialPhotos={socialPhotos}
          />
          <FetchedProvider value={fetched}>
            <Menu langId={langId} isMobile={isMobile} />
          </FetchedProvider>
          <Hero />
          <StickyAction />
          <Element name="slider">
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
          <Banner />
        </Provider>
      </React.Fragment>
    );
  }
}
