import { useEffect, useRef, useState } from "react";

import sprite from "@/assets/icons/sprite.svg";

import css from "./WordActions.module.css";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function WordActions({ onEdit, onDelete }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    onEdit();
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  return (
    <div className={css.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={css.menuBtn}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open word actions"
      >
        ...
      </button>

      {isOpen && (
        <div className={css.menu}>
          <button type="button" className={css.actionBtn} onClick={handleEdit}>
            <svg className={css.icon}>
              <use href={`${sprite}#icon-edit`} />
            </svg>
            Edit
          </button>

          <button
            type="button"
            className={css.actionBtn}
            onClick={handleDelete}
          >
            <svg className={css.icon}>
              <use href={`${sprite}#icon-trash`} />
            </svg>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
