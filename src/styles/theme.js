// src/styles/theme.js

const theme = {
    colors: {
      offWhite: '#FEFEFA',     // Cor de fundo clara para textos e áreas específicas
      primary: '#007BFF',      // Cor principal para chamadas de ação e destaques
      secondary: '#6C757D',    // Cor secundária para textos e elementos menos destacados
      error: '#DC3545',        // Cor para mensagens de erro
      white: '#FEFFF0',        // Cor de fundo clara para textos e áreas específicas
      darkBlue: '#071F56',     // Cor de fundo escura para seções e componentes
      blue: '#3564DA',         // Azul utilizado em diversos componentes
      yellow: '#FED15C',       // Amarelo para destaques e botões
      red: '#F6282C',          // Vermelho para alertas e destaques
      green: '#00CC66',        // Verde para elementos de sucesso e banners
      black: '#000',           // Cor preta para textos e bordas
      grey: '#CCC',            // Cinza para estados hover e elementos secundários
    },
    // spacing: (factor) => `${8 * factor}px`, Espaçamento base multiplicado por um fator
    spacing: (value) => `${value * 0.5}rem`, 
    typography: {
      h1: '2.5rem',
      h2: '2rem',
      h3: '1.2rem',
      body: '1rem',
      small: '0.8rem',
      large: '2.5rem',
    },
    breakpoints: {  
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px'
     
    },
    borderRadius: '5px',
    fonts: {
      heading: "'Press Start 2P', cursive",
      body: "'Roboto Mono', monospace",
      sans: "'Roboto', sans-serif",
    },
  };
  
  export default theme;
  