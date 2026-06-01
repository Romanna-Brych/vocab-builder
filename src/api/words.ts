import { api } from "@/api/api";
import type { WordsResponse } from "@/types/word";

export type GetWordsParams = {
  keyword?: string;
  category?: string;
  isIrregular?: boolean;
  page?: number;
  limit?: number;
};

export async function getOwnWords(
  params: GetWordsParams,
): Promise<WordsResponse> {
  const { data } = await api.get<WordsResponse>("/words/own", { params });

  return data;
}
