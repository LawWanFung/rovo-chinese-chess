# Changelog

All notable changes to the Chinese Chess (Xiangqi) project will be documented in this file.

## [1.1.0] - 2024-12-19

### 🔧 Major Bug Fixes & System Improvements

#### 🎯 Complete Piece Identification System Refactor
- **BREAKING CHANGE**: Replaced character-based piece system with unique piece IDs
- **Fixed Critical Bugs**: Resolved all issues with 馬 (horse) and 車 (chariot) pieces
  - ✅ Pieces no longer change color when moving to opposite side
  - ✅ Captured pieces are properly removed from board
  - ✅ No more color confusion during same-piece captures

#### 🏗️ New Architecture
- **Unique Piece IDs**: `red_chariot`, `black_horse`, `red_king`, etc.
- **Separation of Concerns**: Internal logic uses IDs, display shows Chinese characters
- **Simplified Logic**: Eliminated complex position-based color tracking
- **Robust Captures**: All piece combinations now capture correctly

#### 📁 Files Refactored
- `src/utils/gameLogic.js` - Complete piece system overhaul
- `src/utils/aiEngine.js` - Updated piece values and evaluation
- `src/components/ChessSquare.js` - Display layer separation
- `src/context/GameContext.js` - Simplified state management

## [1.0.0] - 2024-07-04

### 🎉 Initial Release

#### ✅ Core Game Features
- **Complete Chinese Chess Implementation** - Full Xiangqi game with traditional rules
- **Authentic Board Layout** - 9×10 grid with pieces on intersections
- **Traditional Pieces** - All pieces with correct Chinese characters (帥/將, 仕/士, etc.)
- **Move Validation** - Complete rule enforcement for all piece types
- **Turn-based Gameplay** - Red vs Black alternating turns

#### 🤖 AI Opponent
- **Minimax Algorithm** - Intelligent AI with alpha-beta pruning
- **3 Difficulty Levels** - Easy (2-ply), Medium (3-ply), Hard (4-ply)
- **Strategic Evaluation** - Piece values, positioning, mobility, and king safety
- **Performance Optimized** - Response times: Easy <500ms, Medium <1s, Hard <2.5s

#### 🎨 Authentic Board Design
- **Traditional Layout** - 9 vertical lines × 10 horizontal lines
- **Palace Areas** - 3×3 areas with diagonal "X" lines for both sides
- **River Representation** - Highlighted area between ranks 5-6 with 楚河/漢界 text
- **Soldier Markers** - Small crosses at soldier starting positions
- **Intersection-based** - Pieces positioned on line intersections, not squares

#### 🎮 User Experience
- **Game Modes** - Human vs Human and Human vs AI
- **Visual Feedback** - Piece selection, move validation, check warnings
- **Game Status** - Real-time status updates (Playing, Check, Game Over)
- **Move History** - Complete tracking of all moves
- **AI Status** - Real-time AI thinking indicators

#### 🏆 Game Logic
- **Check Detection** - Automatic check detection and warnings
- **Checkmate/King Capture** - Game ends on checkmate or king capture
- **Rule Enforcement** - All traditional Xiangqi rules implemented
- **Piece Movement** - Accurate movement for all piece types

#### 💻 Technical Features
- **Progressive Web App (PWA)** - Installable with offline support
- **React.js** - Modern frontend framework with hooks
- **Tailwind CSS** - Utility-first styling
- **Context API** - Clean state management
- **Responsive Design** - Works on desktop and mobile
- **Service Worker** - PWA functionality and caching

#### 🐛 Bug Fixes
- **Major Piece ID System Refactor** - Complete solution for piece identification issues
- **Unique Piece Identifiers** - Each piece now has unique ID (red_chariot, black_horse, etc.)
- **Separation of Logic and Display** - Internal IDs vs display characters
- **Fixed Capture Logic** - Proper piece removal during same-piece captures
- **Eliminated Color Confusion** - No more piece color changes when crossing board
- **Game Ending Logic** - Fixed check/checkmate detection
- **King Capture Detection** - Immediate game end when king is captured
- **Board Layout** - Proper intersection-based positioning
- **UI Sizing** - Fixed board width and container alignment

### 📁 Project Structure
```
rovo-chinese-chess/
├── public/                 # PWA assets and HTML
├── src/
│   ├── components/        # React components
│   │   ├── ChessBoard.js  # Main game board
│   │   ├── ChessSquare.js # Individual squares
│   │   ├── GameControls.js # Game controls and status
│   │   ├── GameInfo.js    # Piece guide and rules
│   │   ├── AIStatus.js    # AI status display
│   │   └── TestAI.js      # AI testing component
│   ├── context/           # State management
│   │   └── GameContext.js # Game state and logic
│   ├── utils/             # Game logic and AI
│   │   ├── gameLogic.js   # Chess rules and validation
│   │   ├── aiEngine.js    # AI implementation
│   │   └── gameUtils.js   # Utility functions
│   └── App.js             # Main application
├── documentation/         # Project documentation
└── package.json          # Dependencies and scripts
```

### 🎯 Features Summary
- ✅ Complete Chinese Chess game with AI opponent
- ✅ Traditional board layout with authentic design
- ✅ Progressive Web App with offline support
- ✅ Multiple difficulty levels for AI
- ✅ Real-time game status and move validation
- ✅ Responsive design for all devices
- ✅ Comprehensive testing and documentation