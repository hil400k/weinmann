import React, { ReactNode, useState } from 'react';
import { defaultState, AppContext } from '../store.ts';
import { TLists } from '../models.ts';

type Props = {
  children: ReactNode;
}
const AppContextProvider: React.FC<Props> = (props: Props) => {
  const [state, setState] = useState(defaultState);

  const updateLists = (updated: TLists): void => {
    setState(updated);
  };

  return (
    <AppContext.Provider value={{
      updateLists: updateLists,
      lists: state
    }}>
      {props.children}
    </AppContext.Provider>
  )
};

export default AppContextProvider;