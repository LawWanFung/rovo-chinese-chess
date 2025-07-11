// Chinese Chess piece types and initial board setup
export const PIECES = {
  // Red pieces (bottom)
  RED_KING: 'red_king',
  RED_ADVISOR: 'red_advisor',
  RED_ELEPHANT: 'red_elephant',
  RED_HORSE: 'red_horse',
  RED_CHARIOT: 'red_chariot',
  RED_CANNON: 'red_cannon',
  RED_SOLDIER: 'red_soldier',
  
  // Black pieces (top)
  BLACK_KING: 'black_king',
  BLACK_ADVISOR: 'black_advisor',
  BLACK_ELEPHANT: 'black_elephant',
  BLACK_HORSE: 'black_horse',
  BLACK_CHARIOT: 'black_chariot',
  BLACK_CANNON: 'black_cannon',
  BLACK_SOLDIER: 'black_soldier'
};

// Mapping from piece IDs to display characters
export const PIECE_DISPLAY = {
  // Red pieces
  'red_king': '帥',
  'red_advisor': '仕',
  'red_elephant': '相',
  'red_horse': '馬',
  'red_chariot': '車',
  'red_cannon': '炮',
  'red_soldier': '兵',
  
  // Black pieces
  'black_king': '將',
  'black_advisor': '士',
  'black_elephant': '象',
  'black_horse': '馬',
  'black_chariot': '車',
  'black_cannon': '砲',
  'black_soldier': '卒'
};

// Helper function to get display character for a piece
export function getPieceDisplay(pieceId) {
  return PIECE_DISPLAY[pieceId] || null;
}

// Helper function to get piece color from ID
export function getPieceColorFromId(pieceId) {
  if (!pieceId) return null;
  return pieceId.startsWith('red_') ? 'red' : 'black';
}

// Initial board setup (10x9 board)
export const initialBoard = [
  // Row 0 (Black back rank)
  [PIECES.BLACK_CHARIOT, PIECES.BLACK_HORSE, PIECES.BLACK_ELEPHANT, PIECES.BLACK_ADVISOR, PIECES.BLACK_KING, PIECES.BLACK_ADVISOR, PIECES.BLACK_ELEPHANT, PIECES.BLACK_HORSE, PIECES.BLACK_CHARIOT],
  // Row 1
  [null, null, null, null, null, null, null, null, null],
  // Row 2 (Black cannons)
  [null, PIECES.BLACK_CANNON, null, null, null, null, null, PIECES.BLACK_CANNON, null],
  // Row 3 (Black soldiers)
  [PIECES.BLACK_SOLDIER, null, PIECES.BLACK_SOLDIER, null, PIECES.BLACK_SOLDIER, null, PIECES.BLACK_SOLDIER, null, PIECES.BLACK_SOLDIER],
  // Row 4 (River)
  [null, null, null, null, null, null, null, null, null],
  // Row 5 (River)
  [null, null, null, null, null, null, null, null, null],
  // Row 6 (Red soldiers)
  [PIECES.RED_SOLDIER, null, PIECES.RED_SOLDIER, null, PIECES.RED_SOLDIER, null, PIECES.RED_SOLDIER, null, PIECES.RED_SOLDIER],
  // Row 7 (Red cannons)
  [null, PIECES.RED_CANNON, null, null, null, null, null, PIECES.RED_CANNON, null],
  // Row 8
  [null, null, null, null, null, null, null, null, null],
  // Row 9 (Red back rank)
  [PIECES.RED_CHARIOT, PIECES.RED_HORSE, PIECES.RED_ELEPHANT, PIECES.RED_ADVISOR, PIECES.RED_KING, PIECES.RED_ADVISOR, PIECES.RED_ELEPHANT, PIECES.RED_HORSE, PIECES.RED_CHARIOT]
];

export function getPieceColor(piece) {
  return getPieceColorFromId(piece);
}

export function isValidMove(board, from, to, currentPlayer) {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  
  // Check bounds
  if (toRow < 0 || toRow >= 10 || toCol < 0 || toCol >= 9) return false;
  
  const piece = board[fromRow][fromCol];
  const targetPiece = board[toRow][toCol];
  
  // Check if piece exists and belongs to current player
  if (!piece || getPieceColorFromId(piece) !== currentPlayer) return false;
  
  // Can't capture own pieces
  if (targetPiece && getPieceColorFromId(targetPiece) === currentPlayer) return false;
  
  // Piece-specific movement validation
  if (!validatePieceMovement(board, piece, fromRow, fromCol, toRow, toCol)) {
    return false;
  }
  
  // Check if this move would expose king to Flying General rule
  const newBoard = makeMove(board, from, to);
  if (wouldExposeToFlyingGeneral(newBoard, currentPlayer)) {
    return false;
  }
  
  return true;
}

