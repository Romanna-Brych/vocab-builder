import { useEffect, useState } from "react";

import sprite from "@/assets/icons/sprite.svg";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import type { Category } from "@/types/category";

import css from "./Filters.module.css";

type Props = {
  categories: Category[];
  keyword: string;
  category: string;
  isIrregular?: boolean;
  onKeywordChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onIrregularChange: (value: boolean | undefined) => void;
};

export default function Filters({
  categories,
  keyword,
  category,
  isIrregular,
  onKeywordChange,
  onCategoryChange,
  onIrregularChange,
}: Props) {
  const [localKeyword, setLocalKeyword] = useState(keyword);
  const debouncedKeyword = useDebouncedValue(localKeyword, 300);

  useEffect(() => {
    const trimmedKeyword = debouncedKeyword.trim();

    if (trimmedKeyword !== keyword) {
      onKeywordChange(trimmedKeyword);
    }
  }, [debouncedKeyword, keyword, onKeywordChange]);

  const handleCategoryChange = (value: string) => {
    onCategoryChange(value);

    if (value !== "verb") {
      onIrregularChange(undefined);
    }
  };

  return (
    <div className={css.filters}>
      <label className={css.searchWrapper}>
        <input
          className={css.input}
          type="text"
          placeholder="Find the word"
          value={localKeyword}
          onChange={(event) => setLocalKeyword(event.target.value)}
        />

        <svg className={css.searchIcon}>
          <use href={`${sprite}#icon-search`} />
        </svg>
      </label>

      <div className={css.selectWrapper}>
        <select
          className={css.select}
          value={category}
          onChange={(event) => handleCategoryChange(event.target.value)}
        >
          <option value="">Categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <svg className={css.chevronIcon}>
          <use href={`${sprite}#icon-chevron-down`} />
        </svg>
      </div>

      {category === "verb" && (
        <div className={css.radioGroup}>
          <label className={css.radioLabel}>
            <input
              type="radio"
              name="verbType"
              checked={isIrregular === false}
              onChange={() => onIrregularChange(false)}
            />
            Regular
          </label>

          <label className={css.radioLabel}>
            <input
              type="radio"
              name="verbType"
              checked={isIrregular === true}
              onChange={() => onIrregularChange(true)}
            />
            Irregular
          </label>
        </div>
      )}
    </div>
  );
}
