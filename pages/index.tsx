import React, { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";
import QuestionDisplay from "../components/QuestionDisplay";
import AnswerInput from "../components/AnswerInput";

const Home: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  useEffect(() => {
    if (isGameStarted) {
      fetchQuestion();
    }
  }, [isGameStarted]);

  const fetchQuestion = async () => {
    const response = await fetch("/api/generate-question");
    const data = await response.json();
    setQuestion(data.question);
  };

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  const handleAnswer = async (answer: string) => {
    const response = await fetch("/api/answer-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, answer }),
    });
    const data = await response.json();
    // Handle the response (e.g., display if the answer is correct or not)
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Water Thinking Game</h1>
      {!isGameStarted ? (
        <button
          onClick={handleStartGame}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Start Game
        </button>
      ) : (
        <>
          <GameBoard>
            <QuestionDisplay question={question} />
            <AnswerInput onSubmit={handleAnswer} />
          </GameBoard>
        </>
      )}
    </div>
  );
};

export default Home;
