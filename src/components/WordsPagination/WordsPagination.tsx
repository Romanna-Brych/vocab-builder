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
  if (totalPages <= 1) return null;

  const getPaginationPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...left");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push("...right");
    }

    pages.push(totalPages);

    return pages;
  };

  const visiblePages = getPaginationPages();

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

      {visiblePages.map((page) => {
        if (typeof page === "string") {
          return (
            <span key={page} className={css.ellipsis}>
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            type="button"
            className={`${css.pageBtn} ${currentPage === page ? css.active : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}

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
