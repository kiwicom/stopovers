// @flow

import * as React from "react";
import { Element } from "react-scroll";
import { Provider } from "@kiwicom/nitro/lib/services/intl/context";
import { type LangInfos } from "@kiwicom/nitro/lib/records/LangInfo";
import { type BrandLanguage } from "@kiwicom/nitro/lib/records/BrandLanguage";
import { type Fetched, fetchedDefault } from "@kiwicom/nitro/lib/records/Fetched";
import { type Translations } from "@kiwicom/nitro/lib/services/intl/translate";
import { Provider as FetchedProvider } from "@kiwicom/nitro/lib/services/fetched/context";

import { getTranslations, getLanguages, getBrandLanguage } from "../etc/helpers";
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

type Props = {
  translations: Translations,
  langId: string,
  languages: LangInfos,
  fetched: Fetched,
};

const baseUrl = "http://localhost:3000/static/";

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
    const translations = await getTranslations(`${baseUrl}locales/`, langId);
    const langInfos: LangInfos = await getLanguages(baseUrl);
    const brandLanguage: BrandLanguage = await getBrandLanguage(baseUrl, langId);
    const fetched = {
      ...fetchedDefault,
      brandLanguage,
    };
    return { translations, langId, languages: langInfos, fetched };
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
    const { translations, langId, languages, fetched } = this.props;
    return (
      <Provider
        translations={this.state.areKeysShown ? {} : translations}
        language={languages[langId]}
      >
        <FetchedProvider value={fetched}>
          <Menu />
        </FetchedProvider>
        <Hero />
        <SliderSection />
        <Element name="itinerary">
          <Itinerary />
        </Element>
        <Partners />
        <Articles />
        <Video />
        <Element name="search">
          <Search />
        </Element>
        <Footer />
        <Banner />
      </Provider>
    );
  }
}
