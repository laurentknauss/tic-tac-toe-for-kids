import { Board, DifficultyLevel } from '../types';

// Difficulty levels with corresponding system prompts
export const DIFFICULTY_LEVELS: Record<DifficultyLevel, string> = {
  easy: "You are playing Tic Tac Toe. You should make basic moves without considering strategy. Occasionally make mistakes.",
  medium: "You are playing Tic Tac Toe. Make reasonable moves that block opponent wins when obvious, but don't always see the optimal strategy.",
  hard: "You are playing Tic Tac Toe as an expert. Always make the optimal move considering all possible future moves and strategies."
};

// Function to format the board for the AI
export const formatBoardForAI = (board: Board): string => {
  const boardForAI = board.map(square => square || ' ');
  return `
  ${boardForAI[0]}|${boardForAI[1]}|${boardForAI[2]}
  -+-+-
  ${boardForAI[3]}|${boardForAI[4]}|${boardForAI[5]}
  -+-+-
  ${boardForAI[6]}|${boardForAI[7]}|${boardForAI[8]}
  `;
};

// Function to make an AI move using OpenAI API
export const getAIMove = async (
  board: Board, 
  difficulty: DifficultyLevel, 
  apiKey: string
): Promise<number> => {
  if (!apiKey) {
    throw new Error('OpenAI API key is not set');
  }

  const API_URL = 'https://api.openai.com/v1/chat/completions';
  const boardString = formatBoardForAI(board);

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: DIFFICULTY_LEVELS[difficulty] },
        { role: "user", content: `Here's the current tic-tac-toe board (you are O, opponent is X):\n${boardString}\nMake your next move by responding with only the index (0-8) of the cell where you want to place your O.` }
      ],
      max_tokens: 10,
      temperature: difficulty === 'easy' ? 1.0 : (difficulty === 'medium' ? 0.5 : 0.0)
    })
  });

  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.error.message || 'API Error');
  }

  const aiResponseText = data.choices[0].message.content.trim();
  const moveMatch = aiResponseText.match(/\d+/);
  
  if (!moveMatch) {
    throw new Error('AI returned invalid response');
  }
  
  const moveIndex = parseInt(moveMatch[0], 10);
  
  // Validate the move
  if (isNaN(moveIndex) || moveIndex < 0 || moveIndex > 8 || board[moveIndex] !== null) {
    throw new Error('AI returned invalid move: ' + moveIndex);
  }
  
  return moveIndex;
};

// Fallback function to get a random valid move
export const getRandomValidMove = (board: Board): number | null => {
  const emptyIndices = board
    .map((square, index) => square === null ? index : null)
    .filter((index): index is number => index !== null);
    
  if (emptyIndices.length === 0) {
    return null;
  }
  
  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
};