// @flow

import Cookies from "js-cookie";

import * as Helpers from "../helpers";
import langsData from "../../static/languages.json";

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
    const output = Helpers.filterLanguages(langsData, ["en-GB", "en-CA", "en-US"]);
    expect(Object.keys(output)).toEqual(["en", "ca", "us"]);
    expect(Object.keys(output).every(key => output[key] === langsData[key])).toBe(true);
  });

  it("convert locale ISO to langID", () => {
    expect(Helpers.isoToLangId(langsData, "en-US")).toEqual("us");
    expect(Helpers.isoToLangId(langsData, "en-CA")).toEqual("ca");
    expect(Helpers.isoToLangId(langsData, "es-ES")).toEqual("es");
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
