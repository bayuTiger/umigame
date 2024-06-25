import React from "react";

interface AIResponseProps {
  response: string;
}

const AIResponse: React.FC<AIResponseProps> = ({ response }) => {
  return (
    <div className="bg-green-100 p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-2">AIの回答：</h3>
      <p className="text-gray-700">{response}</p>
    </div>
  );
};

export default AIResponse;
