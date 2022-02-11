import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'UhBeeGmin2';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_five@.2.0/UhBeeGmin2.woff') format('woff');
    unicode-range: U+AC00-D7A3;
  }

  html {
    background-color: #ffefa0;
    font-family: 'UhBeeGmin2', 'Gochi Hand', cursive;
  }

  button, input, textarea {
    font-family: 'UhBeeGmin2', 'Gochi Hand', cursive;
  }

  * {
    font-family: inherit;
  }
`;

export default GlobalStyles;
