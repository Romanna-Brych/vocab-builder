import { useQuery } from "@tanstack/react-query";

import { getOwnWords } from "@/api/words";
import WordsTable from "@/components/WordsTable/WordsTable";

export default function DictionaryPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ownWords"],
    queryFn: () =>
      getOwnWords({
        page: 1,
        limit: 7,
      }),
  });

  if (isLoading) {
    return <p>Loading words...</p>;
  }

  if (isError) {
    return <p>Failed to load words</p>;
  }

  return (
    <main>
      <h1>Dictionary</h1>

      <WordsTable words={data?.results ?? []} />
    </main>
  );
}
