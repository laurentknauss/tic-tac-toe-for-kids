// Game types
export type SquareValue = 'X' | 'O' | null;
export type Board = SquareValue[];
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

// OpenAI API types
export interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}