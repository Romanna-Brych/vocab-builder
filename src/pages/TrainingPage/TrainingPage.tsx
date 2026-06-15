import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { getTasks, postAnswers } from "@/api/words";
import type { AnswerPayload, AnswerResult, TasksResponse } from "@/types/word";

function TrainingPage() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<AnswerPayload[]>([]);
  const [results, setResults] = useState<AnswerResult[]>([]);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<TasksResponse>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: postAnswers,

    onSuccess: (data: AnswerResult[]) => {
      setResults(data);
      setIsResultModalOpen(true);
    },

    onError: () => {
      toast.error("Training progress was not saved");
      navigate("/dictionary");
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load training tasks</p>;
  }

  const tasks = data?.tasks ?? [];

  if (tasks.length === 0) {
    return <p>No tasks</p>;
  }

  const currentTask = tasks[currentIndex];

  const question = currentTask.task === "ua" ? currentTask.en : currentTask.ua;

  const answerLanguage = currentTask.task === "ua" ? "Ukrainian" : "English";

  const questionLanguage = currentTask.task === "ua" ? "English" : "Ukrainian";

  const isLastTask = currentIndex === tasks.length - 1;

  const progress = Math.round(((currentIndex + 1) / tasks.length) * 100);

  function createCurrentAnswer(): AnswerPayload | null {
    const trimmedAnswer = answer.trim();

    if (!trimmedAnswer) {
      return null;
    }

    return {
      _id: currentTask._id,
      task: currentTask.task,
      [currentTask.task]: trimmedAnswer,
    };
  }

  function handleNext() {
    const currentAnswer = createCurrentAnswer();

    if (currentAnswer) {
      setAnswers((prev) => [...prev, currentAnswer]);
    }

    setAnswer("");

    if (!isLastTask) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function handleSave() {
    const currentAnswer = createCurrentAnswer();

    const finalAnswers = currentAnswer
      ? [...answers, currentAnswer]
      : [...answers];

    mutate(finalAnswers);
  }

  function handleCloseResultModal() {
    setIsResultModalOpen(false);
    navigate("/dictionary");
  }

  const correctAnswers = results.filter((item) => item.isDone);
  const mistakes = results.filter((item) => !item.isDone);

  return (
    <main>
      <h1>TrainingPage</h1>

      <p>{progress}%</p>

      <div>
        <div>
          <input
            type="text"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Enter translation"
          />

          <p>{answerLanguage}</p>
        </div>

        <div>
          <p>{question}</p>
          <p>{questionLanguage}</p>
        </div>
      </div>

      {!isLastTask ? (
        <button onClick={handleNext} type="button">
          Next
        </button>
      ) : (
        <button onClick={handleSave} type="button" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </button>
      )}

      <button type="button" onClick={() => navigate("/dictionary")}>
        Cancel
      </button>

      {isResultModalOpen && (
        <div>
          <h2>Well done</h2>

          <h3>Correct answers</h3>
          <ul>
            {correctAnswers.map((item) => (
              <li key={item._id}>{item.en || item.ua}</li>
            ))}
          </ul>

          <h3>Mistakes</h3>
          <ul>
            {mistakes.map((item) => (
              <li key={item._id}>{item.en || item.ua}</li>
            ))}
          </ul>

          <button type="button" onClick={handleCloseResultModal}>
            Close
          </button>
        </div>
      )}
    </main>
  );
}

export default TrainingPage;
