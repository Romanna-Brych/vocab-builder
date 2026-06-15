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
  showProgress?: boolean;
  onEdit?: (word: Word) => void;
  onDelete?: (wordId: string) => void;
  onAddToDictionary?: (wordId: string) => void;
};

export default function WordsTable({
  words,
  showCategory = true,
  showActions = true,
  showAddToDictionary = false,
  showProgress = true,
  onEdit,
  onDelete,
  onAddToDictionary,
}: Props) {
  const colSpan =
    2 +
    Number(showCategory) +
    Number(showProgress) +
    Number(showActions || showAddToDictionary);

  const isRecommendTable = showAddToDictionary && !showProgress;
  const isDictionaryTable = showProgress;

  return (
    <div className={css.tableCard}>
      <table
        className={`${css.table} ${
          isRecommendTable ? css.recommendTable : ""
        } ${isDictionaryTable ? css.dictionaryTable : ""}`}
      >
        <thead>
          <tr>
            <th className={css.wordCell}>
              <span className={css.headCell}>
                Word
                <svg className={css.flagIcon}>
                  <use href={`${sprite}#icon-united-kingdom`} />
                </svg>
              </span>
            </th>

            <th className={css.translationCell}>
              <span className={css.headCell}>
                Translation
                <svg className={css.flagIcon}>
                  <use href={`${sprite}#icon-ukraine`} />
                </svg>
              </span>
            </th>

            {showCategory && <th className={css.categoryCell}>Category</th>}

            {showProgress && <th className={css.progressCell}>Progress</th>}

            {(showActions || showAddToDictionary) && (
              <th className={css.actionsCell} />
            )}
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
                <td className={css.wordCell}>{word.en}</td>
                <td className={css.translationCell}>{word.ua}</td>

                {showCategory && (
                  <td className={css.categoryCell}>{word.category}</td>
                )}

                {showProgress && (
                  <td className={css.progressCell}>
                    <ProgressBar value={word.progress ?? 0} />
                  </td>
                )}

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
                        <span className={css.addText}>Add to dictionary</span>
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
