// @flow
/*
import { css } from "styled-components";

const sizes = {
  desktop: 992,
  tablet: 768,
  mobile: 576,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});
*/

/*
${media.mobile`

 padding: 0 35px;
 grid-template-columns: 1fr;
 grid-template-rows: auto;
 grid-template-areas:
   "slider"
   "description';

   `}

${media.desktop`
   padding: 0 65px;
   grid-template-columns: 1fr 1fr;
grid-template-areas: "slider description";

`} */
