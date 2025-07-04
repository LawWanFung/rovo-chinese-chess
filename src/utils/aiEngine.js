import { getPieceColorWithPosition, isValidMove, makeMove } from './gameLogic';

// Piece values for evaluation
const PIECE_VALUES = {
  '帥': 10000, '將': 10000,  // King/General
  '仕': 200, '士': 200,      // Advisor
  '相': 200, '象': 200,      // Elephant
  '馬': 400,                 // Horse
  '車': 900,                 // Chariot
  '炮': 450, '砲': 450,      // Cannon
  '兵': 100, '卒': 100       // Soldier
};

// Position bonus tables for better piece placement
const POSITION_BONUS = {
  '帥': [ // Red King
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 5, 1, 0, 0, 0],
    [0, 0, 0, 2, 3, 2, 0, 0, 0],
    [0, 0, 0, 1, 3, 1, 0, 0, 0]
  ],
  '將': [ // Black King
    [0, 0, 0, 1, 3, 1, 0, 0, 0],
    [0, 0, 0, 2, 3, 2, 0, 0, 0],
    [0, 0, 0, 1, 5, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
};

export class ChessAI {
  constructor(difficulty = 'medium') {
    this.difficulty = difficulty;
    this.maxDepth = this.getDepthByDifficulty(difficulty);
  }

  getDepthByDifficulty(difficulty) {
    switch (difficulty) {
      case 'easy': return 2;
      case 'medium': return 3;
      case 'hard': return 4;
      default: return 3;
    }
  }

  // Main AI move calculation
  getBestMove(board, player) {
    const startTime = Date.now();
    const result = this.minimax(board, this.maxDepth, -Infinity, Infinity, player === 'black');
    const endTime = Date.now();
    
    console.log(`AI calculated move in ${endTime - startTime}ms`);
    return result.move;
  }

  // Minimax algorithm with alpha-beta pruning
  minimax(board, depth, alpha, beta, isMaximizing) {
    if (depth === 0) {
      return { score: this.evaluateBoard(board), move: null };
    }

    const currentPlayer = isMaximizing ? 'black' : 'red';
    const moves = this.getAllPossibleMoves(board, currentPlayer);

    if (moves.length === 0) {
      // No moves available - game over
      return { score: isMaximizing ? -10000 : 10000, move: null };
    }

    let bestMove = null;

    if (isMaximizing) {
      let maxScore = -Infinity;
      
      for (const move of moves) {
        const newBoard = makeMove(board, move.from, move.to);
        const result = this.minimax(newBoard, depth - 1, alpha, beta, false);
        
        if (result.score > maxScore) {
          maxScore = result.score;
          bestMove = move;
        }
        
        alpha = Math.max(alpha, result.score);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      
      return { score: maxScore, move: bestMove };
    } else {
      let minScore = Infinity;
      
      for (const move of moves) {
        const newBoard = makeMove(board, move.from, move.to);
        const result = this.minimax(newBoard, depth - 1, alpha, beta, true);
        
        if (result.score < minScore) {
          minScore = result.score;
          bestMove = move;
        }
        
        beta = Math.min(beta, result.score);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      
      return { score: minScore, move: bestMove };
    }
  }

  // Get all possible moves for a player
  getAllPossibleMoves(board, player) {
    const moves = [];
    
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 9; col++) {
        const piece = board[row][col];
        if (piece && getPieceColorWithPosition(piece, row, col) === player) {
          // Find all valid moves for this piece
          for (let toRow = 0; toRow < 10; toRow++) {
            for (let toCol = 0; toCol < 9; toCol++) {
              if (isValidMove(board, [row, col], [toRow, toCol], player)) {
                moves.push({
                  from: [row, col],
                  to: [toRow, toCol],
                  piece: piece,
                  capturedPiece: board[toRow][toCol]
                });
              }
            }
          }
        }
      }
    }
    
    // Sort moves by potential value (captures first)
    return moves.sort((a, b) => {
      const aValue = a.capturedPiece ? PIECE_VALUES[a.capturedPiece] || 0 : 0;
      const bValue = b.capturedPiece ? PIECE_VALUES[b.capturedPiece] || 0 : 0;
      return bValue - aValue;
    });
  }

  // Evaluate board position
  evaluateBoard(board) {
    let score = 0;
    
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 9; col++) {
        const piece = board[row][col];
        if (piece) {
          const pieceValue = PIECE_VALUES[piece] || 0;
          const positionBonus = this.getPositionBonus(piece, row, col);
          const color = getPieceColorWithPosition(piece, row, col);
          
          if (color === 'black') {
            score += pieceValue + positionBonus;
          } else {
            score -= pieceValue + positionBonus;
          }
        }
      }
    }
    
    // Add mobility bonus
    score += this.getMobilityScore(board);
    
    // Add safety bonus
    score += this.getSafetyScore(board);
    
    return score;
  }

  getPositionBonus(piece, row, col) {
    if (POSITION_BONUS[piece]) {
      return POSITION_BONUS[piece][row][col] || 0;
    }
    
    // General position bonuses
    if (piece === '馬') { // Horse
      // Horses are better in center
      const centerDistance = Math.abs(row - 4.5) + Math.abs(col - 4);
      return Math.max(0, 10 - centerDistance * 2);
    }
    
    if (piece === '車') { // Chariot
      // Chariots are better on open files and ranks
      return 5;
    }
    
    return 0;
  }

  getMobilityScore(board) {
    const blackMoves = this.getAllPossibleMoves(board, 'black').length;
    const redMoves = this.getAllPossibleMoves(board, 'red').length;
    return (blackMoves - redMoves) * 2;
  }

  getSafetyScore(board) {
    let score = 0;
    
    // Find kings
    let blackKing = null, redKing = null;
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === '將') blackKing = [row, col];
        if (board[row][col] === '帥') redKing = [row, col];
      }
    }
    
    // Basic king safety (surrounded by pieces)
    if (blackKing) {
      score += this.countAdjacentPieces(board, blackKing, 'black') * 10;
    }
    if (redKing) {
      score -= this.countAdjacentPieces(board, redKing, 'red') * 10;
    }
    
    return score;
  }

  countAdjacentPieces(board, kingPos, color) {
    const [row, col] = kingPos;
    let count = 0;
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      
      if (newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 9) {
        const piece = board[newRow][newCol];
        if (piece && getPieceColorWithPosition(piece, newRow, newCol) === color) {
          count++;
        }
      }
    }
    
    return count;
  }

  // Check if the game is over
  isGameOver(board) {
    let blackKing = false, redKing = false;
    
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 9; col++) {
        const piece = board[row][col];
        if (piece === '將') blackKing = true;
        if (piece === '帥') redKing = true;
      }
    }
    
    return !blackKing || !redKing;
  }

  // Get a random move (fallback for when AI can't find good moves)
  getRandomMove(board, player) {
    const moves = this.getAllPossibleMoves(board, player);
    if (moves.length === 0) return null;
    
    return moves[Math.floor(Math.random() * moves.length)];
  }

  // Evaluate if a move is a capture
  isCapture(board, move) {
    return board[move.to[0]][move.to[1]] !== null;
  }

  // Get piece value for quick evaluation
  getPieceValue(piece) {
    return PIECE_VALUES[piece] || 0;
  }
}