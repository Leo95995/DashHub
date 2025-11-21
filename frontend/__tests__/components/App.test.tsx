import { screen } from '@testing-library/react';
import { render } from '../test-utils'; // il tuo customRender
import App from '../../src/App'
import { describe, it, jest } from '@jest/globals';
import { expectDom } from '../expect';



describe('App component', () => {
  it('renders the main heading', async () => {
    render(<App />);

    // esempio: verifica che ci sia un testo
    const heading = await screen.findByText(/welcome to dashhub/i);
    expectDom(heading).toBeInTheDocument();
  });

  it('fetches data on load', async () => {
    // mock fetch già globale
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ message: 'Hello from API' }),
    } as never);

    render(<App />);

    // esempio: controlla che il testo proveniente dall'API venga renderizzato
    const apiMessage = await screen.findByText(/hello from api/i);
    expectDom(apiMessage).toBeInTheDocument();
  });
});
