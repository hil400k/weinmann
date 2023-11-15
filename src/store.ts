import { createContext } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { TAppContext } from './models.ts';

export const defaultState = {
  inventoryItems: [],
  basketItems: [],
};
export const AppContext = createContext<TAppContext>({
  lists: {
    ...defaultState
  },
  updateLists: () => {}
});

export const queryClient = new QueryClient();
