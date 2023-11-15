import React, { SyntheticEvent, useContext, useRef } from 'react';

import styles from './AddInventoryItem.module.scss';
import { AppContext } from '../store.ts';
import { addNewInventory } from '../utils/addNewInventory.ts';

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
      addNewInventory(appCtx, val);

      props.confirmed();
    }
  }

  return (
    <div className={styles['container']}>
      <p className={styles['caption']}>Please, type the title...</p>

      <form onSubmit={submitted} className={styles['controls']}>
        <input ref={ref} type="text" />
        <button type='submit' className="btn">Add</button>
      </form>
    </div>
  );
}

export default AddInventoryItem;
