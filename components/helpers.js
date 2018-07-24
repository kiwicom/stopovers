// @flow
import { scroller } from "react-scroll";

export function scrollToElement(elementName: string, callback?: () => void) {
  scroller.scrollTo(elementName, {
    smooth: true,
  });
  if (callback) {
    callback();
  }
}

export default { scrollToElement };
