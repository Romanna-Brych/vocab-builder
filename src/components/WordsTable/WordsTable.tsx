import sprite from "@/assets/icons/sprite.svg";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import WordActions from "@/components/WordActions/WordActions";
import type { Word } from "@/types/word";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
  const hasActionsColumn = showActions || showAddToDictionary;

  const colSpan =
    2 + Number(showCategory) + Number(showProgress) + Number(hasActionsColumn);

  const isRecommendTable = showAddToDictionary && !showProgress;
  const isDictionaryTable = showProgress;

  return (
    <div className={css.tableCard}>
      <table
        className={`${css.table} ${
          isRecommendTable ? css.recommendTable : ""
        } ${isDictionaryTable ? css.dictionaryTable : ""}`}
      >
        <colgroup>
          <col className={css.colWord} />
          <col className={css.colTranslation} />
          {showCategory && <col className={css.colCategory} />}
          {showProgress && <col className={css.colProgress} />}
          {hasActionsColumn && <col className={css.colActions} />}
        </colgroup>

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

            {showCategory && <th>Category</th>}
            {showProgress && <th className={css.progressCell}>Progress</th>}
            {hasActionsColumn && <th className={css.actionsCell} />}
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

                {showCategory && <td>{word.category}</td>}

                {showProgress && (
                  <td className={css.progressCell}>
                    {word.progress !== undefined && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "12px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "var(--color-text-primary)",
                            display: { xs: "none", sm: "block" },
                            minWidth: "45px",
                          }}
                        >
                          {word.progress}%
                        </Typography>

                        <ProgressBar value={word.progress} size={26} />
                      </Box>
                    )}
                  </td>
                )}

                {hasActionsColumn && (
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
