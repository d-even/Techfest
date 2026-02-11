import { useState, useEffect } from "react";
import "./App.css";

export default function SlidingXOX() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [gamePhase, setGamePhase] = useState('placement'); // 'placement' or 'sliding'
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [winner, setWinner] = useState(null);
  const [piecesPlaced, setPiecesPlaced] = useState({ X: 0, O: 0 });
  const [animatingMove, setAnimatingMove] = useState(null);
  const [placementOrder, setPlacementOrder] = useState({ X: [], O: [] });
  const [moveCount, setMoveCount] = useState(0);
  const [forcedPieceIndex, setForcedPieceIndex] = useState(null);

  // Get the piece that must be moved (in order of placement)
  const getForcedPieceToMove = () => {
    if (gamePhase !== 'sliding') return null;
    
    const currentPlayer = isX ? 'X' : 'O';
    const playerMoveNumber = Math.floor(moveCount / 2);
    const pieceToMoveIndex = playerMoveNumber % 3; // 0, 1, 2 (cycling through pieces)
    
    const piecePosition = placementOrder[currentPlayer][pieceToMoveIndex];
    
    // Check if the piece still exists at its recorded position
    if (board[piecePosition] === currentPlayer) {
      return piecePosition;
    }
    
    // If piece moved, find where it is now
    for (let i = 0; i < board.length; i++) {
      if (board[i] === currentPlayer) {
        // Find which piece this is by process of elimination
        const otherPieces = placementOrder[currentPlayer].filter((_, idx) => idx !== pieceToMoveIndex);
        let isOtherPiece = false;
        for (let otherPos of otherPieces) {
          if (board[otherPos] === currentPlayer) {
            isOtherPiece = true;
            break;
          }
        }
        if (!isOtherPiece) {
          return i; // This must be our piece
        }
      }
    }
    
    return null;
  };

  useEffect(() => {
    if (gamePhase === 'sliding') {
      const forcedPiece = getForcedPieceToMove();
      setForcedPieceIndex(forcedPiece);
      // Don't auto-select the piece - let player find it
    }
  }, [gamePhase, isX, moveCount]);

  // Check for winner
  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      setWinner(winner);
    }
  }, [board]);

  // Get adjacent cells
  const getAdjacentCells = (index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const adjacent = [];
    
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
          adjacent.push(newRow * 3 + newCol);
        }
      }
    }
    return adjacent;
  };

  const handleCellClick = (index) => {
    if (winner) return;
    
    if (gamePhase === 'placement') {
      // Placement phase: each player places 3 pieces
      if (board[index]) return;
      
      const currentPlayer = isX ? 'X' : 'O';
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      
      // Track placement order
      const newPlacementOrder = {
        ...placementOrder,
        [currentPlayer]: [...placementOrder[currentPlayer], index]
      };
      setPlacementOrder(newPlacementOrder);
      
      const newPiecesPlaced = {
        ...piecesPlaced,
        [currentPlayer]: piecesPlaced[currentPlayer] + 1
      };
      setPiecesPlaced(newPiecesPlaced);
      
      // Check if placement phase is over
      if (newPiecesPlaced.X === 3 && newPiecesPlaced.O === 3) {
        setGamePhase('sliding');
        setMoveCount(0);
      }
      
      setIsX(!isX);
    } else {
      // Sliding phase - pieces must move in order
      const currentPlayer = isX ? 'X' : 'O';
      const forcedPiece = getForcedPieceToMove();
      
      if (forcedPiece === null) return;
      
      // If clicking on empty space, move forced piece there
      if (!board[index]) {
        // Allow movement to any empty space
        setAnimatingMove({ from: forcedPiece, to: index });
        
        setTimeout(() => {
          const newBoard = [...board];
          newBoard[index] = newBoard[forcedPiece];
          newBoard[forcedPiece] = null;
          setBoard(newBoard);
          setSelectedPiece(null);
          setIsX(!isX);
          setAnimatingMove(null);
          setMoveCount(moveCount + 1);
        }, 300);
      } else if (board[index] === currentPlayer && index === forcedPiece) {
        // Optional: still allow selecting the forced piece for visual feedback
        setSelectedPiece(selectedPiece === index ? null : index);
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsX(true);
    setGamePhase('placement');
    setSelectedPiece(null);
    setWinner(null);
    setPiecesPlaced({ X: 0, O: 0 });
    setAnimatingMove(null);
    setPlacementOrder({ X: [], O: [] });
    setMoveCount(0);
    setForcedPieceIndex(null);
  };

  const isValidMove = (index) => {
    if (gamePhase === 'sliding' && !board[index]) {
      return true; // Any empty space is valid
    }
    return false;
  };

  const getCurrentPieceToMove = () => {
    if (gamePhase !== 'sliding') return null;
    const currentPlayer = isX ? 'X' : 'O';
    const playerMoveNumber = Math.floor(moveCount / 2);
    const pieceIndex = playerMoveNumber % 3;
    return pieceIndex + 1; // Convert to 1-based for display
  };

  return (
    <div className="game">
      <h1> KATA-XOX</h1>
      
      {winner && (
        <div className="winner-banner">
           Player {winner} Wins! 
        </div>
      )}
      
      <div className="game-controls">
        <button className="reset-button" onClick={resetGame}>
          New Game
        </button>
      </div>
      
      
      
      <div className="board">
        {board.map((cell, i) => {
          const isSelected = selectedPiece === i;
          const isAnimatingFrom = animatingMove?.from === i;
          const isAnimatingTo = animatingMove?.to === i;
          
          return (
            <div 
              key={i} 
              className={`cell ${
                isSelected ? 'selected' : ''
              } ${
                isAnimatingFrom ? 'animating-from' : ''
              } ${
                isAnimatingTo ? 'animating-to' : ''
              }`}
              onClick={() => handleCellClick(i)}
            >
              {cell && !isAnimatingFrom && (
                <img
                  src={cell === "X" ? "/1.png" : "/2.png"}
                  alt={cell}
                  className={`piece-image ${cell === "X" ? "piece-x" : "piece-o"}`}
                />
              )}
              {isAnimatingTo && animatingMove && (
                <img
                  src={board[animatingMove.from] === "X" ? "/1.png" : "/2.png"}
                  alt={board[animatingMove.from]}
                  className={`piece-image sliding-piece ${
                    board[animatingMove.from] === "X" ? "piece-x" : "piece-o"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
