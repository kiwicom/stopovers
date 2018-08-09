// @flow

import * as React from "react";
import { Element } from "react-scroll";
import { Provider } from "@kiwicom/nitro/lib/services/intl/context";
import { type LangInfos, type LangInfo } from "@kiwicom/nitro/lib/records/LangInfo";
import { type BrandLanguage } from "@kiwicom/nitro/lib/records/BrandLanguage";
import { type Fetched, fetchedDefault } from "@kiwicom/nitro/lib/records/Fetched";
import { type Translations } from "@kiwicom/nitro/lib/services/intl/translate";
import { Provider as FetchedProvider } from "@kiwicom/nitro/lib/services/fetched/context";

import { filterLanguages, filterBrandLanguage, mapLanguage } from "../etc/helpers";
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
import langsData from "../static/languages.json";
import brandLangsData from "../static/brandLanguages.json";

type Props = {
  translations: Translations,
  language: LangInfo,
  fetched: Fetched,
};

const Locales = {
  en: import("../static/locales/en-GB.json"),
  cz: import("../static/locales/cs-CZ.json"),
  ro: import("../static/locales/ro-RO.json"),
  hu: import("../static/locales/hu-HU.json"),
  es: import("../static/locales/es-ES.json"),
  fr: import("../static/locales/fr-FR.json"),
  de: import("../static/locales/de-DE.json"),
  ru: import("../static/locales/ru-RU.json"),
  it: import("../static/locales/it-IT.json"),
};

type State = {
  areKeysShown: boolean,
};

export default class Index extends React.Component<Props, State> {
  state = { areKeysShown: false };

  componentDidMount() {
    window.document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    window.document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  static async getInitialProps({ query }: any) {
    const langId = (query && query.lang) || "en";
    const langInfos: LangInfos = filterLanguages(langsData);
    const brandLanguage: BrandLanguage = filterBrandLanguage(brandLangsData, langId);
    const language = mapLanguage(brandLanguage.languages[langId], langInfos[langId]);
    const translations = await Locales[langId];
    const fetched = {
      ...fetchedDefault,
      brandLanguage,
    };
    return {
      translations,
      language,
      fetched,
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
    const { translations, language, fetched } = this.props;
    return (
      <Provider translations={this.state.areKeysShown ? {} : translations} language={language}>
        <FetchedProvider value={fetched}>
          <Menu />
        </FetchedProvider>
        <Hero />
        <Element name="slider">
          <SliderSection />
        </Element>
        <Element name="itinerary">
          <Itinerary />
        </Element>
        <Element name="partners">
          <Partners />
        </Element>
        <Articles />
        <Element name="video">
          <Video />
        </Element>
        <Element name="search">
          <Search />
        </Element>
        <Footer />
        <Banner />
      </Provider>
    );
  }
}
