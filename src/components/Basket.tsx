import styles from './Basket.module.scss';

const Basket = () => {
  return (
    <div className={styles['basket']}>
      <div className="control-pane">
        <h4>Basket</h4>
        <div className={styles['buttons']}>
          <button className='btn'>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default Basket;
