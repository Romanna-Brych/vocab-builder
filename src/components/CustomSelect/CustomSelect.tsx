import { useEffect, useRef, useState } from "react";
import css from "./CustomSelect.module.css";

import sprite from "@/assets/icons/sprite.svg";

interface Option {
  value: string;
  label: string;
  menuLabel?: string;
}

interface CustomSelectProps {
  id?: string;
  value: string;
  placeholder: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
}

function CustomSelect({
  id,
  value,
  placeholder,
  options,
  onChange,
  className = "",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = value
    ? options.find((option) => option.value === value)
    : undefined;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className={`${css.wrapper} ${className}`}>
      <button
        id={id}
        type="button"
        className={`${css.trigger} ${isOpen ? css.open : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={selectedOption ? css.value : css.placeholder}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <span className={css.actions}>
          {selectedOption && (
            <span
              role="button"
              className={css.clearBtn}
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
                setIsOpen(false);
              }}
              aria-label="Clear selected option"
            >
              ×
            </span>
          )}

          <svg className={`${css.icon} ${isOpen ? css.iconOpen : ""}`}>
            <use href={`${sprite}#icon-chevron-down`} />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul className={css.dropdown} role="listbox">
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <li key={option.value}>
                <button
                  type="button"
                  className={`${css.option} ${isSelected ? css.selected : ""}`}
                  onClick={() => handleSelect(option.value)}
                  role="option"
                  aria-selected={isSelected}
                >
                  {option.menuLabel ?? option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CustomSelect;
