// @flow
import * as React from "react";
import { Element } from "react-scroll";
import { Provider } from "@kiwicom/nitro/lib/services/intl/context";
import { type LangInfos, langInfoDefault } from "@kiwicom/nitro/lib/records/LangInfo";

import getTranslations from "../etc/getTranslations";
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

export default class Index extends React.Component {
  static async getInitialProps() {
    const langId = "en";
    const translations = await getTranslations("http://localhost:3000/static/locales", langId);
    const langInfos: LangInfos = { en: langInfoDefault };
    const language = langInfos[langId];

    return { translations, language };
  }

  render() {
    const { translations, language } = this.props;
    return (
      <Provider translations={translations} language={language}>
        <Menu />
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
