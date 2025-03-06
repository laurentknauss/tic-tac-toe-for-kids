import React from 'react';
import { motion } from 'framer-motion';
import { SquareValue } from '../types';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  disabled: boolean;
  index: number;
}

const Square: React.FC<SquareProps> = ({ value, onClick, disabled, index }) => {
  return (
    <motion.button 
      className={`square ${value}`} 
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={!disabled ? { scale: 1.05, backgroundColor: "rgba(78, 205, 196, 0.2)" } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {value && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
        >
          {value}
        </motion.span>
      )}
    </motion.button>
  );
};

export default Square;