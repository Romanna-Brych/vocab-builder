import type { Word } from "@/types/word";

type Props = {
  words: Word[];
};

export default function WordsTable({ words }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Word 🇬🇧</th>
          <th>Translation 🇺🇦</th>
          <th>Category</th>
          <th>Progress</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {words.length === 0 ? (
          <tr>
            <td colSpan={5}>No words found</td>
          </tr>
        ) : (
          words.map((word) => (
            <tr key={word._id}>
              <td>{word.en}</td>
              <td>{word.ua}</td>
              <td>{word.category}</td>
              <td>{word.progress ?? 0}%</td>
              <td>
                <button type="button">...</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
