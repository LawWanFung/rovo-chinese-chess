import React, { useState } from "react";
import ChessBoard from "./components/ChessBoard";
import GameControls from "./components/GameControls";
import GameInfo from "./components/GameInfo";
import TestAI from "./components/TestAI";
import { GameProvider } from "./context/GameContext";

function App() {
  const [showTestPanel, setShowTestPanel] = useState(false);

  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-6">
            <h1 className="text-4xl font-bold text-red-800 mb-2">中國象棋</h1>
            <h2 className="text-2xl font-semibold text-gray-700">
              Chinese Chess
            </h2>

            {/* Test Panel Toggle */}
            <button
              onClick={() => setShowTestPanel(!showTestPanel)}
              className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm font-medium transition-colors"
            >
              {showTestPanel ? "Hide AI Tests" : "Show AI Tests"}
            </button>
          </header>

          {/* Test Panel */}
          {showTestPanel && (
            <div className="mb-6">
              <TestAI />
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
            <div className="flex-shrink-0" style={{ width: "540px" }}>
              <ChessBoard />
            </div>
            <div className="w-full lg:w-80">
              <GameControls />
              <GameInfo />
            </div>
          </div>
        </div>
      </div>
    </GameProvider>
  );
}

export default App;
