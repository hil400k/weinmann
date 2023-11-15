import React, { ReactNode } from 'react';

import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';

import CloseIcon from '../../assets/close-square-svgrepo-com.svg';

type Props = {
  children: ReactNode;
  title?: string;
  confirmed: () => void;
};

type BackdropProps = {
  confirmed: () => void;
}

const Backdrop = (props: BackdropProps) => {
  return (
    <div onClick={() => props.confirmed()} className={styles.backdrop}></div>
  )
};

const ModalOverlay: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles['modal']}>
      <div className={styles['header-row']}>
        <span className={styles['title']}>{props.title}</span>
        <span>
          <img onClick={() => props.confirmed()} src={CloseIcon} alt="close" />
        </span>
      </div>
      {props.children}
    </div>
  );
}

const Modal: React.FC<Props> = (props: Props) => {
  return (
    <>
      {createPortal(<Backdrop confirmed={props.confirmed} />, document.getElementById('backdrop-root') as Element)}
      {createPortal(<ModalOverlay confirmed={props.confirmed} title={props.title}>
        {props.children}
      </ModalOverlay>, document.getElementById('overlay-root') as Element)}
    </>
  );
}

export default Modal;
