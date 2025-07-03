import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Home link from header', async () => {
  render(<App />);
  const homeLink = await screen.findByRole('link', { name: /home/i });
  expect(homeLink).toBeInTheDocument();
});
