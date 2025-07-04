import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { initialBoard, isValidMove, makeMove, isInCheck, isCheckmate, isKingCaptured } from '../utils/gameLogic';
import { ChessAI } from '../utils/aiEngine';

const GameContext = createContext();

const initialState = {
  board: initialBoard,
  currentPlayer: 'red',
  selectedSquare: null,
  gameStatus: 'playing', // 'playing', 'checkmate', 'stalemate'
  moveHistory: [],
  capturedPieces: { red: [], black: [] },
  gameMode: 'human', // 'human' or 'ai'
  aiDifficulty: 'medium', // 'easy', 'medium', 'hard'
  isAiThinking: false
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SELECT_SQUARE':
      return {
        ...state,
        selectedSquare: action.payload
      };
    
    case 'MAKE_MOVE':
      const { from, to } = action.payload;
      if (isValidMove(state.board, from, to, state.currentPlayer)) {
        const newBoard = makeMove(state.board, from, to);
        const nextPlayer = state.currentPlayer === 'red' ? 'black' : 'red';
        
        // Check for king capture first (immediate win)
        let gameStatus = 'playing';
        const kingCaptureResult = isKingCaptured(newBoard);
        if (kingCaptureResult) {
          gameStatus = kingCaptureResult;
        } else if (isInCheck(newBoard, nextPlayer)) {
          if (isCheckmate(newBoard, nextPlayer)) {
            gameStatus = state.currentPlayer === 'red' ? 'red_wins' : 'black_wins';
          } else {
            gameStatus = 'check';
          }
        }
        
        return {
          ...state,
          board: newBoard,
          currentPlayer: nextPlayer,
          selectedSquare: null,
          gameStatus: gameStatus,
          moveHistory: [...state.moveHistory, { from, to, player: state.currentPlayer }]
        };
      }
      return state;
    
    case 'RESET_GAME':
      return { ...initialState, gameMode: state.gameMode, aiDifficulty: state.aiDifficulty };
    
    case 'SET_GAME_MODE':
      return {
        ...state,
        gameMode: action.payload
      };
    
    case 'SET_AI_DIFFICULTY':
      return {
        ...state,
        aiDifficulty: action.payload
      };
    
    case 'SET_AI_THINKING':
      return {
        ...state,
        isAiThinking: action.payload
      };
    
    case 'AI_MOVE':
      const { aiFrom, aiTo } = action.payload;
      if (isValidMove(state.board, aiFrom, aiTo, 'black')) {
        const newBoard = makeMove(state.board, aiFrom, aiTo);
        
        // Check for king capture first (immediate win)
        let gameStatus = 'playing';
        const kingCaptureResult = isKingCaptured(newBoard);
        if (kingCaptureResult) {
          gameStatus = kingCaptureResult;
        } else if (isInCheck(newBoard, 'red')) {
          if (isCheckmate(newBoard, 'red')) {
            gameStatus = 'black_wins';
          } else {
            gameStatus = 'check';
          }
        }
        
        return {
          ...state,
          board: newBoard,
          currentPlayer: 'red',
          selectedSquare: null,
          gameStatus: gameStatus,
          moveHistory: [...state.moveHistory, { from: aiFrom, to: aiTo, player: 'black' }],
          isAiThinking: false
        };
      }
      return { ...state, isAiThinking: false };
    
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const aiEngine = new ChessAI(state.aiDifficulty);

  // AI move effect
  useEffect(() => {
    if (state.gameMode === 'ai' && 
        state.currentPlayer === 'black' && 
        (state.gameStatus === 'playing' || state.gameStatus === 'check') && 
        !state.isAiThinking) {
      
      dispatch({ type: 'SET_AI_THINKING', payload: true });
      
      // Add a small delay for better UX
      setTimeout(() => {
        const aiMove = aiEngine.getBestMove(state.board, 'black');
        if (aiMove) {
          dispatch({
            type: 'AI_MOVE',
            payload: { aiFrom: aiMove.from, aiTo: aiMove.to }
          });
        } else {
          dispatch({ type: 'SET_AI_THINKING', payload: false });
        }
      }, 500);
    }
  }, [state.currentPlayer, state.gameMode, state.gameStatus, state.isAiThinking, state.board]);

  // Update AI difficulty when changed
  useEffect(() => {
    aiEngine.difficulty = state.aiDifficulty;
    aiEngine.maxDepth = aiEngine.getDepthByDifficulty(state.aiDifficulty);
  }, [state.aiDifficulty]);
  
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}