import { createPortal } from "react-dom";

import sprite from "@/assets/icons/sprite.svg";

import css from "./Modal.module.css";
import { useEffect, type MouseEvent, type ReactNode } from "react";

interface Props {
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ onClose, children }: Props) {
  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div onClick={handleBackdropClick} className={css.overlay}>
      <div className={css.modal}>
        <button
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <svg className={css.icon}>
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>

        {children}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
