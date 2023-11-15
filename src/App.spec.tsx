import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from './App.tsx';

describe('App component testing', () => {
  test('demo-check', () => {
    expect(true).toBe(true);
  })

  test('', () => {
    render(<App />);

    expect(true).toBeTruthy()
  });
});
