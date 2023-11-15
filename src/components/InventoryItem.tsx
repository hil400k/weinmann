import styles from './InventoryItem.module.scss';
import React from 'react';

type Props = {
  id: string;
  title: string;
  count?: number;
  clicked: (id: string) => void;
  selected: boolean
}
const InventoryItem: React.FC<Props> = (props: Props) => {
  const className = `${styles['inventory-item']} ${props.selected && styles['selected']}`;

  return (
    <div className={className} onClick={() => props.clicked(props.id)}>
      <span>{props.title}</span>
      {props.count && props.count > 1 && <span>{props.count}</span>}
    </div>
  )
};

export default InventoryItem;
