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
