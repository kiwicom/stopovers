// @flow

import Cookies from "js-cookie";

import * as Helpers from "../helpers";
import languages from "../../static/languages.json";

describe("helpers", () => {
  it("filters properties of an object properly", () => {
    const obj = {
      en: { iso: "en-GB" },
      ca: { iso: "en-CA" },
      us: { iso: "en-US" },
    };

    expect(Helpers.pick(obj, ["en"])).toEqual({ en: { iso: "en-GB" } });
    expect(Helpers.pick(obj, ["en-US", "en-CA"], "iso")).toEqual({
      ca: { iso: "en-CA" },
      us: { iso: "en-US" },
    });
  });

  it("filters languages properly", () => {
    const output = Helpers.filterLanguages(["en-GB", "en-CA", "en-US"]);
    expect(Object.keys(output)).toEqual(["en", "ca", "us"]);
    expect(Object.keys(output).every(key => output[key] === languages[key])).toBe(true);
  });

  it("gets correct language data", () => {
    expect(
      Helpers.getLanguage("non existing language", Helpers.filterLanguages(["en-GB"])),
    ).toEqual(languages.en);
    expect(Helpers.getLanguage("ca", Helpers.filterLanguages(["en-GB", "en-CA"]))).toEqual({
      ...languages.ca,
      name: languages.ca.displayName,
    });
    expect(Helpers.getLanguage("ca", Helpers.filterLanguages(["en-GB"]))).toEqual(languages.en);
    expect(Helpers.getLanguage("be", Helpers.filterLanguages(["en-GB", "fr-FR"]))).toEqual({
      ...languages.fr,
      name: languages.fr.displayName,
    });
  });

  it("gets correct brand language data", () => {
    const supportedLangs = Helpers.filterLanguages(["en-GB", "en-CA", "es-ES"]);
    expect(Helpers.getBrandLanguage("es", supportedLangs)).toMatchSnapshot();
  });

  it("gets correct args from current URL", () => {
    const paths = [
      "/some/path/?key=value",
      "/?a=an arg with spaces&b=followed by another arg",
      "/?symbols=an%20arg%20with%20encoded%20symbols%20%24%26%23%40",
    ];
    const outputs = paths.map((path, index) => {
      window.history.pushState({}, index, path);
      return Helpers.getCurrentUrlParams();
    });

    expect(outputs).toEqual([
      { key: "value" },
      { a: "an arg with spaces", b: "followed by another arg" },
      { symbols: "an arg with encoded symbols $&#@" },
    ]);
  });

  it("gets and sets user ID properly", () => {
    Cookies.set = jest.fn();
    Cookies.get = jest
      .fn()
      .mockImplementationOnce(() => "userID")
      .mockImplementationOnce(() => undefined);

    expect(Helpers.getUserId()).toEqual("userID");
    expect(Cookies.set).not.toBeCalled();

    const userID = Helpers.getUserId();
    expect(userID.length).toBe(36);
    expect(Cookies.set.mock.calls[0][0]).toEqual("SKYPICKER_VISITOR_UNIQID");
    expect(Cookies.set.mock.calls[0][1]).toEqual(userID);
  });
});
