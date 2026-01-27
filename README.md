<!-- # Sliding XOX Game

A strategic twist on the classic tic-tac-toe game built with React. Instead of just placing pieces, players must slide their pieces in a specific order, creating a more dynamic and challenging experience.

## 🎮 Game Features
 
- **Two-Phase Gameplay**: Placement phase followed by strategic sliding phase
- **Intelligent AI**: Play against a smart computer opponent
- **Order-Based Movement**: Pieces must be moved in the order they were placed
- **Modern UI**: Clean, responsive design with smooth animations
- **Strategic Depth**: More complex than traditional tic-tac-toe

## 🎯 How to Play

### Phase 1: Placement
1. Each player takes turns placing 3 pieces on the board
2. Player X (red) goes first, followed by Player O (blue)
3. Remember the order you place your pieces - this matters later!

### Phase 2: Sliding
1. Once all 6 pieces are placed, the sliding phase begins
2. Players must move their pieces **in the order they were placed**:
   - 4th move: Move your 1st placed piece
   - 6th move: Move your 2nd placed piece  
   - 8th move: Move your 3rd placed piece
   - 10th move: Move your 1st placed piece again (cycle repeats)
3. Click any empty space to move your forced piece there
4. No adjacency restrictions - pieces can "teleport" to any empty space

### Winning
- Get 3 pieces in a row (horizontal, vertical, or diagonal)
- Can be achieved in either placement or sliding phase

## 🤖 AI Features

The computer opponent includes:
- **Strategic Placement**: Prefers center, corners, then sides
- **Win Detection**: Takes winning moves when available
- **Blocking**: Prevents player from winning
- **Position Evaluation**: Analyzes all possible moves with scoring system
- **Adaptive Strategy**: Makes smarter moves when player is winning

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Game Controls

- **Play vs Computer**: Start a game against the AI opponent
- **New Game**: Reset the board and start over
- **Click empty spaces**: Move your forced piece to that location

## 🧠 Strategy Tips

1. **Plan your placement order**: Remember which piece you'll be forced to move first
2. **Control the center**: Center position is strategically important
3. **Think ahead**: Consider where your pieces will be after forced movements
4. **Block opportunities**: Watch for opponent's potential winning lines
5. **Create multiple threats**: Set up multiple ways to win simultaneously

## 📁 Project Structure

```
src/
├── App.js          # Main game logic and components
├── App.css         # Game styling
├── index.js        # React entry point
└── index.css       # Global styles
```

## 🛠 Technologies Used

- **React 18** - Frontend framework
- **CSS3** - Styling and animations  
- **JavaScript ES6+** - Game logic and AI
- **Create React App** - Project setup and build tools

## 🎮 Game States

The game manages several key states:
- `board`: Current 3x3 game board
- `gamePhase`: Either 'placement' or 'sliding'
- `placementOrder`: Tracks order pieces were placed
- `moveCount`: Determines which piece must move
- `gameMode`: Either 'human' or 'computer'

## 🧩 AI Algorithm

The computer uses a sophisticated evaluation system:
- **Immediate win**: +1000 points
- **Block player win**: +500 points
- **Center position**: +30 points
- **Corner positions**: +20 points
- **Potential wins**: +10 points per line
- **Give opponent advantage**: -15 points per line

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Enjoy the Game!

Experience the strategic depth of Sliding XOX - where every placement matters and every move counts!

---

## Available Scripts (Create React App) -->
