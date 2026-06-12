import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import Dashboard from "@/components/Dashboard/Dashboard";
import WordsTable from "@/components/WordsTable/WordsTable";

import { deleteWord, getOwnWords, getStatistics } from "@/api/words";
import { fetchCategories } from "@/redux/categories/operations";
import {
  selectCategories,
  selectCategoriesIsLoading,
} from "@/redux/categories/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import css from "./DictionaryPage.module.css";
import Modal from "@/components/Modal/Modal";
import AddWordForm from "@/components/AddWordForm/AddWordForm";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import EditWordForm from "@/components/EditWordForm/EditWordForm";
import type { Word } from "@/types/word";

const WORDS_LIMIT = 7;

export default function DictionaryPage() {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategories);
  const isCategoriesLoading = useAppSelector(selectCategoriesIsLoading);

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [isIrregular, setIsIrregular] = useState<boolean | undefined>();
  const [page, setPage] = useState(1);
  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);
  const [isEditWordModalOpen, setIsEditWordModalOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const queryClient = useQueryClient();

  function onAddWordModalOpen() {
    setIsAddWordModalOpen(true);
  }

  function onAddWordModalClose() {
    setIsAddWordModalOpen(false);
  }

  function onEditWordModalOpen() {
    setIsEditWordModalOpen(true);
  }

  function onEditWordModalClose() {
    setIsEditWordModalOpen(false);
  }

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

  const { mutate } = useMutation({
    mutationFn: (word: string) => deleteWord(word),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ownWords"],
      });
      queryClient.invalidateQueries({
        queryKey: ["statistics"],
      });
      toast.success("Word deleted");
    },
    onError: () => {
      toast.error("Failed to delete word");
    },
  });

  function handleWordDelete(wordId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this word?",
    );

    if (!confirmed) return;

    mutate(wordId);
  }

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
          onAddWordClick={onAddWordModalOpen}
        />

        {isCategoriesLoading && <p>Loading categories...</p>}

        {isWordsLoading && <p>Loading words...</p>}

        {isWordsError && <p>Failed to load words</p>}

        {wordsData && (
          <WordsTable
            words={wordsData.results}
            onDelete={handleWordDelete}
            onEdit={(word) => {
              setSelectedWord(word);
              onEditWordModalOpen();
            }}
          />
        )}

        {isAddWordModalOpen && (
          <Modal onClose={onAddWordModalClose}>
            <AddWordForm onClose={onAddWordModalClose} />
          </Modal>
        )}

        {isEditWordModalOpen && selectedWord && (
          <Modal onClose={onEditWordModalClose}>
            <EditWordForm word={selectedWord} onClose={onEditWordModalClose} />
          </Modal>
        )}
      </div>
    </main>
  );
}
