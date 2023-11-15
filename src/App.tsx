import { defaultState, AppContext } from './store.ts';
import { useState } from 'react';
import { TLists } from './models.ts';
import Weinmann from './components/Weinmann.tsx';

function App() {
  const [state, setState] = useState(defaultState);

  const updateLists = (updated: TLists): void => {
    setState(updated);
  };

  return (
      <AppContext.Provider value={{
        updateLists: updateLists,
        lists: state
      }}>
        <Weinmann />
      </AppContext.Provider>
  )
}

export default App
