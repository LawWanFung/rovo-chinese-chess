# Setup Instructions for Chinese Chess PWA

## Quick Start

1. **Install dependencies:**
   ```bash
   cd rovo-chinese-chess
   npm install
   ```

2. **Install Tailwind CSS:**
   ```bash
   npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
rovo-chinese-chess/
├── public/
│   ├── index.html          # Main HTML file
│   ├── manifest.json       # PWA manifest
│   ├── service-worker.js   # Service worker for PWA
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ChessBoard.js   # Main game board component
│   │   ├── ChessSquare.js  # Individual square component
│   │   ├── GameControls.js # Game controls and status
│   │   ├── GameInfo.js     # Piece guide and rules
│   │   └── index.js        # Component exports
│   ├── context/
│   │   └── GameContext.js  # Game state management
│   ├── utils/
│   │   └── gameLogic.js    # Chess rules and validation
│   ├── App.js              # Main app component
│   ├── App.test.js         # Basic tests
│   ├── index.js            # App entry point
│   ├── index.css           # Tailwind CSS imports
│   └── serviceWorkerRegistration.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Features Implemented

✅ **Core Game Features:**
- Complete Chinese Chess board (10x9)
- All traditional pieces with Chinese characters
- Turn-based gameplay (Red vs Black)
- **AI Opponent with 3 difficulty levels**
- **Human vs Human and Human vs AI modes**
- Comprehensive move validation for all pieces
- Move history tracking
- Game controls (New Game, etc.)
- **Real-time AI status and thinking indicators**

✅ **Technical Features:**
- React.js with functional components and hooks
- Context API for state management
- Tailwind CSS for styling
- Progressive Web App (PWA) support
- Service Worker for offline functionality
- Responsive design
- camelCase variable naming convention

✅ **Chinese Chess Rules:**
- General/King movement within palace
- Advisor diagonal movement in palace
- Elephant movement with river restriction
- Horse L-shaped movement with blocking
- Chariot straight-line movement
- Cannon jumping capture mechanism
- Soldier forward/sideways movement rules

## Next Steps

To complete the setup:
1. Run `npm install` to install dependencies
2. Start the development server with `npm start`
3. The game will be available at http://localhost:3000
4. Install as PWA using browser's "Add to Home Screen" option