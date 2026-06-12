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

interface Props {
  onClose: () => void;
}

function AddWordForm({ onClose }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddWordFormValues>({ resolver: yupResolver(schema) });

  const categories = useAppSelector(selectCategories);
  const queryClient = useQueryClient();

  const selectedCategory = watch("category");

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: CreateWordPayload) => createWord(payload),
    onError: () => {
      toast.error("Failed to create word");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ownWords"],
      });

      queryClient.invalidateQueries({
        queryKey: ["statistics"],
      });

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
    <div>
      <h2>Add word</h2>
      <p>
        Adding a new word to the dictionary is an important step in enriching
        the language base and expanding the vocabulary.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select {...register("category")} id="category">
          <option value="">Category</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.category && <p>{errors.category.message}</p>}
        {selectedCategory === "verb" && (
          <div>
            <div>
              <input
                {...register("isIrregular")}
                type="radio"
                id="regular"
                value="regular"
              />
              <label htmlFor="regular">Regular</label>
            </div>
            <div>
              <input
                {...register("isIrregular")}
                type="radio"
                id="irregular"
                value="irregular"
              />
              <label htmlFor="irregular">Irregular</label>
            </div>
            {errors.isIrregular && <p>{errors.isIrregular.message}</p>}
          </div>
        )}
        <div>
          <input
            {...register("ua")}
            placeholder="Працювати"
            id="ukrainian"
            type="text"
          />
          <label htmlFor="ukrainian">
            <svg>
              <use href={`${sprite}#icon-ukraine`}></use>
            </svg>{" "}
            Ukrainian
          </label>
        </div>
        {errors.ua && <p>{errors.ua.message}</p>}
        <div>
          <input
            {...register("en")}
            placeholder="Work"
            id="english"
            type="text"
          />
          <label htmlFor="english">
            <svg>
              <use href={`${sprite}#icon-united-kingdom`}></use>
            </svg>{" "}
            English
          </label>
        </div>
        {errors.en && <p>{errors.en.message}</p>}
        <div>
          <button type="submit" disabled={isPending}>
            {isPending ? "Adding..." : "Add"}
          </button>
          <button onClick={onClose} type="button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddWordForm;
