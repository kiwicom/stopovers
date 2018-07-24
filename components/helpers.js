// @flow
import { scroller } from "react-scroll";

export function scrollToElement(elementName: string) {
  scroller.scrollTo(elementName, {
    smooth: true,
  });
}

export default { scrollToElement };
