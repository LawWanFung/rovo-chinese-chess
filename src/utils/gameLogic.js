// Chinese Chess piece types and initial board setup
export const PIECES = {
  // Red pieces (bottom)
  RED_KING: '帥',
  RED_ADVISOR: '仕',
  RED_ELEPHANT: '相',
  RED_HORSE: '馬',
  RED_CHARIOT: '車',
  RED_CANNON: '炮',
  RED_SOLDIER: '兵',
  
  // Black pieces (top)
  BLACK_KING: '將',
  BLACK_ADVISOR: '士',
  BLACK_ELEPHANT: '象',
  BLACK_HORSE: '馬',
  BLACK_CHARIOT: '車',
  BLACK_CANNON: '砲',
  BLACK_SOLDIER: '卒'
};

// Initial board setup (10x9 board)
export const initialBoard = [
  // Row 0 (Black back rank)
  ['車', '馬', '象', '士', '將', '士', '象', '馬', '車'],
  // Row 1
  [null, null, null, null, null, null, null, null, null],
  // Row 2 (Black cannons)
  [null, '砲', null, null, null, null, null, '砲', null],
  // Row 3 (Black soldiers)
  ['卒', null, '卒', null, '卒', null, '卒', null, '卒'],
  // Row 4 (River)
  [null, null, null, null, null, null, null, null, null],
  // Row 5 (River)
  [null, null, null, null, null, null, null, null, null],
  // Row 6 (Red soldiers)
  ['兵', null, '兵', null, '兵', null, '兵', null, '兵'],
  // Row 7 (Red cannons)
  [null, '炮', null, null, null, null, null, '炮', null],
  // Row 8
  [null, null, null, null, null, null, null, null, null],
  // Row 9 (Red back rank)
  ['車', '馬', '相', '仕', '帥', '仕', '相', '馬', '車']
];

export function getPieceColor(piece) {
  if (!piece) return null;
  const redPieces = ['帥', '仕', '相', '炮', '兵']; // Only unique red pieces
  const blackPieces = ['將', '士', '象', '砲', '卒']; // Only unique black pieces
  
  if (redPieces.includes(piece)) return 'red';
  if (blackPieces.includes(piece)) return 'black';
  
  // For pieces that use same character (馬, 車), we need board position context
  // This function should be called with position context when needed
  return null;
}

export function isValidMove(board, from, to, currentPlayer) {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  
  // Check bounds
  if (toRow < 0 || toRow >= 10 || toCol < 0 || toCol >= 9) return false;
  
  const piece = board[fromRow][fromCol];
  const targetPiece = board[toRow][toCol];
  
  // Check if piece exists and belongs to current player
  if (!piece || getPieceColorWithPosition(piece, fromRow, fromCol) !== currentPlayer) return false;
  
  // Can't capture own pieces
  if (targetPiece && getPieceColorWithPosition(targetPiece, toRow, toCol) === currentPlayer) return false;
  
  // Piece-specific movement validation
  return validatePieceMovement(board, piece, fromRow, fromCol, toRow, toCol);
}

function validatePieceMovement(board, piece, fromRow, fromCol, toRow, toCol) {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);
  
  switch (piece) {
    case '帥': // Red King
    case '將': // Black King
      return validateKingMovement(fromRow, fromCol, toRow, toCol, piece);
    
    case '仕': // Red Advisor
    case '士': // Black Advisor
      return validateAdvisorMovement(fromRow, fromCol, toRow, toCol, piece);
    
    case '相': // Red Elephant
    case '象': // Black Elephant
      return validateElephantMovement(board, fromRow, fromCol, toRow, toCol, piece);
    
    case '馬': // Horse (both colors use same character)
      return validateHorseMovement(board, fromRow, fromCol, toRow, toCol);
    
    case '車': // Chariot (both colors use same character)
      return validateChariotMovement(board, fromRow, fromCol, toRow, toCol);
    
    case '炮': // Red Cannon
    case '砲': // Black Cannon
      return validateCannonMovement(board, fromRow, fromCol, toRow, toCol);
    
    case '兵': // Red Soldier
      return validateSoldierMovement(fromRow, fromCol, toRow, toCol, 'red');
    
    case '卒': // Black Soldier
      return validateSoldierMovement(fromRow, fromCol, toRow, toCol, 'black');
    
    default:
      return false;
  }
}

function validateKingMovement(fromRow, fromCol, toRow, toCol, piece) {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);
  
  // King moves one step orthogonally
  if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
    // Must stay within palace
    const isRed = piece === '帥';
    if (isRed) {
      return toRow >= 7 && toRow <= 9 && toCol >= 3 && toCol <= 5;
    } else {
      return toRow >= 0 && toRow <= 2 && toCol >= 3 && toCol <= 5;
    }
  }
  return false;
}

function validateAdvisorMovement(fromRow, fromCol, toRow, toCol, piece) {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);
  
  // Advisor moves one step diagonally
  if (rowDiff === 1 && colDiff === 1) {
    // Must stay within palace
    const isRed = piece === '仕';
    if (isRed) {
      return toRow >= 7 && toRow <= 9 && toCol >= 3 && toCol <= 5;
    } else {
      return toRow >= 0 && toRow <= 2 && toCol >= 3 && toCol <= 5;
    }
  }
  return false;
}

function validateElephantMovement(board, fromRow, fromCol, toRow, toCol, piece) {
  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;
  
  // Elephant moves exactly 2 points diagonally
  if (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 2) {
    // Check if path is blocked
    const blockRow = fromRow + rowDiff / 2;
    const blockCol = fromCol + colDiff / 2;
    if (board[blockRow][blockCol] !== null) return false;
    
    // Cannot cross river
    const isRed = piece === '相';
    if (isRed) {
      return toRow >= 5; // Red side
    } else {
      return toRow <= 4; // Black side
    }
  }
  return false;
}

function validateHorseMovement(board, fromRow, fromCol, toRow, toCol) {
  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;
  
  // Horse moves in L-shape
  const validMoves = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2]
  ];
  
  const isValidLMove = validMoves.some(([r, c]) => r === rowDiff && c === colDiff);
  if (!isValidLMove) return false;
  
  // Check for blocking piece
  let blockRow, blockCol;
  if (Math.abs(rowDiff) === 2) {
    blockRow = fromRow + rowDiff / 2;
    blockCol = fromCol;
  } else {
    blockRow = fromRow;
    blockCol = fromCol + colDiff / 2;
  }
  
  return board[blockRow][blockCol] === null;
}

function validateChariotMovement(board, fromRow, fromCol, toRow, toCol) {
  // Chariot moves horizontally or vertically
  if (fromRow !== toRow && fromCol !== toCol) return false;
  
  // Check if path is clear
  const rowStep = fromRow === toRow ? 0 : (toRow > fromRow ? 1 : -1);
  const colStep = fromCol === toCol ? 0 : (toCol > fromCol ? 1 : -1);
  
  let currentRow = fromRow + rowStep;
  let currentCol = fromCol + colStep;
  
  while (currentRow !== toRow || currentCol !== toCol) {
    if (board[currentRow][currentCol] !== null) return false;
    currentRow += rowStep;
    currentCol += colStep;
  }
  
  return true;
}

function validateCannonMovement(board, fromRow, fromCol, toRow, toCol) {
  // Cannon moves like chariot but captures differently
  if (fromRow !== toRow && fromCol !== toCol) return false;
  
  const rowStep = fromRow === toRow ? 0 : (toRow > fromRow ? 1 : -1);
  const colStep = fromCol === toCol ? 0 : (toCol > fromCol ? 1 : -1);
  
  let currentRow = fromRow + rowStep;
  let currentCol = fromCol + colStep;
  let pieceCount = 0;
  
  while (currentRow !== toRow || currentCol !== toCol) {
    if (board[currentRow][currentCol] !== null) pieceCount++;
    currentRow += rowStep;
    currentCol += colStep;
  }
  
  const targetPiece = board[toRow][toCol];
  
  // If capturing, must jump over exactly one piece
  if (targetPiece !== null) {
    return pieceCount === 1;
  } else {
    // If not capturing, path must be clear
    return pieceCount === 0;
  }
}

function validateSoldierMovement(fromRow, fromCol, toRow, toCol, color) {
  const rowDiff = toRow - fromRow;
  const colDiff = Math.abs(toCol - fromCol);
  
  // Soldier can only move one step
  if (Math.abs(rowDiff) + colDiff !== 1) return false;
  
  if (color === 'red') {
    // Red soldiers move up (decreasing row numbers)
    if (fromRow >= 5) {
      // Before crossing river, can only move forward
      return rowDiff === -1 && colDiff === 0;
    } else {
      // After crossing river, can move forward or sideways
      return (rowDiff === -1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    }
  } else {
    // Black soldiers move down (increasing row numbers)
    if (fromRow <= 4) {
      // Before crossing river, can only move forward
      return rowDiff === 1 && colDiff === 0;
    } else {
      // After crossing river, can move forward or sideways
      return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    }
  }
}

// Get piece color with board position context
export function getPieceColorWithPosition(piece, row, col) {
  if (!piece) return null;
  
  const redPieces = ['帥', '仕', '相', '炮', '兵'];
  const blackPieces = ['將', '士', '象', '砲', '卒'];
  
  if (redPieces.includes(piece)) return 'red';
  if (blackPieces.includes(piece)) return 'black';
  
  // For pieces that use same character (馬, 車), determine by position
  if (piece === '馬' || piece === '車') {
    // Red pieces start on rows 7-9, black pieces on rows 0-2
    if (row >= 7) return 'red';
    if (row <= 2) return 'black';
    // For pieces that have moved, we need to track this differently
    // For now, assume pieces in middle are from their original side
    return row > 4 ? 'red' : 'black';
  }
  
  return null;
}

// Check if a king is in check
export function isInCheck(board, kingColor) {
  // Find the king
  let kingPos = null;
  const kingPiece = kingColor === 'red' ? '帥' : '將';
  
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === kingPiece) {
        kingPos = [row, col];
        break;
      }
    }
    if (kingPos) break;
  }
  
  if (!kingPos) return false; // King not found
  
  // Check if any opponent piece can attack the king
  const opponentColor = kingColor === 'red' ? 'black' : 'red';
  
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 9; col++) {
      const piece = board[row][col];
      if (piece && getPieceColorWithPosition(piece, row, col) === opponentColor) {
        if (isValidMove(board, [row, col], kingPos, opponentColor)) {
          return true;
        }
      }
    }
  }
  
  return false;
}

// Check if it's checkmate
export function isCheckmate(board, playerColor) {
  if (!isInCheck(board, playerColor)) return false;
  
  // Try all possible moves to see if any can escape check
  for (let fromRow = 0; fromRow < 10; fromRow++) {
    for (let fromCol = 0; fromCol < 9; fromCol++) {
      const piece = board[fromRow][fromCol];
      if (piece && getPieceColorWithPosition(piece, fromRow, fromCol) === playerColor) {
        // Try all possible destinations
        for (let toRow = 0; toRow < 10; toRow++) {
          for (let toCol = 0; toCol < 9; toCol++) {
            if (isValidMove(board, [fromRow, fromCol], [toRow, toCol], playerColor)) {
              // Make the move temporarily
              const newBoard = makeMove(board, [fromRow, fromCol], [toRow, toCol]);
              // Check if still in check
              if (!isInCheck(newBoard, playerColor)) {
                return false; // Found a move that escapes check
              }
            }
          }
        }
      }
    }
  }
  
  return true; // No moves can escape check
}

// Check if a king has been captured
export function isKingCaptured(board) {
  let redKing = false, blackKing = false;
  
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 9; col++) {
      const piece = board[row][col];
      if (piece === '帥') redKing = true;
      if (piece === '將') blackKing = true;
    }
  }
  
  if (!redKing) return 'black_wins'; // Red king captured, black wins
  if (!blackKing) return 'red_wins'; // Black king captured, red wins
  return null; // Both kings still on board
}

export function makeMove(board, from, to) {
  const newBoard = board.map(row => [...row]);
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  
  newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
  newBoard[fromRow][fromCol] = null;
  
  return newBoard;
}