import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Importação das fontes */
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto&display=swap');

  :root {
    /* Paleta de cores */
    --red: #F6282C;
    --yellow: #FED15C;
    --pink: #FD64E0;
    --green: #30CF7F;
    --blue: #3564DA;
    --white: #FEFFF0;
    --dark-blue: #071F56;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: var(--white);
    color: var(--dark-blue);
  }
`;

export default GlobalStyle;
