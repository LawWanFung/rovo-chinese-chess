import React from 'react';
import { useGame } from '../context/GameContext';

function AIStatus() {
  const { state } = useGame();
  const { gameMode, aiDifficulty, isAiThinking, currentPlayer, moveHistory } = state;

  if (gameMode !== 'ai') return null;

  const lastMove = moveHistory[moveHistory.length - 1];
  const aiLastMove = lastMove && lastMove.player === 'black' ? lastMove : null;

  return (
    <div className="bg-gray-50 rounded-lg p-4 mt-4">
      <h4 className="text-lg font-semibold mb-2 text-gray-800">AI Status</h4>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Difficulty:</span>
          <span className="font-medium capitalize">{aiDifficulty}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span className={`font-medium ${isAiThinking ? 'text-blue-600' : 'text-green-600'}`}>
            {isAiThinking ? 'Thinking...' : 'Ready'}
          </span>
        </div>
        
        {aiLastMove && (
          <div className="pt-2 border-t border-gray-200">
            <span className="text-gray-600">Last AI Move:</span>
            <div className="text-xs text-gray-500 mt-1">
              ({aiLastMove.from[0]},{aiLastMove.from[1]}) → ({aiLastMove.to[0]},{aiLastMove.to[1]})
            </div>
          </div>
        )}
        
        <div className="pt-2 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <p>• Easy: Quick moves, basic strategy</p>
            <p>• Medium: Balanced play, looks ahead</p>
            <p>• Hard: Deep analysis, strong play</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIStatus;