# Chinese Chess (象棋) - Complete Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Installation & Setup](#installation--setup)
4. [Game Rules](#game-rules)
5. [AI Implementation](#ai-implementation)
6. [Architecture](#architecture)
7. [API Reference](#api-reference)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Contributing](#contributing)

## 🎯 Project Overview

A complete Chinese Chess (Xiangqi) game implementation built as a Progressive Web App using React.js. Features an intelligent AI opponent, authentic board design, and comprehensive rule enforcement.

### Key Highlights
- **Authentic Xiangqi Experience** - Traditional board layout and rules
- **AI Opponent** - 3 difficulty levels with minimax algorithm
- **Progressive Web App** - Installable with offline support
- **Modern Tech Stack** - React.js, Tailwind CSS, Context API

## ✨ Features

### 🎮 Core Game Features
- **Complete Rule Implementation** - All traditional Xiangqi rules
- **Turn-based Gameplay** - Red vs Black alternating turns
- **Move Validation** - Real-time validation for all piece types
- **Check/Checkmate Detection** - Automatic game state management
- **Move History** - Complete game record tracking

### 🤖 AI Features
- **Minimax Algorithm** - Deep game tree search with alpha-beta pruning
- **3 Difficulty Levels**:
  - Easy: 2-ply search (~100-300ms)
  - Medium: 3-ply search (~300-800ms)
  - Hard: 4-ply search (~800-2000ms)
- **Strategic Evaluation** - Piece values, positioning, mobility
- **Performance Optimized** - Efficient move generation and pruning

### 🎨 Authentic Design
- **Traditional Board** - 9×10 grid with intersection-based play
- **Palace Areas** - 3×3 areas with diagonal lines
- **River Representation** - 楚河/漢界 marking between ranks
- **Soldier Markers** - Traditional starting position crosses
- **Responsive Layout** - Works on all screen sizes

## 🚀 Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd rovo-chinese-chess

# Install dependencies
npm install

# Start development server
npm start

# Open browser to http://localhost:3000
```

### Build for Production
```bash
# Create production build
npm run build

# Serve production build
npm install -g serve
serve -s build
```

### PWA Installation
1. Open the game in a modern browser
2. Look for "Install" or "Add to Home Screen" option
3. Follow browser prompts to install as PWA

## 📚 Game Rules

### Board Layout
- **9 vertical lines (files)** × **10 horizontal lines (ranks)**
- **Pieces on intersections** - not in squares
- **Palace areas** - 3×3 areas at each end with diagonal lines
- **River** - divides board between ranks 5 and 6

### Piece Movement

#### General/King (帥/將)
- Moves one point orthogonally
- Must stay within palace (3×3 area)
- Cannot face opposing general directly

#### Advisor (仕/士)
- Moves one point diagonally
- Must stay within palace
- Only 5 possible positions

#### Elephant (相/象)
- Moves exactly 2 points diagonally
- Cannot cross the river
- Can be blocked by intervening pieces

#### Horse (馬)
- Moves in L-shape (one orthogonal + one diagonal)
- Can be blocked by adjacent pieces
- No jumping over pieces

#### Chariot (車)
- Moves any distance orthogonally
- Cannot jump over pieces
- Most powerful piece

#### Cannon (炮/砲)
- Moves like chariot when not capturing
- Must jump over exactly one piece to capture
- Unique jumping capture mechanism

#### Soldier (兵/卒)
- Moves one point forward before crossing river
- Can move forward or sideways after crossing river
- Cannot move backward

### Winning Conditions
- **Checkmate** - King cannot escape check
- **King Capture** - Direct capture of opposing king
- **Stalemate** - No legal moves available (rare)

## 🧠 AI Implementation

### Algorithm Overview
The AI uses a minimax algorithm with alpha-beta pruning for efficient game tree search.

### Evaluation Function
```javascript
// Piece values
const PIECE_VALUES = {
  '帥': 10000, '將': 10000,  // King
  '車': 900,                 // Chariot
  '炮': 450, '砲': 450,      // Cannon
  '馬': 400,                 // Horse
  '仕': 200, '士': 200,      // Advisor
  '相': 200, '象': 200,      // Elephant
  '兵': 100, '卒': 100       // Soldier
};
```

### Evaluation Factors
1. **Material Value** - Sum of piece values
2. **Positional Bonuses** - Piece placement rewards
3. **Mobility** - Number of available moves
4. **King Safety** - Defensive structure evaluation
5. **Center Control** - Strategic positioning

### Performance Optimizations
- **Alpha-Beta Pruning** - Reduces search tree by 50-90%
- **Move Ordering** - Examines promising moves first
- **Iterative Deepening** - Time management capability
- **Position Caching** - Future enhancement possibility

## 🏗️ Architecture

### Component Structure
```
App.js                    # Main application component
├── ChessBoard.js         # Game board with SVG grid
├── ChessSquare.js        # Individual intersection points
├── GameControls.js       # Game controls and status
├── GameInfo.js          # Rules and piece guide
├── AIStatus.js          # AI status and settings
└── TestAI.js            # AI testing interface
```

### State Management
```javascript
// Game state structure
const gameState = {
  board: Array(10).fill().map(() => Array(9).fill(null)),
  currentPlayer: 'red',
  selectedSquare: null,
  gameStatus: 'playing',
  moveHistory: [],
  gameMode: 'human', // or 'ai'
  aiDifficulty: 'medium',
  isAiThinking: false
};
```

### Data Flow
1. **User Input** → ChessBoard → GameContext
2. **Move Validation** → gameLogic.js
3. **State Update** → Context Provider
4. **AI Response** → aiEngine.js → GameContext
5. **UI Update** → React Components

## 📖 API Reference

### Core Functions

#### `isValidMove(board, from, to, player)`
Validates if a move is legal according to Xiangqi rules.

**Parameters:**
- `board`: Current board state (10×9 array)
- `from`: Starting position [row, col]
- `to`: Target position [row, col]
- `player`: Current player ('red' or 'black')

**Returns:** `boolean`

#### `makeMove(board, from, to)`
Executes a move and returns new board state.

#### `isInCheck(board, playerColor)`
Checks if the specified player's king is in check.

#### `isCheckmate(board, playerColor)`
Determines if the specified player is in checkmate.

### AI Functions

#### `ChessAI.getBestMove(board, player)`
Calculates the best move for the AI player.

**Returns:** `{ from: [row, col], to: [row, col] }`

#### `ChessAI.evaluateBoard(board)`
Evaluates the current board position.

**Returns:** `number` (positive favors black, negative favors red)

## 🧪 Testing

### Manual Testing
1. **Game Flow Testing**
   - Start new game
   - Make valid/invalid moves
   - Test check/checkmate scenarios
   - Verify AI responses

2. **UI Testing**
   - Responsive design on different screens
   - PWA installation
   - Offline functionality

3. **AI Testing**
   - Different difficulty levels
   - Performance benchmarks
   - Move quality assessment

### Automated Testing
```bash
# Run test suite
npm test

# Run AI-specific tests
npm run test:ai
```

### Test Coverage
- ✅ Move validation for all pieces
- ✅ Check/checkmate detection
- ✅ AI move generation
- ✅ Board state management
- ✅ Game flow scenarios

## 🚀 Deployment

### Static Hosting (Recommended)
```bash
# Build for production
npm run build

# Deploy to platforms like:
# - Netlify
# - Vercel
# - GitHub Pages
# - Firebase Hosting
```

### PWA Deployment Checklist
- ✅ HTTPS enabled
- ✅ Service worker registered
- ✅ Web app manifest configured
- ✅ Icons provided (192px, 512px)
- ✅ Offline functionality tested

### Environment Variables
```bash
# Optional configuration
REACT_APP_AI_MAX_DEPTH=4
REACT_APP_ENABLE_DEBUG=false
```

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and test thoroughly
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open Pull Request

### Code Style
- Use camelCase for variables and functions
- Follow React best practices
- Add comments for complex logic
- Maintain consistent formatting

### Areas for Contribution
- **Enhanced AI** - Opening books, endgame tables
- **Multiplayer** - Online gameplay support
- **Analysis** - Move analysis and hints
- **Themes** - Different board and piece styles
- **Accessibility** - Screen reader support
- **Internationalization** - Multiple languages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Traditional Xiangqi rules and conventions
- React.js and Tailwind CSS communities
- Alpha-beta pruning algorithm research
- Chinese Chess community for feedback and testing

---

**Version:** 1.0.0  
**Last Updated:** July 4, 2024  
**Maintainer:** Rovo Dev Team