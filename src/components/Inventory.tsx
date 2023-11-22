import styles from './Inventory.module.scss';
import InventoryItem from './InventoryItem.tsx';
import { useContext, useEffect, useRef, useState, lazy, Suspense } from 'react';
import Modal from './ui/Modal.tsx';
import { AppContext } from '../store.ts';

const AddInventoryItem = lazy(() => import('./AddInventoryItem.tsx'));

const Inventory = () => {
  const appCtx = useContext(AppContext);
  const dataInitedRef = useRef(false);

  useEffect(() => {
    if (!dataInitedRef.current) {
      appCtx.initInventory();
      dataInitedRef.current = true;
    }
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

  const addToBasket = () => {
    appCtx.addToBasket({ selected } );
  }

  return (
    <div className={styles['inventory']}>
      <div className="control-pane">
        <h4>Inventory</h4>
        {modalOpen && <Modal title="Add Inventory Item" confirmed={changeModalState}>
          <Suspense fallback={(() => (<span>Loading...</span>))()}>
            <AddInventoryItem confirmed={changeModalState} />
          </Suspense>
        </Modal>}
        <div className={styles['buttons']}>
          <button onClick={() => setModalOpen(true)} className='btn'>New</button>
          <button onClick={addToBasket} className='btn'>Add to Basket</button>
        </div>
      </div>
      { appCtx.lists.pending && <div className={styles['notification']}>Please, wait...</div> }
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
