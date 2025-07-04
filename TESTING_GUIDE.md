# AI Testing Guide

## Quick Start Testing

### 1. Setup and Launch
```bash
cd rovo-chinese-chess
npm install
npm start
```
Open browser to: http://localhost:3000

### 2. Basic AI Testing

#### Test AI Mode Activation
1. ✅ Click "vs AI" button in game controls
2. ✅ Verify mode switches from "Human vs Human" to "vs AI"
3. ✅ Check that AI difficulty dropdown appears
4. ✅ Confirm current player shows "紅方 (Red)" for human

#### Test AI Difficulty Levels
1. ✅ Select "Easy" - should respond quickly (~100-300ms)
2. ✅ Select "Medium" - balanced response time (~300-800ms)  
3. ✅ Select "Hard" - longer thinking time (~800-2000ms)
4. ✅ Verify difficulty changes are reflected in AI Status panel

#### Test AI Gameplay
1. ✅ Make a move as Red (human player)
2. ✅ Watch for "AI is thinking..." indicator
3. ✅ Verify AI makes a valid move as Black
4. ✅ Check move appears in move history
5. ✅ Confirm turn switches back to Red

### 3. Advanced Testing

#### Test AI Move Quality
- **Easy AI**: Should make reasonable but not perfect moves
- **Medium AI**: Should show tactical awareness, avoid obvious blunders
- **Hard AI**: Should play strategically, consider multiple moves ahead

#### Test Game Flow
1. ✅ Play several moves back and forth
2. ✅ Verify AI follows all Chinese Chess rules
3. ✅ Test piece captures work correctly
4. ✅ Check that invalid moves are prevented
5. ✅ Verify game state updates properly

#### Test UI/UX
1. ✅ Board becomes non-interactive during AI thinking
2. ✅ Loading spinner appears during AI calculation
3. ✅ AI Status panel updates in real-time
4. ✅ Move history tracks both human and AI moves
5. ✅ Game mode indicator shows correct status

### 4. Edge Case Testing

#### Test Game Reset
1. ✅ Click "New Game" during AI mode
2. ✅ Verify board resets to initial position
3. ✅ Check AI mode and difficulty are preserved
4. ✅ Confirm Red player starts first

#### Test Mode Switching
1. ✅ Switch from "vs AI" to "Human vs Human"
2. ✅ Verify AI components disappear
3. ✅ Switch back to "vs AI"
4. ✅ Check AI functionality resumes

#### Test Error Handling
1. ✅ Try rapid clicking during AI thinking
2. ✅ Attempt to select black pieces as human
3. ✅ Verify graceful handling of edge cases

### 5. Performance Testing

#### Response Times by Difficulty
- **Easy**: Target < 500ms
- **Medium**: Target < 1000ms
- **Hard**: Target < 2500ms

#### Memory Usage
- Monitor browser memory during extended play
- Check for memory leaks after multiple games
- Verify smooth performance on mobile devices

### 6. Browser Testing

Test in multiple browsers:
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### 7. Expected AI Behaviors

#### Opening Play
- AI should develop pieces logically
- Avoid moving same piece multiple times early
- Control center and protect king

#### Mid-game
- Look for tactical opportunities
- Maintain piece coordination
- Respond to threats appropriately

#### Endgame
- Push for checkmate when ahead
- Defend accurately when behind
- Demonstrate basic endgame knowledge

### 8. Common Issues to Check

#### AI Not Responding
- Check browser console for JavaScript errors
- Verify all files loaded correctly
- Ensure proper game state management

#### Invalid AI Moves
- Confirm move validation is working
- Check piece movement rules implementation
- Verify board state consistency

#### Performance Issues
- Monitor calculation times
- Check for infinite loops in AI logic
- Verify alpha-beta pruning is working

### 9. Success Criteria

The AI should demonstrate:
- ✅ Legal move generation
- ✅ Reasonable move selection
- ✅ Appropriate difficulty scaling
- ✅ Stable performance
- ✅ Good user experience
- ✅ Error-free operation

### 10. Reporting Issues

If you find any problems:
1. Note the specific steps to reproduce
2. Record browser and device information
3. Check browser console for error messages
4. Document expected vs actual behavior
5. Include screenshots if helpful

## Automated Testing

For developers, run the built-in test suite:
```bash
npm test
```

This will run unit tests for:
- AI engine functionality
- Move generation
- Board evaluation
- Game logic validation

Happy testing! 🎮