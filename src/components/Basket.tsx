import styles from './Basket.module.scss';
import { TInventoryItem } from '../models.ts';
import InventoryItem from './InventoryItem.tsx';
import { useContext, useState } from 'react';
import { AppContext } from '../store.ts';

const Basket = () => {
  const appCtx = useContext(AppContext);
  const [selected, setSelected] = useState<string[]>([]);
  const clicked = (id: string) => {
    const index = selected.findIndex(i => i === id);
    const notPresent = index === -1;

    setSelected(notPresent ? [id, ...selected] : selected.filter(i => i !== id));
  }

  const removed = () => {
    let updatedList = [...appCtx.lists.basketItems];

    selected.forEach(s => {
      updatedList = [...updatedList.filter(i => i.id !== s)];
    });

    appCtx.updateLists({
      ...appCtx.lists,
      basketItems: updatedList
    });

    setSelected([]);
  };

  return (
    <div className={styles['basket']}>
      <div className="control-pane">
        <h4>Basket</h4>
        <div className={styles['buttons']}>
          <button onClick={removed} className='btn'>Remove</button>
        </div>
      </div>
      {appCtx.lists.basketItems.length > 0 && appCtx.lists.basketItems.map((p: TInventoryItem) => {
        return (
          <InventoryItem
            key={p.id}
            count={p.count}
            id={p.id}
            title={p.title}
            clicked={clicked}
            selected={selected.includes(p.id)}
          />
        );
      })}
    </div>
  )
}

export default Basket;
