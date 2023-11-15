import React, { SyntheticEvent, useContext, useRef } from 'react';

import styles from './AddInventoryItem.module.scss';
import { AppContext } from '../store.ts';

type Props = {
  confirmed: () => void;
};
const AddInventoryItem: React.FC<Props> = (props: Props) => {
  const appCtx = useContext(AppContext);
  const ref = useRef<HTMLInputElement>(null);

  const submitted = (e: SyntheticEvent) => {
    e.preventDefault();

    const val = ref?.current?.value;

    if (val) {
      const updatedList = [
        { id: new Date().getTime().toString(),
          title: val
        },
        ...appCtx.lists.inventoryItems
      ];

      appCtx.updateLists({
        ...appCtx.lists,
        inventoryItems: updatedList
      });

      props.confirmed();
    }
  }

  return (
    <div className={styles['container']}>
      <h4 className={styles['title']}>Add Inventory Item</h4>

      <form onSubmit={submitted} className={styles['controls']}>
        <input ref={ref} type="text" />
        <button type='submit' className="btn">Add</button>
      </form>
    </div>
  );
}

export default AddInventoryItem;
