import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App.tsx';

describe('App component testing', () => {
  test('demo-check', () => {
    expect(true).toBe(true);
  })

  test('Basket Total Caption should be in document', () => {
    render(<App />);

    const totalCaption = screen.getByText(/Basket Total: 0/);

    expect(totalCaption).toBeInTheDocument();
  });
});
