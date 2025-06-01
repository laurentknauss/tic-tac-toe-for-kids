import { motion } from 'framer-motion';

interface SquareProps {
  value: string | null;
  onClick: () => void;
  disabled: boolean;
  index: number;
}

export default function Square({ value, onClick, disabled, index }: SquareProps) {
  return (
    <motion.button
      className="square"
      onClick={onClick}
      disabled={disabled}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      {value}
    </motion.button>
  );
}