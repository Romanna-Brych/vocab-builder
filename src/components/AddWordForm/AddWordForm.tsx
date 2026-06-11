
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/redux/hooks";
import { selectCategories } from "@/redux/categories/selectors";

import sprite from "@/assets/icons/sprite.svg";

type AddWordFormValues = {
  category: string;
  isIrregular?: "regular" | "irregular";
  en: string;
  ua: string;
};

interface Props {
  onClose: () => void;
}

function AddWordForm({ onClose }: Props) {
  const { register, handleSubmit, watch } = useForm<AddWordFormValues>();

  const categories = useAppSelector(selectCategories);

    const selectedCategory = watch("category");

 function onSubmit(data: AddWordFormValues) {
   console.log(data);
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
        <div>
          <button type="submit">Add</button>
          <button onClick={onClose} type="button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddWordForm;
