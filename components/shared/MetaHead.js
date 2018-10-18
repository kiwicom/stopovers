// @flow

import * as React from "react";
import Head from "next/head";
import translate from "@kiwicom/nitro/lib/services/intl/translate";

type Props = {
  translations: { [key: string]: string },
};

// TODO: make meta tags dynamic via DatoCMS
const MetaHead = ({ translations }: Props) => {
  const title = translate(translations, "metaTitle");
  const description = translate(translations, "metaDescription");
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href="https://www.kiwi.com/en/stopovers/dubai/" />

      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://www.datocms-assets.com/7631/1539703866-dubaifacebook1200x630.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta property="og:url" content="https://www.kiwi.com/stopovers/dubai/" />
      <meta property="og:site_name" content="Kiwi.com" />

      <meta property="article:tag" content="Dubai stopovers" />
      <meta property="article:tag" content="Dubai" />
      <meta property="article:tag" content="Flights from Europe to Asia" />
      <meta property="article:tag" content="Flights from Asia to Europe" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kiwicom247" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://www.datocms-assets.com/7631/1539703853-dubaitwittersummaryimage1200x643.jpg"
      />
    </Head>
  );
};

export default MetaHead;
