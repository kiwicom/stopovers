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
};

type State = {
  areKeysShown: boolean,
};

export default class Index extends React.Component<Props, State> {
  state = { areKeysShown: false };

  componentDidMount() {
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
  }

  static async getInitialProps({ query: { lang }, req }: { query: Query, req: any }) {
    const langId = lang && usedLangIds.includes(lang) ? lang : "en";
    const langInfos: LangInfos = filterLanguages(langsData);
    const brandLanguage: BrandLanguage = filterBrandLanguage(brandLangsData, langId);
    const language = mapLanguage(brandLanguage.languages[langId], langInfos[langId]);
    const isServer = !!req;
    const translationsUrl = `${isServer ? `http://localhost:3000` : ""}/static/locales/${
      language.iso
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
    const { translations, language, fetched, langId } = this.props;
    return (
      <Provider translations={this.state.areKeysShown ? {} : translations} language={language}>
        <FetchedProvider value={fetched}>
          <Menu langId={langId} />
        </FetchedProvider>
        <Hero />
        <StickyAction />
        <Element name="slider">
          <SliderSection />
        </Element>
        <Element name="itinerary">
          <Itinerary />
        </Element>
        <Element name="partners">
          <Partners />
        </Element>
        <Element name="articles">
          <Articles />
        </Element>
        <Element name="video">
          <Video />
        </Element>
        <Element name="search">
          <Search langId={langId} />
        </Element>
        <Footer />
        <Banner />
      </Provider>
    );
  }
}
