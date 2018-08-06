// @flow

import * as React from "react";
import { Element } from "react-scroll";
import { Provider } from "@kiwicom/nitro/lib/services/intl/context";
import { type LangInfo, type LangInfos } from "@kiwicom/nitro/lib/records/LangInfo";
import { type Translations } from "@kiwicom/nitro/lib/services/intl/translate";

import { getTranslations, getLanguages } from "../etc/helpers";
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
  language: LangInfo,
};

export default class Index extends React.Component<Props> {
  componentDidMount() {
    window.document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    window.document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  static async getInitialProps({ query }) {
    const langId = (query && query.lang) || "en";
    const translations = await getTranslations("http://localhost:3000/static/locales/", langId);
    const langInfos: LangInfos = await getLanguages("http://localhost:3000/static/");
    const language = langInfos[langId];

    return { translations, language };
  }

  handleKeyDown(event) {
    console.log(event);
  }

  render() {
    const { translations, language } = this.props;
    return (
      <Provider translations={translations} language={language}>
        <Menu onKeyDown={event => console.log(event)} />
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
