// @flow

import * as React from "react";
import Head from "next/head";
import translate from "@kiwicom/nitro/lib/services/intl/translate";

type Props = {
  translations: {
    [key: string]: string,
  },
  otherMetaTagIds: string[],
  locale: string,
  currentPath: string,
  socialPhotos: {
    twitter: ?string,
    facebook: ?string,
  },
};

const MetaHead = ({ translations, locale, currentPath, socialPhotos, otherMetaTagIds }: Props) => {
  const currentUrl = `https://www.kiwi.com${currentPath.split(/[?#]/)[0]}`;
  const title = translate(translations, "metaTitle");
  const description = translate(translations, "metaDescription");
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

      {otherMetaTagIds.map(id => (
        <meta
          property="article:tag"
          key={id}
          content={translate(translations, `otherMetaTags.${id}.value`)}
        />
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
