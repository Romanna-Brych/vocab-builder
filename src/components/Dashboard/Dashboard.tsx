import { Link } from "react-router-dom";

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

      <div className={css.actions}>
        <p className={css.statistics}>
          To study: <span>{totalCount}</span>
        </p>

        {showAddButton && (
          <button
            type="button"
            className={css.actionBtn}
            onClick={onAddWordClick}
          >
            Add word +
          </button>
        )}

        <Link to="/training" className={css.actionBtn}>
          Train oneself →
        </Link>
      </div>
    </section>
  );
}
