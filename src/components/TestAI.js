import React, { useState } from 'react';
import { ChessAI } from '../utils/aiEngine';
import { initialBoard, isValidMove } from '../utils/gameLogic';

function TestAI() {
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const addResult = (test, status, message, details = '') => {
    setTestResults(prev => [...prev, { test, status, message, details, timestamp: Date.now() }]);
  };

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    // Test 1: AI Initialization
    try {
      const ai = new ChessAI('medium');
      addResult('AI Initialization', 'success', 'AI created successfully', 
        `Difficulty: ${ai.difficulty}, Max Depth: ${ai.maxDepth}`);
    } catch (error) {
      addResult('AI Initialization', 'error', 'Failed to create AI', error.message);
    }

    // Test 2: Move Generation
    try {
      const ai = new ChessAI('easy');
      const moves = ai.getAllPossibleMoves(initialBoard, 'black');
      addResult('Move Generation', 'success', `Generated ${moves.length} moves for black`,
        `Sample: ${moves.slice(0, 3).map(m => `(${m.from[0]},${m.from[1]})→(${m.to[0]},${m.to[1]})`).join(', ')}`);
    } catch (error) {
      addResult('Move Generation', 'error', 'Failed to generate moves', error.message);
    }

    // Test 3: Board Evaluation
    try {
      const ai = new ChessAI('medium');
      const score = ai.evaluateBoard(initialBoard);
      addResult('Board Evaluation', 'success', `Initial position score: ${score}`,
        'Should be close to 0 for balanced position');
    } catch (error) {
      addResult('Board Evaluation', 'error', 'Failed to evaluate board', error.message);
    }

    // Test 4: AI Move Selection
    try {
      const ai = new ChessAI('easy');
      const startTime = Date.now();
      const bestMove = ai.getBestMove(initialBoard, 'black');
      const endTime = Date.now();
      
      if (bestMove) {
        const piece = initialBoard[bestMove.from[0]][bestMove.from[1]];
        const isValid = isValidMove(initialBoard, bestMove.from, bestMove.to, 'black');
        addResult('AI Move Selection', 'success', 
          `AI selected: ${piece} (${bestMove.from[0]},${bestMove.from[1]})→(${bestMove.to[0]},${bestMove.to[1]})`,
          `Time: ${endTime - startTime}ms, Valid: ${isValid ? 'Yes' : 'No'}`);
      } else {
        addResult('AI Move Selection', 'warning', 'AI could not find a move', '');
      }
    } catch (error) {
      addResult('AI Move Selection', 'error', 'Failed to get AI move', error.message);
    }

    // Test 5: Difficulty Levels
    const difficulties = ['easy', 'medium', 'hard'];
    for (const difficulty of difficulties) {
      try {
        const ai = new ChessAI(difficulty);
        addResult(`Difficulty: ${difficulty}`, 'success', 
          `${difficulty.toUpperCase()} AI created`, `Depth: ${ai.maxDepth}`);
      } catch (error) {
        addResult(`Difficulty: ${difficulty}`, 'error', 
          `Failed to create ${difficulty} AI`, error.message);
      }
    }

    setIsRunning(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return '🔍';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">AI Testing Console</h2>
      
      <div className="mb-4">
        <button
          onClick={runTests}
          disabled={isRunning}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            isRunning 
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isRunning ? 'Running Tests...' : 'Run AI Tests'}
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {testResults.map((result, index) => (
          <div key={index} className="border border-gray-200 rounded p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{getStatusIcon(result.status)}</span>
              <span className="font-semibold text-gray-800">{result.test}</span>
            </div>
            <div className={`text-sm ${getStatusColor(result.status)} mb-1`}>
              {result.message}
            </div>
            {result.details && (
              <div className="text-xs text-gray-500">
                {result.details}
              </div>
            )}
          </div>
        ))}
      </div>

      {testResults.length === 0 && !isRunning && (
        <div className="text-center text-gray-500 py-8">
          Click "Run AI Tests" to test the AI functionality
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold text-gray-800 mb-2">Manual Testing Steps:</h3>
        <ol className="text-sm text-gray-600 space-y-1">
          <li>1. Click "vs AI" in game controls</li>
          <li>2. Select difficulty level (Easy/Medium/Hard)</li>
          <li>3. Make a move as Red pieces</li>
          <li>4. Watch AI think and respond as Black</li>
          <li>5. Try different difficulty levels</li>
          <li>6. Test game reset and mode switching</li>
        </ol>
      </div>
    </div>
  );
}

export default TestAI;