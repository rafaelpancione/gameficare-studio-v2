import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    /* Variáveis CSS para customização complementar */
    --red: #F6282C;
    --yellow: #FED15C;
    --pink: #FD64E0;
    --green: #30CF7F;
    --blue: #3564DA;
    --white: #FEFFF0;
    --dark-blue: #071F56;
  }

  /* Reset básico */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Layout e overflow */
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
  }

  /* Corpo principal: usa Roboto como fonte */
  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${({ theme }) => theme?.colors?.primary || 'var(--blue)'};
    color: ${({ theme }) => theme?.colors?.darkBlue || 'var(--dark-blue)'};
    display: flex;
    flex-direction: column;
    -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }

  code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

  /* Se quiser forçar Press Start 2P em títulos: */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Press Start 2P', cursive;
  }

  /* Container principal da aplicação */
  #root {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
  }
`;

export default GlobalStyle;
