import { createContext } from 'react';
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
