import React, { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";
import QuestionDisplay from "../components/QuestionDisplay";
import AnswerInput from "../components/AnswerInput";
import AIResponse from "../components/AIResponse";

const Home: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [aiResponse, setAIResponse] = useState<string>("");

  useEffect(() => {
    if (isGameStarted) {
      fetchQuestion();
    }
  }, [isGameStarted]);

  const fetchQuestion = async () => {
    try {
      const response = await fetch("/api/generate-question");
      const data = await response.json();
      setQuestion(data.question);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const handleStartGame = () => {
    setIsGameStarted(true);
    setAIResponse(""); // Reset AI response when starting a new game
  };

  const handleAnswer = async (answer: string) => {
    try {
      const response = await fetch("/api/answer-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, answer }),
      });
      const data = await response.json();
      setAIResponse(data.response);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">水平思考推理ゲーム</h1>
      {!isGameStarted ? (
        <button
          onClick={handleStartGame}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          ゲームを始める
        </button>
      ) : (
        <GameBoard>
          <QuestionDisplay question={question} />
          {aiResponse && <AIResponse response={aiResponse} />}
          <AnswerInput onSubmit={handleAnswer} />
        </GameBoard>
      )}
    </div>
  );
};

export default Home;
