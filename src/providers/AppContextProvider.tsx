import React, { ReactNode, useReducer } from 'react';
import { defaultLists, AppContext } from '../store.ts';
import { reducer } from '../reducer.ts';
import { TAction } from '../models.ts';

type Props = {
  children: ReactNode;
}

const AppContextProvider: React.FC<Props> = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, defaultLists);

  const updateLists = (action: TAction): void => {
    dispatch(action);
  };

  const removeFromBasket = (payload: any) => {
    dispatch({
      type: 'remove-from-basket',
      payload
    });
  };

  const initInventory = (payload: any) => {
    dispatch({
      type: 'init',
      payload
    });
  }

  const addToBasket = (payload: any) => {
    dispatch({
      type: 'add-to-basket',
      payload
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
      updateLists: updateLists,
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
