// @flow

import * as React from "react";
import Head from "next/head";
import translate from "@kiwicom/nitro/lib/services/intl/translate";
import omit from "lodash/omit";

type Tags = {
  [key: string]: { value: string },
};

type Props = {
  translations?: {
    metaDescription?: string,
    metaTitle?: string,
    otherMetaTags?: Tags,
  },
  locale: string,
  currentPath: string,
  socialPhotos: {
    twitter: ?string,
    facebook: ?string,
  },
};

// TODO: make meta tags dynamic via DatoCMS
const MetaHead = ({ translations, locale, currentPath, socialPhotos }: Props) => {
  const currentUrl = `https://www.kiwi.com${currentPath.split(/[?#]/)[0]}/`;
  const stringTranslations = translations ? omit(translations, "otherMetaTags") : {};
  const title = translate(stringTranslations, "metaTitle");
  const description = translate(stringTranslations, "metaDescription");
  const otherMetaTags =
    translations && translations.otherMetaTags ? translations.otherMetaTags : {};
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />

      <meta property="og:locale" content={locale} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={socialPhotos.facebook || ""} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Kiwi.com" />

      {Object.keys(otherMetaTags).map(key => (
        <meta property="article:tag" key={key} content={otherMetaTags[key].value || ""} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kiwicom247" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialPhotos.twitter || ""} />
    </Head>
  );
};

export default MetaHead;
