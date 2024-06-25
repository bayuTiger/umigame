import React from "react";

interface GameBoardProps {
  children: React.ReactNode;
}

const GameBoard: React.FC<GameBoardProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Water Thinking Puzzle</h2>
      {children}
    </div>
  );
};

export default GameBoard;
