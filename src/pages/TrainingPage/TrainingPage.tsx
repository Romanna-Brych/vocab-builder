import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { getTasks, postAnswers } from "@/api/words";
import type { AnswerPayload, AnswerResult, TasksResponse } from "@/types/word";
import TrainingRoom from "@/components/TrainingRoom/TrainingRoom";
import ProgressBar from "@/components/ProgressBar/ProgressBar";

import css from "./TrainingPage.module.css";
import Modal from "@/components/Modal/Modal";
import WellDoneModal from "@/components/WellDoneModal/WellDoneModal";

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
      console.log("Бекенд відповідь:", data);
      setResults(data);
      setIsResultModalOpen(true);
    },
    onError: (error: unknown) => {
      toast.error("Training progress was not saved");
      console.error(error);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load training tasks</p>;

  const tasks = data?.tasks ?? [];

  if (tasks.length === 0) return <p>No tasks</p>;

  const currentTask = tasks[currentIndex];

  const question = currentTask.task === "ua" ? currentTask.en : currentTask.ua;
  const answerLanguage = currentTask.task === "ua" ? "Ukrainian" : "English";
  const questionLanguage = currentTask.task === "ua" ? "English" : "Ukrainian";

  const isLastTask = currentIndex === tasks.length - 1;
  const progress = Math.round(((currentIndex + 1) / tasks.length) * 100);

  const isAnswerEmpty = !answer.trim();

  function createCurrentAnswer(): AnswerPayload {
    const trimmedAnswer = answer.trim();

    return {
      _id: currentTask._id,
      task: currentTask.task,
      en: currentTask.en || "",
      ua: currentTask.ua || "",
      [currentTask.task]: trimmedAnswer,
    };
  }

  function handleNext() {
    const currentAnswer = createCurrentAnswer();

    setAnswers((prev) => [...prev, currentAnswer]);
    setAnswer("");
    setCurrentIndex((prev) => prev + 1);
  }

  function handleSave() {
    const currentAnswer = createCurrentAnswer();
    const finalAnswers = [...answers, currentAnswer];
    console.log("Дані, які ми відправляємо на бекенд:", finalAnswers);
    mutate(finalAnswers);
  }

  function handleModalClose() {
    setIsResultModalOpen(false);
    navigate("/dictionary");
  }

  return (
    <main className={css.page}>
      <div className="container">
        <div className={css.trainingWrapper}>
          <div className={css.progress}>
            <ProgressBar
              color="var(--color-primary)"
              value={progress}
              size={56}
              showTextInside={true}
            />
          </div>

          <TrainingRoom
            answer={answer}
            question={question ?? ""}
            answerLanguage={answerLanguage}
            questionLanguage={questionLanguage}
            isLastTask={isLastTask}
            isPending={isPending}
            isNextDisabled={isAnswerEmpty}
            isSaveDisabled={isAnswerEmpty || isPending}
            onAnswerChange={(value) => {
              if (answerLanguage === "English") {
                const filtered = value.replace(/[^a-zA-Z\s\-']/g, "");
                setAnswer(filtered);
              } else {
                const filtered = value.replace(/[^а-яА-ЯіІїЇєЄґҐ\s\-’']/g, "");
                setAnswer(filtered);
              }
            }}
            onNext={handleNext}
            onSave={handleSave}
            onCancel={() => navigate("/dictionary")}
          />
        </div>
      </div>
      {isResultModalOpen && (
        <Modal onClose={handleModalClose} maxWidth="518px">
          <WellDoneModal results={results} />
        </Modal>
      )}
    </main>
  );
}

export default TrainingPage;
