// Utility functions for game state management and analysis

export function checkGameEnd(board) {
  let blackKing = false, redKing = false;
  
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 9; col++) {
      const piece = board[row][col];
      if (piece === '將') blackKing = true;
      if (piece === '帥') redKing = true;
    }
  }
  
  if (!blackKing) return 'red_wins';
  if (!redKing) return 'black_wins';
  return 'playing';
}

export function formatMoveNotation(from, to, piece) {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  const fromNotation = `${files[from[1]]}${10 - from[0]}`;
  const toNotation = `${files[to[1]]}${10 - to[0]}`;
  return `${piece}${fromNotation}-${toNotation}`;
}

export function getGameStatistics(moveHistory) {
  const redMoves = moveHistory.filter(move => move.player === 'red').length;
  const blackMoves = moveHistory.filter(move => move.player === 'black').length;
  
  return {
    totalMoves: moveHistory.length,
    redMoves,
    blackMoves,
    currentTurn: moveHistory.length + 1
  };
}

export function exportGamePGN(moveHistory) {
  // Simple PGN-like format for Chinese Chess
  let pgn = '[Event "Chinese Chess Game"]\n';
  pgn += `[Date "${new Date().toISOString().split('T')[0]}"]\n`;
  pgn += '[Red "Human"]\n';
  pgn += '[Black "AI"]\n\n';
  
  for (let i = 0; i < moveHistory.length; i += 2) {
    const moveNumber = Math.floor(i / 2) + 1;
    const redMove = moveHistory[i];
    const blackMove = moveHistory[i + 1];
    
    pgn += `${moveNumber}. `;
    if (redMove) {
      pgn += formatMoveNotation(redMove.from, redMove.to, 'R') + ' ';
    }
    if (blackMove) {
      pgn += formatMoveNotation(blackMove.from, blackMove.to, 'B');
    }
    pgn += '\n';
  }
  
  return pgn;
}