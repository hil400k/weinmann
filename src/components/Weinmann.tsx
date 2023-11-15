import styles from './Weinmann.module.scss';
import Inventory from './Inventory.tsx';
import Basket from './Basket.tsx';
import { TInventoryItem } from '../models.ts';
import { useContext } from 'react';
import { AppContext } from '../store.ts';

const Weinmann = () => {
  const appCtx = useContext(AppContext);
  const getTotal = (): number => {
    return (appCtx.lists.basketItems as Required<TInventoryItem>[]).reduce((sum, currItem) => {
      return sum + currItem.count;
    }, 0);
  }

  return (
    <div className={styles['container']}>
      <h1 className={styles['title']}>
        <span className={styles['back-text']}>Weinmann Inventory</span>
        <span className={styles['frontal-text']}>Weinmann Inventory</span>
      </h1>
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
  );
}

export default  Weinmann;
