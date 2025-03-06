# Tic Tac Toe with OpenAI API

A Tic Tac Toe game where you play against an AI opponent powered by OpenAI's GPT models.

## Features

- Play Tic Tac Toe against an AI that uses OpenAI's API
- Three difficulty levels (easy, medium, hard)
- Built with React, TypeScript, and Vite

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## How it Works

- Player plays as X, AI plays as O
- The AI's moves are determined by OpenAI's API responses
- Difficulty levels change how the AI thinks:
  - Easy: Makes basic moves with occasional mistakes
  - Medium: Makes decent moves but not always optimal
  - Hard: Makes optimal strategic moves

## Technologies Used

- React
- TypeScript
- Vite
- OpenAI API

## License

MIT
