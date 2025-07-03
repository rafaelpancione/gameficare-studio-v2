import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page heading', async () => {
  render(<App />);
  const heading = await screen.findByText(/BOAS VINDAS À/i);
  expect(heading).toBeInTheDocument();
});
