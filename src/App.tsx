import styles from './App.module.scss';
import Inventory from './components/Inventory.tsx';
import Basket from './components/Basket.tsx';

function App() {
  return (
    <>
      <div className={styles['container']}>
        <div className={styles['sections-wrap']}>
          <div className={styles['inventory']}>
            <Inventory />
          </div>
          <div className={styles['basket']}>
            <Basket />
          </div>
        </div>
        <div className={styles['total-section']}>
          <span>
            Total: {3}
          </span>
        </div>
      </div>
    </>
  )
}

export default App
