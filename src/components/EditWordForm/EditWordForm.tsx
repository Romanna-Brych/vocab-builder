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

type EditWordForm = {
  en: string;
  ua: string;
};

const schema: Yup.ObjectSchema<EditWordForm> = Yup.object({
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
  word: Word;
}

function EditWordForm({ onClose, word }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditWordForm>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({
      ua: word.ua,
      en: word.en,
    });
  }, [word, reset]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: EditWordPayload) => editWord(word._id, payload),
    onError: () => {
      toast.error("Failed to edit word");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ownWords"],
      });

      queryClient.invalidateQueries({
        queryKey: ["statistics"],
      });

      toast.success("Word edited");
      onClose();
    },
  });

  function onSubmit(data: EditWordForm) {
    const payload: EditWordPayload = {
      en: data.en,
      ua: data.ua,
      category: word.category,
      isIrregular: word.isIrregular,
    };
    mutate(payload);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register("ua")} id="ukrainian" type="text" />
        <label htmlFor="ukrainian">
          <svg>
            <use href={`${sprite}#icon-ukraine`}></use>
          </svg>{" "}
          Ukrainian
        </label>
      </div>
      {errors.ua && <p>{errors.ua.message}</p>}
      <div>
        <input {...register("en")} id="english" type="text" />
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
          {isPending ? "Saving..." : "Save"}
        </button>
        <button onClick={onClose} type="button">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditWordForm;
