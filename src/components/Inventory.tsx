import { fetchProducts } from '../utils/fetchProducts.ts';

import styles from './Inventory.module.scss';
import InventoryItem from './InventoryItem.tsx';
import { useContext, useEffect, useState } from 'react';
import Modal from './ui/Modal.tsx';
import AddInventoryItem from './AddInventoryItem.tsx';
import { AppContext } from '../store.ts';
import { addToBasket } from '../utils/addToBasket.ts';

const Inventory = () => {
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
  const [selected, setSelected] = useState<string[]>([]);

  const clicked = (id: string) => {
    const index = selected.findIndex(i => i === id);
    const notPresent = index === -1;

    setSelected(notPresent ? [id, ...selected] : selected.filter(i => i !== id));
  }

  const changeModalState = () => {
    setModalOpen(prevState => !prevState);
  }

  return (
    <div className={styles['inventory']}>
      <div className="control-pane">
        <h4>Inventory</h4>
        {modalOpen && <Modal title="Add Inventory Item" confirmed={changeModalState}>
          <AddInventoryItem confirmed={changeModalState} />
        </Modal>}
        <div className={styles['buttons']}>
          <button onClick={() => setModalOpen(true)} className='btn'>New</button>
          <button onClick={() => addToBasket(appCtx, selected)} className='btn'>Add to Basket</button>
        </div>
      </div>
      { pending && <div className={styles['notification']}>Please, wait...</div> }
      { appCtx.lists.inventoryItems.map((p) => {
        return (
          <InventoryItem
            key={p.id}
            id={p.id}
            title={p.title}
            clicked={clicked}
            selected={selected.includes(p.id)}
          />
        );
      }) }
    </div>
  );
}

export default Inventory;
