import sprite from "@/assets/icons/sprite.svg";
import css from "./TrainingRoom.module.css";
import { useEffect, useRef } from "react";

type Language = "Ukrainian" | "English";

type Props = {
  answer: string;
  question: string;
  answerLanguage: Language;
  questionLanguage: Language;
  isLastTask: boolean;
  isPending: boolean;
  isNextDisabled: boolean;
  isSaveDisabled: boolean;
  onAnswerChange: (value: string) => void;
  onNext: () => void;
  onSave: () => void;
  onCancel: () => void;
};

export default function TrainingRoom({
  answer,
  question,
  answerLanguage,
  questionLanguage,
  isLastTask,
  isPending,
  isNextDisabled,
  isSaveDisabled,
  onAnswerChange,
  onNext,
  onSave,
  onCancel,
}: Props) {
  const answerIcon =
    answerLanguage === "Ukrainian" ? "icon-ukraine" : "icon-united-kingdom";

  const questionIcon =
    questionLanguage === "Ukrainian" ? "icon-ukraine" : "icon-united-kingdom";

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [question]);

  return (
    <section className={css.room}>
      <div className={css.card}>
        <div className={css.answerSide}>
          <textarea
            ref={textareaRef}
            className={css.textarea}
            value={answer}
            onChange={(event) => onAnswerChange(event.target.value)}
            placeholder="Введіть переклад"
          />

          {!isLastTask && (
            <button
              type="button"
              className={css.nextBtn}
              onClick={onNext}
              disabled={isNextDisabled}
            >
              Next
              <svg className={css.arrowIcon}>
                <use href={`${sprite}#icon-switch-horizontal-01`} />
              </svg>
            </button>
          )}

          <div className={css.languageLabel}>
            <svg className={css.flagIcon}>
              <use href={`${sprite}#${answerIcon}`} />
            </svg>
            <span>{answerLanguage}</span>
          </div>
        </div>

        <div className={css.questionSide}>
          <p className={css.question}>{question}</p>

          <div className={css.languageLabel}>
            <svg className={css.flagIcon}>
              <use href={`${sprite}#${questionIcon}`} />
            </svg>
            <span>{questionLanguage}</span>
          </div>
        </div>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.saveBtn}
          onClick={onSave}
          disabled={isSaveDisabled}
        >
          {isPending ? "Saving..." : "Save"}
        </button>

        <button type="button" className={css.cancelBtn} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </section>
  );
}
