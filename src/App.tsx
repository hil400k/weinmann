import styles from './App.module.scss';
import Inventory from './components/Inventory.tsx';
// import Basket from './components/Basket.tsx';
import { defaultState, AppContext } from './store.ts';
import { useState } from 'react';
import Basket from './components/Basket.tsx';
import { TInventoryItem, TLists } from './models.ts';

function App() {
  const [state, setState] = useState(defaultState);

  const updateLists = (updated: TLists): void => {
    setState(updated);
  };

  const getTotal = (): number => {
    return (state.basketItems as Required<TInventoryItem>[]).reduce((sum, currItem) => {
      return sum + currItem.count;
    }, 0);
  }

  return (
    <>
      <AppContext.Provider value={{
        updateLists: updateLists,
        lists: state
      }}>
      <div className={styles['container']}>
        <div className={styles['sections-wrap']}>
          <div className={styles['inventory']}>
            <Inventory />
          </div>
          <div className={styles['basket']}>
            <Basket />
          </div>
        </div>
        <div className={styles['total-section']}>
          <span>
            Basket Total: { getTotal() }
          </span>
        </div>
      </div>
      </AppContext.Provider>
    </>
  )
}

export default App
