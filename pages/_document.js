// @flow

/* eslint-disable react/no-danger */

import * as React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet, injectGlobal } from "styled-components";

import { GA_TRACKING_ID } from "../etc/gtag";

type Context = {
  renderPage(cb: Function): void,
};

const globalStyles = () => injectGlobal`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  html, body {
    font-family: 'Roboto', sans-serif;
  }
  body {
    line-height: 1;
  }
  button,
  select {
    font-family: inherit;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  iframe.youtube-embed {
    max-width: 100%;
    height: 162px;
  }

  @media only screen and (min-width: 740px) {
    iframe.youtube-embed {
      max-width: none;
      height: 394px;
    }
  }

  @media only screen and (min-width: 1440px) {
    iframe.youtube-embed {
      height: 455px;
    }
  }

  .react-select__control {
    align-items : center;
    background-color : #fff;
    border-color: #bac7d5;
    border-radius: 3px;
    border-width: 1px;
    border-style: solid;
    box-shadow : none;
    font-family: "Roboto";
    display: flex;
    flex-wrap: wrap;
    font-size: 16px;
    cursor: default;
    box-sizing: border-box;
    font-weight: 500;
    justify-content: space-between;
    min-height: 38;
    outline: 0 !important;
    padding: 6px 6px;
    position: relative;
    transition: all 100ms;
    &:hover {
      border-color :hsl(0, 0%, 70%);
    }
  }
  .react-select__dropdown-indicator {
    display: flex;
    padding: 8px;
    transition: color 150ms;
    box-sizing: border-box;
    color: grey;
  }
  .react-select__single-value {
    color: #46515e;
    margin-left: 2px;
    margin-right: 2px;
    max-width: calc(100% - 8px);
    overflow: hidden;
    position: absolute;
    text-overflow: ellipsis;
    white-space: nowrap;
    top: 50%;
    transform: translateY(-50%);
    box-sizing: border-box;
    opacity: 1;
    transition: opacity 300ms;
    background-color: #fffff;
    font-weight: 700;
  }
`;

globalStyles();

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }: Context) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

          <title>Stopovers</title>
          {this.props.styleTags}
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
            rel="stylesheet"
          />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
