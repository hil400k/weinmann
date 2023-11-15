import { fetchProducts } from '../utils/fetchProducts.ts';

import styles from './Inventory.module.scss';
import InventoryItem from './InventoryItem.tsx';
import { useContext, useEffect, useState } from 'react';
import Modal from './ui/Modal.tsx';
import AddInventoryItem from './AddInventoryItem.tsx';
import { AppContext } from '../store.ts';

const Inventory = () => {
  let content;
  const [pending, setPending] = useState(true);
  const appCtx = useContext(AppContext);
  useEffect(() => {
    const doRequest = async () => {
      const inventory = await fetchProducts();

      const newState = { ...appCtx.lists };
      newState.inventoryItems = inventory;
      appCtx.updateLists(newState);
      setPending(false);
    };

    doRequest();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const clicked = (id: string) => {
    setSelected(id);
  }

  const changeModalState = () => {
    setModalOpen(prevState => !prevState);
  }

  const addToBasket = () => {
    let updatedList = [];
    const basketItems = appCtx.lists.basketItems;
    const existedIndex = appCtx.lists.basketItems.findIndex(i => i.id === selected);

    if (existedIndex !== -1) {
      basketItems[existedIndex].count ++;
      updatedList = [...basketItems];
    } else {

      updatedList = [{
        ...appCtx.lists.inventoryItems.find(i => i.id === selected),
        count: 1
      }, ...basketItems];
    }

    appCtx.updateLists({
      ...appCtx.lists,
      basketItems: updatedList
    });
  }

  if (pending) {
    content = (
      <div className={styles['notification']}>Please, wait...</div>
    );
  }

  if (appCtx.lists.inventoryItems.length) {
    content = appCtx.lists.inventoryItems.map((p) => {
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
      { content }
    </div>
  );
}

export default Inventory;
