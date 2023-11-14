import { createContext } from 'react';


export const defaultCtx = {
  inventoryItems: [],
  basketItems: []
};
export const AppContext = createContext(defaultCtx);
