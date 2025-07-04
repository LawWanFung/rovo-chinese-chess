// Simple test script to verify AI functionality
const { ChessAI } = require('./src/utils/aiEngine.js');
const { initialBoard, isValidMove } = require('./src/utils/gameLogic.js');

console.log('🧪 Testing Chinese Chess AI...\n');

// Test 1: AI Initialization
console.log('1. Testing AI Initialization:');
try {
  const ai = new ChessAI('medium');
  console.log('✅ AI created successfully');
  console.log(`   Difficulty: ${ai.difficulty}`);
  console.log(`   Max Depth: ${ai.maxDepth}`);
} catch (error) {
  console.log('❌ AI initialization failed:', error.message);
}

// Test 2: Move Generation
console.log('\n2. Testing Move Generation:');
try {
  const ai = new ChessAI('easy');
  const moves = ai.getAllPossibleMoves(initialBoard, 'black');
  console.log(`✅ Generated ${moves.length} possible moves for black`);
  
  // Show first few moves
  console.log('   Sample moves:');
  moves.slice(0, 5).forEach((move, index) => {
    const piece = initialBoard[move.from[0]][move.from[1]];
    console.log(`   ${index + 1}. ${piece}: (${move.from[0]},${move.from[1]}) → (${move.to[0]},${move.to[1]})`);
  });
} catch (error) {
  console.log('❌ Move generation failed:', error.message);
}

// Test 3: Board Evaluation
console.log('\n3. Testing Board Evaluation:');
try {
  const ai = new ChessAI('medium');
  const score = ai.evaluateBoard(initialBoard);
  console.log(`✅ Board evaluation: ${score}`);
  console.log('   (Initial position should be roughly balanced, close to 0)');
} catch (error) {
  console.log('❌ Board evaluation failed:', error.message);
}

// Test 4: AI Move Selection
console.log('\n4. Testing AI Move Selection:');
try {
  const ai = new ChessAI('easy');
  console.log('   Calculating best move for black...');
  
  const startTime = Date.now();
  const bestMove = ai.getBestMove(initialBoard, 'black');
  const endTime = Date.now();
  
  if (bestMove) {
    const piece = initialBoard[bestMove.from[0]][bestMove.from[1]];
    console.log(`✅ AI selected move: ${piece} from (${bestMove.from[0]},${bestMove.from[1]}) to (${bestMove.to[0]},${bestMove.to[1]})`);
    console.log(`   Calculation time: ${endTime - startTime}ms`);
    
    // Verify move is valid
    const isValid = isValidMove(initialBoard, bestMove.from, bestMove.to, 'black');
    console.log(`   Move validity: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
  } else {
    console.log('❌ AI could not find a move');
  }
} catch (error) {
  console.log('❌ AI move selection failed:', error.message);
}

// Test 5: Different Difficulty Levels
console.log('\n5. Testing Different Difficulty Levels:');
const difficulties = ['easy', 'medium', 'hard'];
difficulties.forEach(difficulty => {
  try {
    const ai = new ChessAI(difficulty);
    console.log(`✅ ${difficulty.toUpperCase()}: depth ${ai.maxDepth}`);
  } catch (error) {
    console.log(`❌ ${difficulty.toUpperCase()}: failed - ${error.message}`);
  }
});

console.log('\n🎯 AI Testing Complete!');
console.log('\nNext steps:');
console.log('1. Run: cd rovo-chinese-chess && npm install');
console.log('2. Run: npm start');
console.log('3. Open browser to http://localhost:3000');
console.log('4. Click "vs AI" to test the AI opponent');
console.log('5. Try different difficulty levels');