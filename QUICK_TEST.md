# Quick AI Testing Instructions

## 🚀 Ready to Test!

### Step 1: Install and Start
```bash
cd rovo-chinese-chess
npm install
npm start
```

### Step 2: Open Browser
Navigate to: **http://localhost:3000**

### Step 3: Run Automated Tests
1. Click **"Show AI Tests"** button at the top
2. Click **"Run AI Tests"** in the test panel
3. Watch the test results - all should show ✅

### Step 4: Test AI Gameplay
1. Click **"vs AI"** in the game controls
2. Select difficulty: **Easy**, **Medium**, or **Hard**
3. Make a move by clicking a red piece, then clicking where to move it
4. Watch the AI think and respond automatically
5. Continue playing to test multiple moves

### Step 5: What to Look For

#### ✅ Expected Behaviors:
- AI responds within reasonable time (Easy: <500ms, Medium: <1s, Hard: <2.5s)
- AI makes legal moves only
- "AI is thinking..." indicator appears during calculation
- Move history updates with AI moves
- Board becomes non-interactive during AI turn
- AI Status panel shows current state

#### ❌ Potential Issues:
- AI takes too long to respond
- AI makes invalid moves
- Game freezes or crashes
- Console errors in browser developer tools
- UI doesn't update properly

### Step 6: Test Different Scenarios

#### Basic Functionality:
- [x] Switch between Human vs Human and vs AI modes
- [x] Change AI difficulty levels
- [x] Reset game (New Game button)
- [x] Play multiple moves in sequence

#### Edge Cases:
- [x] Rapid clicking during AI thinking
- [x] Switching modes mid-game
- [x] Changing difficulty during game
- [x] Browser refresh during AI turn

### Step 7: Performance Testing

Try each difficulty level and note response times:
- **Easy AI**: Should be very quick, good for beginners
- **Medium AI**: Balanced speed/strength, good for most players  
- **Hard AI**: Slower but stronger, challenging for experienced players

### Step 8: Report Results

**If everything works:** 🎉 Congratulations! The AI is working perfectly.

**If you find issues:** Please note:
- What you were doing when the issue occurred
- What you expected to happen
- What actually happened
- Any error messages in browser console (F12 → Console tab)

### Quick Troubleshooting

**AI not responding?**
- Check browser console for errors
- Try refreshing the page
- Ensure you're in "vs AI" mode

**Moves not working?**
- Make sure it's your turn (Red player)
- Click your piece first, then destination
- Verify you're selecting red pieces only

**Performance issues?**
- Try Easy difficulty first
- Close other browser tabs
- Check if your device meets requirements

### Development Testing

For developers who want to run unit tests:
```bash
npm test
```

This runs the automated test suite for the AI engine and game logic.

---

**Happy Testing!** 🎮

The AI should provide an engaging and challenging Chinese Chess experience. Enjoy playing against your new AI opponent!