import sprite from "@/assets/icons/sprite.svg";

import css from "./WordsPagination.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function WordsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  if (totalPages <= 1) return null;

  return (
    <div className={css.pagination}>
      <button
        type="button"
        className={css.pageBtn}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <svg className={css.icon}>
          <use href={`${sprite}#icon-chevrons-left`} />
        </svg>
      </button>

      <button
        type="button"
        className={css.pageBtn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg className={css.icon}>
          <use href={`${sprite}#icon-chevron-left`} />
        </svg>
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`${css.pageBtn} ${currentPage === page ? css.active : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className={css.pageBtn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg className={`${css.icon} ${css.rotate}`}>
          <use href={`${sprite}#icon-chevron-left`} />
        </svg>
      </button>

      <button
        type="button"
        className={css.pageBtn}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <svg className={`${css.icon} ${css.rotate}`}>
          <use href={`${sprite}#icon-chevrons-left`} />
        </svg>
      </button>
    </div>
  );
}
