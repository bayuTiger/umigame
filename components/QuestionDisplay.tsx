import React from "react";

interface QuestionDisplayProps {
  question: string;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-2">問題：</h3>
      <p className="text-gray-700">{question}</p>
    </div>
  );
};

export default QuestionDisplay;
