// @flow

const UTM_LIST = [
  "utm_source",
  "utm_medium",
  "utm_term",
  "utm_content",
  "utm_campaign",
  "mkt_route",
  "mkt_postback",
  "mkt_origin",
  "mkt_form",
  "mkt_agency",
];

type UtmSet = {
  utm_source?: string,
  utm_medium?: string,
  utm_term?: string,
  utm_content?: string,
  utm_campaign?: string,
  mkt_route?: string,
  mkt_postback?: string,
  mkt_origin?: string,
  mkt_form?: string,
  mkt_agency?: string,
};

export const isFresh = (item: { value: string, createdAt: Date }): boolean => {
  const createdDate = new Date(item.createdAt);
  const compareDate = new Date();
  compareDate.setMonth(compareDate.getMonth() - 1);
  return createdDate.getTime() > compareDate.getTime();
};

export function loadFromSession(): UtmSet {
  if (window.localStorage) {
    return UTM_LIST.reduce((acc, key) => {
      const item = JSON.parse(window.localStorage.getItem(key));
      if (item && isFresh(item)) {
        return {
          ...acc,
          [key]: item.value,
        };
      }
      return acc;
    }, {});
  }
  return {};
}

export function saveToSession(object: UtmSet): void {
  if (window.localStorage) {
    Object.keys(object)
      .filter(key => UTM_LIST.includes(key))
      .forEach(key => {
        window.localStorage.setItem(
          key,
          JSON.stringify({ value: object[key], createdAt: new Date() }),
        );
      });
  }
}
