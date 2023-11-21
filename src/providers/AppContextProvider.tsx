import React, { ReactNode, useReducer } from 'react';
import { defaultLists, AppContext } from '../store.ts';
import { reducer } from '../reducer.ts';
import { fetchProducts } from '../utils/fetchProducts.ts';
import { TInventoryItem } from '../models.ts';

type Props = {
  children: ReactNode;
}

const AppContextProvider: React.FC<Props> = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, defaultLists);

  const removeFromBasket = (payload: any) => {
    dispatch({
      type: 'remove-from-basket',
      payload
    });
  };

  const initInventory = async () => {
    const inventory = await fetchProducts();

    dispatch({
      type: 'init',
      payload: {
        inventory
      }
    });
  }

  const addToBasket = (payload: any) => {
    const basketItems = state.basketItems;
    let updatedList = [...basketItems];

    payload.selected.forEach((s: string) => {
      const existedIndex = updatedList.findIndex(i => i.id === s);

      if (existedIndex !== -1) {
        (updatedList[existedIndex] as Required<TInventoryItem>).count ++;
      } else {
        const fromInventory = state.inventoryItems.find(i => i.id === s);
        updatedList = [{
          ...(fromInventory as TInventoryItem),
          count: 1
        }, ...updatedList];
      }
    });

    dispatch({
      type: 'add-to-basket',
      payload: updatedList
    });
  }

  const createNew = (payload: any) => {
    dispatch({
      type: 'create-new',
      payload
    });
  }

  return (
    <AppContext.Provider value={{
      removeFromBasket: removeFromBasket,
      initInventory: initInventory,
      createNew: createNew,
      addToBasket: addToBasket,
      lists: state
    }}>
      {props.children}
    </AppContext.Provider>
  )
};

export default AppContextProvider;
