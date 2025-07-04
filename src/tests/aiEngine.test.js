import { ChessAI } from '../utils/aiEngine';
import { initialBoard } from '../utils/gameLogic';

describe('ChessAI', () => {
  let ai;

  beforeEach(() => {
    ai = new ChessAI('medium');
  });

  test('should create AI with correct difficulty', () => {
    expect(ai.difficulty).toBe('medium');
    expect(ai.maxDepth).toBe(3);
  });

  test('should get valid moves for black player', () => {
    const moves = ai.getAllPossibleMoves(initialBoard, 'black');
    expect(moves.length).toBeGreaterThan(0);
    
    // Check that all moves are for black pieces
    moves.forEach(move => {
      const piece = initialBoard[move.from[0]][move.from[1]];
      const blackPieces = ['將', '士', '象', '馬', '車', '砲', '卒'];
      expect(blackPieces.includes(piece)).toBe(true);
    });
  });

  test('should evaluate board position', () => {
    const score = ai.evaluateBoard(initialBoard);
    // Initial position should be roughly balanced
    expect(Math.abs(score)).toBeLessThan(100);
  });

  test('should get best move for AI', () => {
    const move = ai.getBestMove(initialBoard, 'black');
    expect(move).toBeTruthy();
    expect(move.from).toHaveLength(2);
    expect(move.to).toHaveLength(2);
  });

  test('should handle different difficulty levels', () => {
    const easyAI = new ChessAI('easy');
    const hardAI = new ChessAI('hard');
    
    expect(easyAI.maxDepth).toBe(2);
    expect(hardAI.maxDepth).toBe(4);
  });

  test('should detect game over', () => {
    // Create a board with only kings
    const testBoard = Array(10).fill(null).map(() => Array(9).fill(null));
    testBoard[0][4] = '將'; // Black king
    testBoard[9][4] = '帥'; // Red king
    
    expect(ai.isGameOver(testBoard)).toBe(false);
    
    // Remove black king
    testBoard[0][4] = null;
    expect(ai.isGameOver(testBoard)).toBe(true);
  });
});