import sprite from "@/assets/icons/sprite.svg";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import WordActions from "@/components/WordActions/WordActions";
import type { Word } from "@/types/word";

import css from "./WordsTable.module.css";

type Props = {
  words: Word[];
  showCategory?: boolean;
  showActions?: boolean;
  showAddToDictionary?: boolean;
  onEdit?: (word: Word) => void;
  onDelete?: (wordId: string) => void;
  onAddToDictionary?: (wordId: string) => void;
};

export default function WordsTable({
  words,
  showCategory = true,
  showActions = true,
  showAddToDictionary = false,
  onEdit,
  onDelete,
  onAddToDictionary,
}: Props) {
  const colSpan =
    3 + Number(showCategory) + Number(showActions || showAddToDictionary);

  return (
    <div className={css.tableCard}>
      <table className={css.table}>
        <thead>
          <tr>
            <th>
              <span className={css.headCell}>
                Word
                <svg className={css.flagIcon}>
                  <use href={`${sprite}#icon-united-kingdom`} />
                </svg>
              </span>
            </th>

            <th>
              <span className={css.headCell}>
                Translation
                <svg className={css.flagIcon}>
                  <use href={`${sprite}#icon-ukraine`} />
                </svg>
              </span>
            </th>

            {showCategory && <th className={css.categoryCell}>Category</th>}

            <th>Progress</th>

            {(showActions || showAddToDictionary) && <th />}
          </tr>
        </thead>

        <tbody>
          {words.length === 0 ? (
            <tr>
              <td className={css.empty} colSpan={colSpan}>
                No words found
              </td>
            </tr>
          ) : (
            words.map((word) => (
              <tr key={word._id}>
                <td>{word.en}</td>
                <td>{word.ua}</td>

                {showCategory && (
                  <td className={css.categoryCell}>{word.category}</td>
                )}

                <td>
                  <ProgressBar value={word.progress ?? 0} />
                </td>

                {(showActions || showAddToDictionary) && (
                  <td className={css.actionsCell}>
                    {showActions && (
                      <WordActions
                        onEdit={() => onEdit?.(word)}
                        onDelete={() => onDelete?.(word._id)}
                      />
                    )}

                    {showAddToDictionary && (
                      <button
                        type="button"
                        className={css.addBtn}
                        onClick={() => onAddToDictionary?.(word._id)}
                      >
                        Add to dictionary{" "}
                        <svg className={css.icon}>
                          <use href={`${sprite}#icon-switch-horizontal-01`} />
                        </svg>
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
