import { createContext } from 'react';
import { TAppContext, TLists } from './models.ts';

export const defaultLists: TLists = {
  inventoryItems: [],
  basketItems: [],
};
export const AppContext = createContext<TAppContext>({
  lists: {
    ...defaultLists
  },
  updateLists: () => {}
});
