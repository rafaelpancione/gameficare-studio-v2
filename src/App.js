import React from 'react';
import CTAButton from './components/CTAButton';

function App() {
  const handleClick = () => {
    alert('Botão clicado!');
  };

  return (
    <div className="App">
      <CTAButton text="Clique Aqui" onClick={handleClick} />
    </div>
  );
}

export default App;
