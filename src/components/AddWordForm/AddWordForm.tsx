import { useForm } from "react-hook-form";
import { useAppSelector } from "@/redux/hooks";
import { selectCategories } from "@/redux/categories/selectors";
import * as Yup from "yup";

import sprite from "@/assets/icons/sprite.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { createWord } from "@/api/words";
import { type CreateWordPayload } from "@/types/word";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import css from "./AddWordForm.module.css";

type AddWordFormValues = {
  category: string;
  isIrregular?: "regular" | "irregular";
  en: string;
  ua: string;
};

const schema: Yup.ObjectSchema<AddWordFormValues> = Yup.object({
  category: Yup.string().required("Category is required"),

  isIrregular: Yup.string()
    .oneOf(["regular", "irregular"])
    .when("category", {
      is: "verb",
      then: (schema) => schema.required("Choose verb type"),
      otherwise: (schema) => schema.optional(),
    }),

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
};

export default function AddWordForm({ onClose }: Props) {
  const categories = useAppSelector(selectCategories);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddWordFormValues>({
    resolver: yupResolver(schema),
  });

  const selectedCategory = watch("category");

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: CreateWordPayload) => createWord(payload),

    onError: () => {
      toast.error("Failed to create word");
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ownWords"] });
      queryClient.invalidateQueries({ queryKey: ["statistics"] });

      toast.success("Word added");
      onClose();
    },
  });

  function onSubmit(data: AddWordFormValues) {
    const payload: CreateWordPayload = {
      category: data.category,
      en: data.en,
      ua: data.ua,
      ...(data.category === "verb" && {
        isIrregular: data.isIrregular === "irregular",
      }),
    };
    mutate(payload);
  }

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Add word</h2>

      <p className={css.description}>
        Adding a new word to the dictionary is an important step in enriching
        the language base and expanding the vocabulary.
      </p>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.selectWrapper}>
          <select className={css.select} {...register("category")}>
            <option value="">Category</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <svg className={css.chevronIcon}>
            <use href={`${sprite}#icon-chevron-down`} />
          </svg>
        </div>

        {errors.category && (
          <p className={css.error}>{errors.category.message}</p>
        )}

        {selectedCategory === "verb" && (
          <div className={css.verbBlock}>
            <div className={css.radioGroup}>
              <label className={css.radioLabel}>
                <input
                  className={css.radioInput}
                  {...register("isIrregular")}
                  type="radio"
                  value="regular"
                  defaultChecked
                />
                <span className={css.customRadio} />
                Regular
              </label>

              <label className={css.radioLabel}>
                <input
                  className={css.radioInput}
                  {...register("isIrregular")}
                  type="radio"
                  value="irregular"
                />
                <span className={css.customRadio} />
                Irregular
              </label>
            </div>

            {errors.isIrregular && (
              <p className={css.error}>{errors.isIrregular.message}</p>
            )}
          </div>
        )}

        <div className={css.fields}>
          <div className={css.fieldRow}>
            <input
              className={css.input}
              {...register("ua")}
              placeholder="Працювати"
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
              placeholder="Work"
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
            {isPending ? "Adding..." : "Add"}
          </button>

          <button className={css.cancelBtn} onClick={onClose} type="button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
