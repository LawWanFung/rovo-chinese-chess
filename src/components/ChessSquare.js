import React from 'react';
import { getPieceColorWithPosition, getPieceDisplay } from '../utils/gameLogic';

function ChessSquare({ piece, row, col, isSelected, onClick, disabled = false }) {
  const pieceColor = getPieceColorWithPosition(piece, row, col);
  
  // Check if this is a soldier starting position
  const isSoldierStart = (row === 3 && col % 2 === 0) || (row === 6 && col % 2 === 0);
  
  return (
    <div
      className={`
        w-12 h-12 rounded-full flex items-center justify-center
        transition-all duration-200 relative
        ${isSelected ? 'bg-yellow-400 shadow-lg scale-110' : 'bg-transparent hover:bg-yellow-100'}
        ${disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}
      `}
      onClick={disabled ? undefined : onClick}
    >
      {/* Intersection point marker */}
      <div className={`
        absolute w-2 h-2 rounded-full 
        ${piece ? 'bg-transparent' : 'bg-amber-700'}
      `} />
      
      {/* Soldier starting position markers */}
      {isSoldierStart && !piece && (
        <div className="absolute">
          <div className="w-1 h-3 bg-amber-600 absolute -translate-x-0.5 -translate-y-1.5"></div>
          <div className="w-3 h-1 bg-amber-600 absolute -translate-x-1.5 -translate-y-0.5"></div>
        </div>
      )}
      
      {/* Piece */}
      {piece && (
        <div className={`
          w-10 h-10 rounded-full flex items-center justify-center
          border-2 shadow-lg
          ${pieceColor === 'red' 
            ? 'bg-red-50 border-red-600 text-red-700' 
            : 'bg-gray-50 border-gray-700 text-gray-800'}
          ${isSelected ? 'ring-2 ring-yellow-400' : ''}
        `}>
          <span className={`
            text-lg font-bold select-none
            ${isSelected ? 'scale-110' : ''}
            transition-transform
          `}>
            {getPieceDisplay(piece)}
          </span>
        </div>
      )}
    </div>
  );
}

export default ChessSquare;