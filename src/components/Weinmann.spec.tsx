import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Weinmann from './Weinmann.tsx';
import { AppContext } from '../store.ts';

function renderComponentWithContext() {
  render(
    <AppContext.Provider value={{
      lists: {
        basketItems: [
          { id: 'id', title: 'title', count: 1 },
          { id: 'id2', title: 'title', count: 1 }
        ],
        inventoryItems: []
      },
      updateLists: () => {}
    }}>
      <Weinmann />
    </AppContext.Provider>
  );
}

describe('Weinmann component testing', () => {
  test('Basket Total should display correct value within context', () => {
    renderComponentWithContext();

    const totalCaption = screen.getByText(/Basket Total: 2/);

    expect(totalCaption).toBeInTheDocument();
  });
});
