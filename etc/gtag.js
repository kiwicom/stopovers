// @flow

export const GA_TRACKING_ID = "UA-29345084-1";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_location: url,
  });
};

type EventInfo = { action: string, category: string, label: string, value: string };

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: EventInfo) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
