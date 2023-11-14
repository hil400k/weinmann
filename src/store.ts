import { createContext } from 'react';
import { QueryClient } from '@tanstack/react-query';


export const defaultCtx = {
  inventoryItems: [],
  basketItems: []
};
export const AppContext = createContext(defaultCtx);

export const queryClient = new QueryClient();
