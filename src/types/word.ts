export type Word = {
  _id: string;
  en: string;
  ua: string;
  category: string;
  isIrregular?: boolean;
  owner?: string;
  progress?: number;
};

export type WordsResponse = {
  results: Word[];
  totalPages: number;
  page: number;
  perPage: number;
};

export type GetWordsParams = {
  keyword?: string;
  category?: string;
  isIrregular?: boolean;
  page?: number;
  limit?: number;
};

export type CreateWordPayload = {
  en: string;
  ua: string;
  category: string;
  isIrregular?: boolean;
};

export type EditWordPayload = CreateWordPayload;

export type DeleteWordResponse = {
  message: string;
  id: string;
};

export type StatisticsResponse = {
  totalCount: number;
};

export type TrainingTask = {
  _id: string;
  ua?: string;
  en?: string;
  task: "ua" | "en";
};

export type TasksResponse = {
  tasks: TrainingTask[];
};

export type AnswerPayload = {
  _id: string;
  en?: string;
  ua?: string;
  task: "ua" | "en";
};

export type AnswerResult = {
  _id: string;
  en?: string;
  ua?: string;
  task: "ua" | "en";
  isDone: boolean;
};
