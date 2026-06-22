import { useEffect, useState } from "react";

import sprite from "@/assets/icons/sprite.svg";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import type { Category } from "@/types/category";

import css from "./Filters.module.css";
import CustomSelect from "../CustomSelect/CustomSelect";

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

  const categoryOptions = categories.map((c) => ({
    value: c,
    label: c,
  }));

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

      <div className={`${css.selectWrapper} ${css.brandField}`}>
        <CustomSelect
          id="category"
          value={category}
          placeholder="Categories"
          options={categoryOptions}
          onChange={handleCategoryChange}
          className={css.select}
        />
      </div>

      {category === "verb" && (
        <div className={css.radioGroup}>
          <label className={css.radioLabel}>
            <input
              type="radio"
              name="verbType"
              checked={isIrregular === false}
              onChange={() => onIrregularChange(false)}
              className={css.radioInput}
            />
            <span className={css.customRadio} />
            Regular
          </label>

          <label className={css.radioLabel}>
            <input
              type="radio"
              name="verbType"
              checked={isIrregular === true}
              onChange={() => onIrregularChange(true)}
              className={css.radioInput}
            />
            <span className={css.customRadio} />
            Irregular
          </label>
        </div>
      )}
    </div>
  );
}
