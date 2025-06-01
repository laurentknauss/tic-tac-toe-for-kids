import { motion } from 'framer-motion';
import React from 'react';
import './header.css';

export default function Header(){
  const title = "Les petits jeux de Camille et Clara";

  return (
    <motion.header
      className="game-header"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="header-content">
        <motion.span
          className="emoji-decoration"
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            type: "spring"
          }}
        >
          🦄
        </motion.span>
        <motion.span
          className="emoji-decoration"
          initial={{ rotate: -30, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            type: "spring"
          }}
        >
          🥳
        </motion.span>

        <motion.h1>
          {title.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.03,
                repeat: char === 'C' ? Infinity : 0,
                repeatType: "reverse",
                repeatDelay: 5
              }}
              style={{ display: 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.span
          className="emoji-decoration"
          initial={{ rotate: 20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.4,
            type: "spring"
          }}
        >
          🎉
        </motion.span>
        <motion.span
          className="emoji-decoration"
          initial={{ rotate: 30, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            type: "spring"
          }}
        >
          🐍
        </motion.span>
      </motion.div>
    </motion.header>
  );
};