import React, { useState } from "react";

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
}

const AnswerInput: React.FC<AnswerInputProps> = ({ onSubmit }) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim() === "") {
      setFeedback("回答を入力してください。");
      return;
    }

    try {
      await onSubmit(answer);
      setAnswer("");
      setFeedback("回答を送信しました。");
    } catch (error) {
      setFeedback(
        "回答の送信中にエラーが発生しました。もう一度お試しください。"
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="answer"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            あなたの回答：
          </label>
          <textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            placeholder="ここに回答を入力してください..."
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            回答を送信
          </button>
          {feedback && <p className="text-sm text-gray-600">{feedback}</p>}
        </div>
      </form>
    </div>
  );
};

export default AnswerInput;
