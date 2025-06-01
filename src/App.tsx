import Board from '@/components/Board';
import Header from '@/components/Header';
import PacmanGame from '@/components/PacmanGame';
import { Button } from '@/components/ui/button';
import { getAIMove, getRandomValidMove } from '@/services/openaiService';
import { Board as BoardType, DifficultyLevel, SquareValue } from '@/types';
import { aiWinMessages, drawMessages, getRandomMessage, playerWinMessages } from '@/utils/gameMessages';
import { calculateWinner, isDraw } from '@/utils/gameUtils';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

// Allowed player names
const ALLOWED_PLAYERS = ['Clara', 'Camille'];

export default function App() {
  const navigate = useNavigate();
  const [board, setBoard] = useState<BoardType>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true); // Player is X, AI is O
  const [winner, setWinner] = useState<SquareValue>(null);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gameStatus, setGameStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [usedMessages, setUsedMessages] = useState<Set<string>>(new Set());
  const [playerName, setPlayerName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [gameState, setGameState] = useState<'welcome' | 'playing' | 'finished'>('welcome');

  // API key from environment variable
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  // Check for a winner or draw
  useEffect(() => {
    const gameWinner = calculateWinner(board);
    if (gameWinner) {
      setWinner(gameWinner);

      // Choose a message the player hasn't seen recently
      let message;
      if (gameWinner === 'X') {
        message = getMessageNotRecentlyUsed(playerWinMessages)
          .replace('tu', playerName || 'tu')
          .replace('Tu', playerName ? playerName.charAt(0).toUpperCase() + playerName.slice(1) : 'Tu');
      } else {
        message = getMessageNotRecentlyUsed(aiWinMessages);
      }

      setGameStatus(message);
    } else if (isDraw(board)) {
      const drawMessage = getMessageNotRecentlyUsed(drawMessages);
      setGameStatus(drawMessage);
    }
  }, [board, playerName]);

  useEffect(() => {
    if (gameState === 'welcome') {
      setGameStatus("Qui joue aujourd'hui ? ");
    } else if (gameState === 'playing') {
      setGameStatus(`Salut ${playerName} ! Choisis le niveau et commence à jouer !`);
    }
  }, [gameState, playerName]);

  // Get a message that hasn't been used recently
  const getMessageNotRecentlyUsed = (messages: string[]): string => {
    // Filter out recently used messages
    const availableMessages = messages.filter(msg => !usedMessages.has(msg));

    // If all messages have been used, reset the used messages
    if (availableMessages.length === 0) {
      setUsedMessages(new Set());
      return getRandomMessage(messages);
    }

    // Get a random message from available ones
    const message = getRandomMessage(availableMessages);

    // Update used messages, keeping track of last 5 messages
    const newUsedMessages = new Set(usedMessages);
    newUsedMessages.add(message);

    // If we've used more than 5 messages, start removing old ones
    if (newUsedMessages.size > 5) {
      const oldestMessage = Array.from(newUsedMessages)[0];
      newUsedMessages.delete(oldestMessage);
    }

    setUsedMessages(newUsedMessages);
    return message;
  };

  // AI makes a move after player
  useEffect(() => {
    if (gameState === 'playing' && !isXNext && !winner && !board.every(square => square !== null)) {
      makeAIMove();
    }
  }, [isXNext, winner, gameState]);

  // Handle player move
  const handleClick = (index: number) => {
    if (gameState !== 'playing' || board[index] || winner || isLoading || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
    setGameStatus("Je réfléchis...");
  };

  // Make AI move using OpenAI API
  const makeAIMove = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Make sure there's an API key
      if (!apiKey) {
        throw new Error('Clé API OpenAI non configurée. Veuillez l\'ajouter dans le fichier .env');
      }

      const moveIndex = await getAIMove(board, difficulty, apiKey);
      makeMoveAtIndex(moveIndex);
    } catch (error) {
      console.error('Erreur pendant le coup de l\'IA:', error);
      setError(`${error instanceof Error ? error.message : 'Erreur inconnue'}`);

      // Fallback to random move
      const randomMoveIndex = getRandomValidMove(board);
      if (randomMoveIndex !== null) {
        makeMoveAtIndex(randomMoveIndex);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Update the board with the AI's move
  const makeMoveAtIndex = (index: number) => {
    const newBoard = [...board];
    newBoard[index] = 'O';
    setBoard(newBoard);
    setIsXNext(true);
    setGameStatus(`À ton tour, ${playerName} !`);
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setError(null);
    setGameStatus(`Jeu réinitialisé ! À ton tour, ${playerName}.`);
  };

  // Change difficulty level
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value as DifficultyLevel);
  };

  // Handle player selection
  const handlePlayerSelect = (name: string) => {
    setPlayerName(name);
    setNameError('');
  };

  // Start game with selected player
  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    setNameError('');

    if (ALLOWED_PLAYERS.includes(playerName)) {
      setGameState('playing');
      resetGame();
    } else {
      setNameError("Désolé, seules Clara et Camille peuvent jouer à ce jeu !");
    }
  };

  // Finish playing and return to welcome screen
  const handleFinishPlaying = () => {
    setGameState('welcome');
    setPlayerName('');
    setBoard(Array(9).fill(null));
    setWinner(null);
    setError(null);
  };

  // Render welcome screen
  const renderWelcomeScreen = () => (
    <motion.div
      className="welcome-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Bienvenue au jeu de Morpion
      </motion.h2>
      <form onSubmit={handleStartGame} className="name-form">
        <label>
          {gameStatus}
          <div className="player-selection flex gap-4 mt-4">
            <Button
              variant={playerName === 'Clara' ? 'default' : 'secondary'}
              size="lg"
              className="player-button"
              onClick={() => handlePlayerSelect('Clara')}
            >
              Clara
            </Button>
            <Button
              variant={playerName === 'Camille' ? 'default' : 'secondary'}
              size="lg"
              className="player-button"
              onClick={() => handlePlayerSelect('Camille')}
            >
              Camille
            </Button>
          </div>
        </label>
        {nameError && (
          <motion.div
            className="name-error text-red-500 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {nameError}
          </motion.div>
        )}
        <motion.button
          type="submit"
          className="submit-button mt-6 px-8 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark"
          disabled={!playerName}
          whileHover={{ scale: 1.05 }}
          whileTap={{ y: 4, boxShadow: "0 0px 0px rgba(0,0,0,0.3)" }}
        >
          Commencer à jouer
        </motion.button>
      </form>
    </motion.div>
  );

  // Render game screen
  const renderGameScreen = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="player-banner"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2>Joueur: {playerName}</h2>
      </motion.div>
      <div className="settings">
        <label>
          Niveau:
          <select
            value={difficulty}
            onChange={handleDifficultyChange}
            disabled={!board.every(square => square === null)}
          >
            <option value="easy">Facile</option>
            <option value="medium">Moyen</option>
            <option value="hard">Difficile</option>
          </select>
        </label>
      </div>

      <div className="status">{gameStatus}</div>

      <Board
        squares={board}
        onClick={handleClick}
        disabled={!!winner || isLoading || !isXNext}
      />

      <div className="game-buttons">
        <motion.button
          className="reset-button"
          onClick={resetGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ y: 4, boxShadow: "0 0px 0px rgba(0,0,0,0.3)" }}
        >
          {winner || isDraw(board) ? 'Rejouer' : 'Recommencer'}
        </motion.button>
        <motion.button
          className="finish-button"
          onClick={handleFinishPlaying}
          whileHover={{ scale: 1.05 }}
          whileTap={{ y: 4, boxShadow: "0 0px 0px rgba(0,0,0,0.3)" }}
        >
          J'ai fini de jouer
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={
          <div className="welcome-screen">
            <h1>Bienvenue au jeux </h1>

            <Button onClick={() => navigate('/tictactoe')}>Commencer à jouer au Tic Tac toe </Button>
            <button onClick={() => navigate('/pacman')}>Commencer à jouer au pacman </button>
          </div>
        } />
        <Route
          path="/tictactoe"
          element={
            <Board
              squares={board}
              onClick={handleClick}
              disabled={!!winner || isLoading || !isXNext}
            />
          }
        />
        <Route path="/pacman" element={<PacmanGame />} />
      </Routes>
      <div className="app">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

        </motion.h2>

        {gameState === 'welcome' ? renderWelcomeScreen() : renderGameScreen()}

        <div className="api-status">
          {error && <div className="error">⚠️ {error}</div>}
          {!apiKey && <div className="error">⚠️ Clé API OpenAI manquante dans le fichier .env</div>}
        </div>
      </div>
    </div>
  );
};

