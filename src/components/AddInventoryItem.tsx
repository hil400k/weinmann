import React, { SyntheticEvent, useRef } from 'react';

import styles from './AddInventoryItem.module.scss';
import { useMutation } from '@tanstack/react-query';

type Props = {
  confirmed: () => void;
};
const AddInventoryItem: React.FC<Props> = (props: Props) => {
  const ref = useRef();

  const { context, data } = useMutation({
    mutationKey: ['products']
  });
  const submitted = (e: SyntheticEvent) => {
    e.preventDefault();

    props.confirmed();
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