function validatePieceMovement(board, piece, fromRow, fromCol, toRow, toCol) {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);
  
  switch (piece) {
    case PIECES.RED_KING:
    case PIECES.BLACK_KING:
      return validateKingMovement(board, fromRow, fromCol, toRow, toCol, piece);
    
    case PIECES.RED_ADVISOR:
    case PIECES.BLACK_ADVISOR:
      return validateAdvisorMovement(fromRow, fromCol, toRow, toCol, piece);
    
    case PIECES.RED_ELEPHANT:
    case PIECES.BLACK_ELEPHANT:
      return validateElephantMovement(board, fromRow, fromCol, toRow, toCol, piece);
    
    case PIECES.RED_HORSE:
    case PIECES.BLACK_HORSE:
      return validateHorseMovement(board, fromRow, fromCol, toRow, toCol);
    
    case PIECES.RED_CHARIOT:
    case PIECES.BLACK_CHARIOT:
      return validateChariotMovement(board, fromRow, fromCol, toRow, toCol);
    
    case PIECES.RED_CANNON:
    case PIECES.BLACK_CANNON:
      return validateCannonMovement(board, fromRow, fromCol, toRow, toCol);
    
    case PIECES.RED_SOLDIER:
      return validateSoldierMovement(fromRow, fromCol, toRow, toCol, 'red');
    
    case PIECES.BLACK_SOLDIER:
      return validateSoldierMovement(fromRow, fromCol, toRow, toCol, 'black');
    
    default:
      return false;
  }
}

function validateKingMovement(board, fromRow, fromCol, toRow, toCol, piece) {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);
  
  // Check for Flying General rule (kings facing each other on same file)
  if (fromCol === toCol && colDiff === 0) {
    const targetPiece = board[toRow][toCol];
    const isRed = piece === PIECES.RED_KING;
    const opponentKing = isRed ? PIECES.BLACK_KING : PIECES.RED_KING;
    
    // If target is the opponent king, check if path is clear (Flying General)
    if (targetPiece === opponentKing) {
      return isPathClearVertical(board, fromRow, fromCol, toRow, toCol);
    }
  }
  
  // Normal king movement - one step orthogonally
  if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
    // Must stay within palace
    const isRed = piece === PIECES.RED_KING;
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
    const isRed = piece === PIECES.RED_ADVISOR;
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
    const isRed = piece === PIECES.RED_ELEPHANT;
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

// Helper function to check if vertical path is clear between two points
function isPathClearVertical(board, fromRow, fromCol, toRow, toCol) {
  if (fromCol !== toCol) return false; // Must be same column
  
  const startRow = Math.min(fromRow, toRow);
  const endRow = Math.max(fromRow, toRow);
  
  // Check all squares between start and end (exclusive)
  for (let row = startRow + 1; row < endRow; row++) {
    if (board[row][fromCol] !== null) {
      return false; // Path is blocked
    }
  }
  
  return true; // Path is clear
}

// Check if a move would expose the king to Flying General rule
function wouldExposeToFlyingGeneral(board, playerColor) {
  // Find both kings
  let redKingPos = null;
  let blackKingPos = null;
  
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 9; col++) {
      const piece = board[row][col];
      if (piece === PIECES.RED_KING) {
        redKingPos = [row, col];
      } else if (piece === PIECES.BLACK_KING) {
        blackKingPos = [row, col];
      }
    }
  }
  
  // If either king is missing, no Flying General issue
  if (!redKingPos || !blackKingPos) return false;
  
  const [redRow, redCol] = redKingPos;
  const [blackRow, blackCol] = blackKingPos;
  
  // Check if kings are on the same column (file)
  if (redCol === blackCol) {
    // Check if path between kings is clear
    return isPathClearVertical(board, redRow, redCol, blackRow, blackCol);
  }
  
  return false; // Kings not on same file, no Flying General issue
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

// Get piece color with board position context (now just uses the ID system)
export function getPieceColorWithPosition(piece, row, col) {
  return getPieceColorFromId(piece);
}

// Initialize piece color tracker (no longer needed with ID system)
export function initializePieceColorTracker() {
  // No-op - not needed with unique piece IDs
}

// Check if a king is in check
export function isInCheck(board, kingColor) {
  // First check for Flying General rule
  if (wouldExposeToFlyingGeneral(board, kingColor)) {
    return true;
  }
  
  // Find the king
  let kingPos = null;
  const kingPiece = kingColor === 'red' ? PIECES.RED_KING : PIECES.BLACK_KING;
  
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
      if (piece && getPieceColorFromId(piece) === opponentColor) {
        // Use basic piece movement validation to avoid infinite recursion
        if (validatePieceMovement(board, piece, row, col, kingPos[0], kingPos[1])) {
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
      if (piece && getPieceColorFromId(piece) === playerColor) {
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
      if (piece === PIECES.RED_KING) redKing = true;
      if (piece === PIECES.BLACK_KING) blackKing = true;
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