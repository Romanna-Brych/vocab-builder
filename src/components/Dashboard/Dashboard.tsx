import { Link } from "react-router-dom";

import sprite from "@/assets/icons/sprite.svg";
import Filters from "@/components/Filters/Filters";
import type { Category } from "@/types/category";

import css from "./Dashboard.module.css";

type Props = {
  categories: Category[];
  totalCount?: number;
  keyword: string;
  category: string;
  isIrregular?: boolean;
  showAddButton?: boolean;
  onKeywordChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onIrregularChange: (value: boolean | undefined) => void;
  onAddWordClick?: () => void;
};

export default function Dashboard({
  categories,
  totalCount = 0,
  keyword,
  category,
  isIrregular,
  showAddButton = true,
  onKeywordChange,
  onCategoryChange,
  onIrregularChange,
  onAddWordClick,
}: Props) {
  return (
    <section className={css.dashboard}>
      <Filters
        categories={categories}
        keyword={keyword}
        category={category}
        isIrregular={isIrregular}
        onKeywordChange={onKeywordChange}
        onCategoryChange={onCategoryChange}
        onIrregularChange={onIrregularChange}
      />

      <div className={css.info}>
        <p className={css.statistics}>
          To study: <span>{totalCount}</span>
        </p>

        <div className={css.actions}>
          {showAddButton && (
            <button
              type="button"
              className={css.actionBtn}
              onClick={onAddWordClick}
            >
              Add word
              <svg className={css.icon}>
                <use href={`${sprite}#icon-plus`} />
              </svg>
            </button>
          )}

          <Link to="/training" className={css.actionBtn}>
            Train oneself
            <svg className={css.icon}>
              <use href={`${sprite}#icon-switch-horizontal-01`} />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
