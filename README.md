# Chinese Chess (象棋) - Progressive Web App

A complete Chinese Chess (Xiangqi) game built with React.js and Tailwind CSS as a Progressive Web App. Features an intelligent AI opponent, authentic board design, and comprehensive rule enforcement.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![PWA](https://img.shields.io/badge/PWA-enabled-purple.svg)

## Features

- ✅ Full Chinese Chess board with traditional pieces
- ✅ Turn-based gameplay (Red vs Black)
- ✅ **AI Opponent with 3 difficulty levels**
- ✅ **Minimax algorithm with alpha-beta pruning**
- ✅ **Intelligent piece evaluation and positioning**
- ✅ Move validation and piece selection
- ✅ Move history tracking
- ✅ Progressive Web App (PWA) support
- ✅ Responsive design with Tailwind CSS
- ✅ Traditional Chinese characters for pieces
- ✅ **Human vs Human and Human vs AI modes**
- ✅ **Real-time AI thinking indicators**

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rovo-chinese-chess
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder and optimizes the build for the best performance.

## Game Rules

Chinese Chess (Xiangqi) is played on a 10×9 board with pieces placed on line intersections. The objective is to capture the opponent's general (king).

### Pieces:
- **General (帥/將)**: The king piece, must stay within the palace
- **Advisor (仕/士)**: Protects the general, moves diagonally within palace
- **Elephant (相/象)**: Moves diagonally, cannot cross the river
- **Horse (馬)**: Moves in an L-shape, can be blocked
- **Chariot (車)**: Moves horizontally and vertically
- **Cannon (炮/砲)**: Moves like chariot, captures by jumping over pieces
- **Soldier (兵/卒)**: Moves forward, can move sideways after crossing river

## Technology Stack

- **React.js**: Frontend framework with hooks and context
- **Tailwind CSS**: Utility-first CSS framework
- **Context API**: State management
- **Service Worker**: PWA functionality
- **Minimax AI**: Intelligent game engine with alpha-beta pruning
- **Responsive Design**: Mobile-friendly interface

## AI Features

### Intelligent Gameplay
- **Minimax Algorithm**: Deep game tree search with alpha-beta pruning
- **Position Evaluation**: Advanced board evaluation considering piece values and positioning
- **Difficulty Levels**:
  - **Easy**: 2-ply search, quick moves
  - **Medium**: 3-ply search, balanced strategy
  - **Hard**: 4-ply search, strong tactical play

### AI Capabilities
- Proper piece movement validation
- Capture prioritization
- King safety evaluation
- Mobility assessment
- Strategic positioning
- Endgame awareness

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.