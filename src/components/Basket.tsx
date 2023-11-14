import styles from './Basket.module.scss';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../store.ts';
import InventoryItem from './InventoryItem.tsx';
import { useState } from 'react';

const Basket = () => {
  let content;
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['basket'],
    queryFn: () => {
      return Promise.resolve([]);
    },
    refetchOnWindowFocus: false
  });
  const [selected, setSelected] = useState<string | null>(null);
  const clicked = (id: string) => {
    setSelected(id);
  }

  const removed = () => {

  };

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
    <div className={styles['basket']}>
      <div className="control-pane">
        <h4>Basket</h4>
        <div className={styles['buttons']}>
          <button onClick={removed} className='btn'>Remove</button>
        </div>
      </div>
      {content}
    </div>
  )
}

export default Basket;
