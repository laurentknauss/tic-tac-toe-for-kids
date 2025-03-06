import { Board, SquareValue } from '../types';

// Check if there's a winner
export const calculateWinner = (squares: Board): SquareValue => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  
  return null;
};

// Check if the game is a draw
export const isDraw = (board: Board): boolean => {
  return board.every(square => square !== null) && !calculateWinner(board);
};

// Get game status message
export const getGameStatus = (
  board: Board, 
  winner: SquareValue, 
  isXNext: boolean, 
  isLoading: boolean
): string => {
  if (winner) {
    return `Winner: ${winner === 'X' ? 'You' : 'AI'}`;
  } else if (isDraw(board)) {
    return 'Game ended in a draw!';
  } else if (isLoading) {
    return 'AI is thinking...';
  } else {
    return isXNext ? 'Your turn!' : "AI's turn";
  }
};