import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../utils/fetchProducts.ts';

import styles from './Inventory.module.scss';
import InventoryItem from './InventoryItem.tsx';
import { useState } from 'react';

const Inventory = () => {
  let content;
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts()
  });
  const [selected, setSelected] = useState<string | null>(null);

  const clicked = (id: string) => {
    setSelected(id);
  }

  if (isError) {
    content = (
      <div className={styles['notification']}>{error.message}</div>
    );
  }

  if (isPending) {
    content = (
      <div className={styles['notification']}>Please, wait...</div>
    );
  }

  if (data) {
    content = data.map((p: { id: string, title: string }) => {
      return (
        <InventoryItem
          key={p.id}
          id={p.id}
          title={p.title}
          clicked={clicked}
          selected={p.id === selected}
        />
      );
    });
  }

  return (
    <div className={styles['inventory']}>
      <div className="control-pane">
        <h4>Inventory</h4>
        <div className={styles['buttons']}>
          <button className='btn'>New</button>
          <button className='btn'>Add</button>
        </div>
      </div>
      {content}
    </div>
  );
}

export default Inventory;
