import { api } from "@/api/api";

import type {
  AnswerPayload,
  AnswerResult,
  CreateWordPayload,
  DeleteWordResponse,
  EditWordPayload,
  GetWordsParams,
  StatisticsResponse,
  TasksResponse,
  Word,
  WordsResponse,
} from "@/types/word";

import type { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>("/words/categories");

  return data;
}

export async function getOwnWords(
  params: GetWordsParams = {},
): Promise<WordsResponse> {
  const { data } = await api.get<WordsResponse>("/words/own", { params });

  return data;
}

export async function getAllWords(
  params: GetWordsParams = {},
): Promise<WordsResponse> {
  const { data } = await api.get<WordsResponse>("/words/all", { params });

  return data;
}

export async function getStatistics(): Promise<StatisticsResponse> {
  const { data } = await api.get<StatisticsResponse>("/words/statistics");

  return data;
}

export async function createWord(payload: CreateWordPayload): Promise<Word> {
  const { data } = await api.post<Word>("/words/create", payload);

  return data;
}

export async function addWord(wordId: string): Promise<Word> {
  const { data } = await api.post<Word>(`/words/add/${wordId}`);

  return data;
}

export async function editWord(
  wordId: string,
  payload: EditWordPayload,
): Promise<Word> {
  const { data } = await api.patch<Word>(`/words/edit/${wordId}`, payload);

  return data;
}

export async function deleteWord(wordId: string): Promise<DeleteWordResponse> {
  const { data } = await api.delete<DeleteWordResponse>(
    `/words/delete/${wordId}`,
  );

  return data;
}

export async function getTasks(): Promise<TasksResponse> {
  const { data } = await api.get<TasksResponse>("/words/tasks");

  return data;
}

export async function postAnswers(
  answers: AnswerPayload[],
): Promise<AnswerResult[]> {
  const { data } = await api.post<AnswerResult[]>("/words/answers", answers);

  return data;
}
