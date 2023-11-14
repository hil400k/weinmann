import styles from './App.module.scss';
import Inventory from './components/Inventory.tsx';
import Basket from './components/Basket.tsx';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from './store.ts';

function App() {
  const { data, isSuccess } = useQuery({
    queryKey: ['products'],
    queryFn: () => {
      return queryClient.getQueriesData({
        queryKey: ['products']
      })
    },
    refetchOnWindowFocus: false
  });

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
            Inventory (only) Total: { isSuccess ? data.length : 0 }
          </span>
        </div>
      </div>
    </>
  )
}

export default App
