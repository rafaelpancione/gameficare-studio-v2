import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';


test('renders home page heading', async () => {
  render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
  const heading = await screen.findByText(/BOAS VINDAS À/i);
  expect(heading).toBeInTheDocument();
});

test('renders Home link from header', async () => {
  render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
  const homeLinks = await screen.findAllByRole('link', { name: /home/i });
  expect(homeLinks.length).toBeGreaterThan(0);
});
