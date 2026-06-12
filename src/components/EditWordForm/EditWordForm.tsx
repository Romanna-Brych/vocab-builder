import { useForm } from "react-hook-form";
import * as Yup from "yup";

import sprite from "@/assets/icons/sprite.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { editWord } from "@/api/words";
import { type EditWordPayload, type Word } from "@/types/word";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect } from "react";

import css from "./EditWordForm.module.css";

type EditWordFormValues = {
  en: string;
  ua: string;
};

const schema: Yup.ObjectSchema<EditWordFormValues> = Yup.object({
  en: Yup.string()
    .trim()
    .required("English word is required")
    .matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, "Use only English letters"),

  ua: Yup.string()
    .trim()
    .required("Ukrainian word is required")
    .matches(
      /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
      "Use only Ukrainian letters",
    ),
});

type Props = {
  onClose: () => void;
  word: Word;
};

export default function EditWordForm({ onClose, word }: Props) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditWordFormValues>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({
      ua: word.ua,
      en: word.en,
    });
  }, [word, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: EditWordPayload) => editWord(word._id, payload),

    onError: () => {
      toast.error("Failed to edit word");
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ownWords"] });
      queryClient.invalidateQueries({ queryKey: ["statistics"] });

      toast.success("Word edited");
      onClose();
    },
  });

  function onSubmit(data: EditWordFormValues) {
    const payload: EditWordPayload = {
      en: data.en,
      ua: data.ua,
      category: word.category,
      isIrregular: word.isIrregular,
    };

    mutate(payload);
  }

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.fields}>
        <div className={css.fieldRow}>
          <input
            className={css.input}
            {...register("ua")}
            id="ukrainian"
            type="text"
          />

          <label className={css.languageLabel} htmlFor="ukrainian">
            <svg className={css.flagIcon}>
              <use href={`${sprite}#icon-ukraine`} />
            </svg>
            Ukrainian
          </label>
        </div>

        {errors.ua && <p className={css.error}>{errors.ua.message}</p>}

        <div className={css.fieldRow}>
          <input
            className={css.input}
            {...register("en")}
            id="english"
            type="text"
          />

          <label className={css.languageLabel} htmlFor="english">
            <svg className={css.flagIcon}>
              <use href={`${sprite}#icon-united-kingdom`} />
            </svg>
            English
          </label>
        </div>

        {errors.en && <p className={css.error}>{errors.en.message}</p>}
      </div>

      <div className={css.actions}>
        <button className={css.submitBtn} type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </button>

        <button className={css.cancelBtn} onClick={onClose} type="button">
          Cancel
        </button>
      </div>
    </form>
  );
}
