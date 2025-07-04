import React from 'react';
import { useGame } from '../context/GameContext';
import ChessSquare from './ChessSquare';
import { getPieceColorWithPosition } from '../utils/gameLogic';

function ChessBoard() {
  const { state, dispatch } = useGame();
  const { board, selectedSquare, gameMode, currentPlayer, isAiThinking } = state;

  const handleSquareClick = (row, col) => {
    // Prevent moves during AI thinking, when it's AI's turn, or when game is over
    if (isAiThinking || 
        (gameMode === 'ai' && currentPlayer === 'black') ||
        state.gameStatus === 'red_wins' || 
        state.gameStatus === 'black_wins') {
      return;
    }

    if (selectedSquare) {
      // If a square is already selected, try to make a move
      const [selectedRow, selectedCol] = selectedSquare;
      if (selectedRow === row && selectedCol === col) {
        // Clicking the same square deselects it
        dispatch({ type: 'SELECT_SQUARE', payload: null });
      } else {
        // Try to make a move
        dispatch({
          type: 'MAKE_MOVE',
          payload: { from: selectedSquare, to: [row, col] }
        });
      }
    } else {
      // Select the square if it has a piece and it belongs to current player
      const piece = board[row][col];
      if (piece) {
        // In AI mode, only allow selecting red pieces (human player)
        if (gameMode === 'ai') {
          const pieceColor = getPieceColorWithPosition(piece, row, col);
          if (pieceColor === currentPlayer) {
            dispatch({ type: 'SELECT_SQUARE', payload: [row, col] });
          }
        } else {
          // In human vs human mode, allow selecting pieces of current player
          const pieceColor = getPieceColorWithPosition(piece, row, col);
          if (pieceColor === currentPlayer) {
            dispatch({ type: 'SELECT_SQUARE', payload: [row, col] });
          }
        }
      }
    }
  };

  return (
    <div className={`bg-amber-100 p-4 rounded-lg shadow-lg transition-opacity ${
      isAiThinking ? 'opacity-75' : 'opacity-100'
    }`}>
      <div className="relative bg-amber-50 p-6 rounded border-2 border-amber-800">
        {/* Board Background with Lines - Full width */}
        <svg 
          width="100%" 
          height="540" 
          className="block"
          style={{ pointerEvents: 'none' }}
        >
          {/* Calculate dynamic spacing based on container width */}
          <defs>
            <style>{`
              .board-line { stroke: #8B4513; stroke-width: 2; }
              .palace-line { stroke: #8B4513; stroke-width: 2; }
              .river-text { font-size: 16px; font-weight: bold; fill: #1e40af; text-anchor: middle; }
            `}</style>
          </defs>
          
          {/* Horizontal lines (10 ranks) */}
          {Array.from({ length: 10 }, (_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 54}
              x2="100%"
              y2={i * 54}
              className="board-line"
            />
          ))}
          
          {/* Vertical lines (9 files) */}
          {Array.from({ length: 9 }, (_, i) => (
            <line
              key={`v-${i}`}
              x1={`${(i / 8) * 100}%`}
              y1="0"
              x2={`${(i / 8) * 100}%`}
              y2="486"
              className="board-line"
            />
          ))}
          
          {/* Palace diagonal lines - Black side (top) - 3x3 grid with X */}
          <line x1="37.5%" y1="0" x2="62.5%" y2="108" className="palace-line" />
          <line x1="62.5%" y1="0" x2="37.5%" y2="108" className="palace-line" />
          
          {/* Palace diagonal lines - Red side (bottom) - 3x3 grid with X */}
          <line x1="37.5%" y1="378" x2="62.5%" y2="486" className="palace-line" />
          <line x1="62.5%" y1="378" x2="37.5%" y2="486" className="palace-line" />
          
          {/* River area between 5th and 6th ranks */}
          <rect x="0" y="216" width="100%" height="54" fill="rgba(59, 130, 246, 0.1)" />
          
          {/* River Text - 楚河 and 漢界 */}
          <text x="25%" y="248" className="river-text">楚河</text>
          <text x="75%" y="248" className="river-text">漢界</text>
          
          {/* Soldier starting position crosses */}
          {/* Black soldiers (row 3) */}
          {[0, 2, 4, 6, 8].map(col => (
            <g key={`cross-black-${col}`}>
              <line x1={`${(col / 8) * 100 - 1}%`} y1="162" x2={`${(col / 8) * 100 + 1}%`} y2="162" stroke="#8B4513" strokeWidth="1" />
              <line x1={`${(col / 8) * 100}%`} y1="156" x2={`${(col / 8) * 100}%`} y2="168" stroke="#8B4513" strokeWidth="1" />
            </g>
          ))}
          
          {/* Red soldiers (row 6) */}
          {[0, 2, 4, 6, 8].map(col => (
            <g key={`cross-red-${col}`}>
              <line x1={`${(col / 8) * 100 - 1}%`} y1="324" x2={`${(col / 8) * 100 + 1}%`} y2="324" stroke="#8B4513" strokeWidth="1" />
              <line x1={`${(col / 8) * 100}%`} y1="318" x2={`${(col / 8) * 100}%`} y2="330" stroke="#8B4513" strokeWidth="1" />
            </g>
          ))}
        </svg>
        
        {/* Pieces positioned on intersections */}
        <div className="absolute top-6 left-6 right-6" style={{ height: '486px' }}>
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="absolute"
                style={{
                  left: `${(colIndex / 8) * 100}%`,
                  top: `${rowIndex * 54}px`,
                  transform: 'translate(-50%, -50%)',
                  width: '48px',
                  height: '48px'
                }}
              >
                <ChessSquare
                  piece={piece}
                  row={rowIndex}
                  col={colIndex}
                  isSelected={
                    selectedSquare &&
                    selectedSquare[0] === rowIndex &&
                    selectedSquare[1] === colIndex
                  }
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  disabled={isAiThinking || (gameMode === 'ai' && currentPlayer === 'black')}
                />
              </div>
            ))
          )}
        </div>
        
        {/* AI thinking overlay */}
        {isAiThinking && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded">
            <div className="bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
              <span className="text-sm font-medium text-gray-700">AI is thinking...</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Game mode indicator */}
      <div className="text-center mt-2 text-xs text-gray-500">
        {gameMode === 'ai' ? 'Playing against AI' : 'Human vs Human'}
      </div>
    </div>
  );
}

export default ChessBoard;