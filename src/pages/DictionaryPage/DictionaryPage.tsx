import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Dashboard from "@/components/Dashboard/Dashboard";
import WordsTable from "@/components/WordsTable/WordsTable";

import { getOwnWords, getStatistics } from "@/api/words";
import { fetchCategories } from "@/redux/categories/operations";
import {
  selectCategories,
  selectCategoriesIsLoading,
} from "@/redux/categories/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import css from "./DictionaryPage.module.css";

const WORDS_LIMIT = 7;

export default function DictionaryPage() {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategories);
  const isCategoriesLoading = useAppSelector(selectCategoriesIsLoading);

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [isIrregular, setIsIrregular] = useState<boolean | undefined>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories.length, dispatch]);

  const wordsParams = useMemo(
    () => ({
      keyword: keyword || undefined,
      category: category || undefined,
      isIrregular,
      page,
      limit: WORDS_LIMIT,
    }),
    [keyword, category, isIrregular, page],
  );

  const {
    data: wordsData,
    isLoading: isWordsLoading,
    isError: isWordsError,
  } = useQuery({
    queryKey: ["ownWords", wordsParams],
    queryFn: () => getOwnWords(wordsParams),
  });

  const { data: statistics } = useQuery({
    queryKey: ["statistics"],
    queryFn: getStatistics,
  });

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleIrregularChange = (value: boolean | undefined) => {
    setIsIrregular(value);
    setPage(1);
  };

  return (
    <main className={css.page}>
      <div className="container">
        <Dashboard
          categories={categories}
          totalCount={statistics?.totalCount ?? 0}
          keyword={keyword}
          category={category}
          isIrregular={isIrregular}
          onKeywordChange={handleKeywordChange}
          onCategoryChange={handleCategoryChange}
          onIrregularChange={handleIrregularChange}
          onAddWordClick={() => {
            console.log("open add word modal");
          }}
        />

        {isCategoriesLoading && <p>Loading categories...</p>}

        {isWordsLoading && <p>Loading words...</p>}

        {isWordsError && <p>Failed to load words</p>}

        {wordsData && <WordsTable words={wordsData.results} />}
      </div>
    </main>
  );
}
