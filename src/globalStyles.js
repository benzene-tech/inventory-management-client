import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  img {
    max-height: 100%;
    max-width: 100%;
  }

  .textfield {
    width: 100%;
    margin-bottom: 10px;
  }

  .chip {
    margin: 5px;
    max-width: 120px;
  }
`;

export default GlobalStyle;
