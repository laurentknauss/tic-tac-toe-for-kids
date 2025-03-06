import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedButton.css';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isSelected?: boolean;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  onClick, 
  isSelected = false,
  className = ''
}) => {
  return (
    <motion.button
      className={`animated-button ${isSelected ? 'selected' : ''} ${className}`}
      onClick={onClick}
      animate={isSelected ? {} : {
        boxShadow: [
          "0 4px 0px rgba(0, 0, 0, 0.3)",
          "0 4px 0px rgba(255, 107, 158, 0.7)",
          "0 4px 0px rgba(78, 205, 196, 0.7)",
          "0 4px 0px rgba(0, 0, 0, 0.3)"
        ],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      whileHover={{ 
        scale: 1.05,
      }}
      whileTap={{ 
        y: 4,
        boxShadow: "0 0px 0px rgba(0, 0, 0, 0.3)"
      }}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;