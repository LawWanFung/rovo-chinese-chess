import React from 'react';
import { useGame } from '../context/GameContext';
import AIStatus from './AIStatus';

function GameControls() {
  const { state, dispatch } = useGame();
  const { currentPlayer, moveHistory, gameStatus, gameMode, aiDifficulty, isAiThinking } = state;

  const handleResetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  const handleGameModeChange = (mode) => {
    dispatch({ type: 'SET_GAME_MODE', payload: mode });
    dispatch({ type: 'RESET_GAME' });
  };

  const handleDifficultyChange = (difficulty) => {
    dispatch({ type: 'SET_AI_DIFFICULTY', payload: difficulty });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Game Controls</h3>
      
      {/* Game Mode Selection */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Game Mode:</p>
        <div className="flex gap-2">
          <button
            onClick={() => handleGameModeChange('human')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              gameMode === 'human'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Human vs Human
          </button>
          <button
            onClick={() => handleGameModeChange('ai')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              gameMode === 'ai'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            vs AI
          </button>
        </div>
      </div>

      {/* AI Difficulty (only show when AI mode is selected) */}
      {gameMode === 'ai' && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">AI Difficulty:</p>
          <select
            value={aiDifficulty}
            onChange={(e) => handleDifficultyChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      )}

      {/* Current Player */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">Current Player:</p>
        <div className="flex items-center gap-2">
          <p className={`text-lg font-semibold ${
            currentPlayer === 'red' ? 'text-red-600' : 'text-gray-800'
          }`}>
            {currentPlayer === 'red' ? '紅方 (Red)' : 
             gameMode === 'ai' ? '黑方 (AI)' : '黑方 (Black)'}
          </p>
          {isAiThinking && (
            <div className="flex items-center gap-1">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
              <span className="text-xs text-gray-500">Thinking...</span>
            </div>
          )}
        </div>
      </div>

      {/* Game Status */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">Status:</p>
        <p className={`text-lg font-semibold capitalize ${
          gameStatus === 'check' ? 'text-red-600' :
          gameStatus === 'red_wins' ? 'text-red-600' :
          gameStatus === 'black_wins' ? 'text-gray-800' :
          'text-green-600'
        }`}>
          {gameStatus === 'check' ? 'Check!' :
           gameStatus === 'red_wins' ? 'Red Wins!' :
           gameStatus === 'black_wins' ? 'Black Wins!' :
           'Playing'}
        </p>
      </div>

      {/* Controls */}
      <div className="space-y-2">
        <button
          onClick={handleResetGame}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          New Game
        </button>
        
        {/* Game Over Message */}
        {(gameStatus === 'red_wins' || gameStatus === 'black_wins') && (
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded">
            <p className="text-center font-semibold text-yellow-800">
              🎉 Game Over! 
              {gameStatus === 'red_wins' ? ' Red Player Wins!' : ' Black Player Wins!'}
            </p>
            <p className="text-center text-sm text-yellow-700 mt-1">
              Click "New Game" to play again
            </p>
          </div>
        )}
        
        {/* Check Warning */}
        {gameStatus === 'check' && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded">
            <p className="text-center font-semibold text-red-800">
              ⚠️ Check! 
            </p>
            <p className="text-center text-sm text-red-700 mt-1">
              {currentPlayer === 'red' ? 'Red' : 'Black'} king is in danger!
            </p>
          </div>
        )}
      </div>

      {/* Move History */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2 text-gray-800">Move History</h4>
        <div className="max-h-40 overflow-y-auto bg-gray-50 rounded p-2">
          {moveHistory.length === 0 ? (
            <p className="text-gray-500 text-sm">No moves yet</p>
          ) : (
            <div className="space-y-1">
              {moveHistory.map((move, index) => (
                <div key={index} className="text-sm">
                  <span className={`font-semibold ${
                    move.player === 'red' ? 'text-red-600' : 'text-gray-800'
                  }`}>
                    {move.player === 'red' ? 'Red' : 'Black'}:
                  </span>
                  <span className="ml-2">
                    ({move.from[0]},{move.from[1]}) → ({move.to[0]},{move.to[1]})
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Game Rules */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2 text-gray-800">How to Play</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• Click a piece to select it</p>
          <p>• Click another square to move</p>
          <p>• Red (human) moves first</p>
          {gameMode === 'ai' && <p>• AI plays as Black pieces</p>}
          <p>• Capture opponent's general to win</p>
        </div>
      </div>
      
      {/* AI Status Component */}
      <AIStatus />
    </div>
  );
}

export default GameControls;