import React from 'react';
import ReactDOM from 'react-dom/client';
// Se "index.css" apenas repete resets já no GlobalStyle, podemos removê-la.
// Caso ainda tenha regras específicas, incorpore-as no GlobalStyle ou mantenha se necessário.
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* 
      Retiramos <GlobalStyle /> aqui para evitar duplicidade.
      O GlobalStyle será inserido dentro de App.js (onde já existe ThemeProvider).
    */}
    <App />
  </React.StrictMode>
);

reportWebVitals();
