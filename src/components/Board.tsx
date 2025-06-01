import { motion } from 'framer-motion';
import { Board as BoardType } from '../types';
import Square from './square';

interface BoardProps {
  squares: BoardType;
  onClick: (i: number) => void;
  disabled: boolean;
}

export default function Board({ squares, onClick, disabled }: BoardProps) {
  return (
    <motion.div
      className="board"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => onClick(i)}
          disabled={square !== null || disabled}
          index={i}
        />
      ))}
    </motion.div>
  );
}