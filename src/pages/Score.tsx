import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { useQuestionsStore, useSystemStore } from "../store";
import { createQuestion } from "../api";
import { useState } from "react";
import { Loading } from "../components/Loading";

export function Score() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    questions,
    correctCount,
    difficulty,
    ammount,
    setQuestions,
    resetCounts,
  } = useQuestionsStore();
  const { language, studySubject } = useSystemStore();

  const handleGenerateNewQuestionsClick = async () => {
    resetCounts();
    if (!studySubject) return;
    const questions = await createQuestion(
      studySubject,
      difficulty,
      ammount,
      language
    );
    setQuestions(questions);

    setIsLoading(false);
    navigate("/questions");
  };
  const handleBackToHomeClick = () => {
    resetCounts();
    navigate("/");
  };

  return (
    <div className="min-h-svh flex flex-col items-center justify-center">
      <h1 className="font-medium text-[2.5rem]">
        Você acertou {correctCount}/{questions.length} 🎉
      </h1>
      <div className="flex gap-x-6">
        <Button
          text="Gerar mais questões"
          variant="outline"
          type="button"
          onClick={handleGenerateNewQuestionsClick}
        />

        <Button
          text="Voltar ao início"
          variant="fill"
          type="button"
          onClick={handleBackToHomeClick}
        />
      </div>
    </div>
  );
}
