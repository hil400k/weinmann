import { createContext } from 'react';
import { TAppContext, TLists } from './models.ts';

export const defaultState: TLists = {
  inventoryItems: [],
  basketItems: [],
};
export const AppContext = createContext<TAppContext>({
  lists: {
    ...defaultState
  },
  updateLists: () => {}
});
