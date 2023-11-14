import React, { ReactNode } from 'react';

import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode;
  confirmed: () => void;
};

type ModalOverlayProps = {
  children: ReactNode;
}

type BackdropProps = {
  confirmed: () => void;
}

const Backdrop = (props: BackdropProps) => {
  return (
    <div onClick={() => props.confirmed()} className={styles.backdrop}></div>
  )
};

const ModalOverlay: React.FC<ModalOverlayProps> = (props: ModalOverlayProps) => {
  return (
    <div className={styles['modal']}>
      {props.children}
    </div>
  );
}

const Modal: React.FC<Props> = (props: Props) => {
  return (
    <>
      {createPortal(<Backdrop confirmed={props.confirmed} />, document.getElementById('backdrop-root') as Element)}
      {createPortal(<ModalOverlay>
        {props.children}
      </ModalOverlay>, document.getElementById('overlay-root') as Element)}
    </>
  );
}

export default Modal;
