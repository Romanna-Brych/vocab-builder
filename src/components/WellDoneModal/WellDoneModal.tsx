import type { AnswerResult } from "@/types/word";
import bookImg from "@/assets/images/orange-book-floating.webp";
import bookImg2x from "@/assets/images/orange-book-floating-2.webp";

import css from "./WellDoneModal.module.css";

type Props = {
  results: AnswerResult[];
};

function WellDoneModal({ results }: Props) {
  const correctAnswers = results.filter((res) => res.isDone === true);
  const incorrectAnswers = results.filter((res) => res.isDone === false);

  return (
    <div className={css.modalContainer}>
      <h2 className={css.title}>Well done</h2>

      <div className={css.resultsWrapper}>
        <div className={css.column}>
          <p className={css.columnTitle}>Correct answers:</p>
          <ul className={css.list}>
            {correctAnswers.map((a) => (
              <li key={a._id} className={css.item}>
                {a.en || a.ua}
              </li>
            ))}
          </ul>
        </div>

        <div className={css.column}>
          <p className={css.columnTitle}>Mistakes:</p>
          <ul className={css.list}>
            {incorrectAnswers.map((a) => (
              <li key={a._id} className={css.item}>
                {a.en || a.ua}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={css.imageRow}>
        <picture className={css.bookDecoration}>
          <source srcSet={`${bookImg} 1x, ${bookImg2x} 2x`} type="image/webp" />
          <img
            src={bookImg}
            alt="Orange floating book"
            width="124"
            height="auto"
          />
        </picture>
      </div>
    </div>
  );
}

export default WellDoneModal;
