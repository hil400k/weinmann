import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../utils/fetchProducts.ts';

import styles from './Inventory.module.scss';
import InventoryItem from './InventoryItem.tsx';
import { useState } from 'react';
import Modal from './ui/Modal.tsx';
import AddInventoryItem from './AddInventoryItem.tsx';
import { queryClient } from '../store.ts';
// import { AppContext } from '../store.ts';

const Inventory = () => {
  let content;
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
    refetchOnWindowFocus: false
  });
  // const appCtx = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const clicked = (id: string) => {
    setSelected(id);
  }

  const changeModalState = () => {
    setModalOpen(prevState => !prevState);
  }

  const addToBasket = () => {
    if (!selected) {
      return;
    }

    queryClient.setQueriesData({
      queryKey: ['basket'],
    }, (prev) => {
      const item = data.find(i => i.id === selected);
      return [item, ...(prev as any[])];
    });

    queryClient.setQueriesData({
      queryKey: ['products']
    }, (prev) => {
      const newList = prev.filter(i => i.id !== selected);

      return newList || [];
    });

    setSelected(null);
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
        {modalOpen && <Modal confirmed={changeModalState}>
          <AddInventoryItem confirmed={changeModalState} />
        </Modal>}
        <div className={styles['buttons']}>
          <button onClick={() => setModalOpen(true)} className='btn'>New</button>
          <button onClick={() => addToBasket()} className='btn'>Add</button>
        </div>
      </div>
      {content}
    </div>
  );
}

export default Inventory;
