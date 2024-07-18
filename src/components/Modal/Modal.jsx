import React, { useRef } from 'react'
import { forwardRef, useImperativeHandle } from 'react';
import {createPortal} from 'react-dom';
import './Modal.css';
const Modal = forwardRef(function Modal({children, buttonCaption}, ref) {
  const dialog = useRef();
  
  function handleClose () {
    dialog.current.close();
  }
  useImperativeHandle(ref , () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      }
    };
  })
  return createPortal(
    <dialog ref={dialog}>
      <div className="close">
        <button onClick={handleClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      {children}
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal