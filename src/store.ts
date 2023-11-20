import { createContext } from 'react';
import { TAppContext, TLists } from './models.ts';

export const defaultLists: TLists = {
  inventoryItems: [],
  basketItems: [],
  pending: true
};
export const AppContext = createContext<TAppContext>({
  lists: {
    ...defaultLists
  },
  removeFromBasket: () => {},
  addToBasket: () => {},
  initInventory: () => {},
  createNew: () => {},
});
