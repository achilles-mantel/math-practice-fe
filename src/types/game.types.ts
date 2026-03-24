export type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'mixed';

export interface Question {
  operandA: number;
  operandB: number;
  operation: Exclude<Operation, 'mixed'>;
  answer: number;
  displaySymbol: string;
}

export type GamePhase = 'start' | 'playing' | 'feedback' | 'summary';

export interface RoundResult {
  question: Question;
  playerAnswer: number | null;
  isCorrect: boolean;
}

export interface GameState {
  phase: GamePhase;
  selectedOperation: Operation;
  currentQuestion: Question | null;
  currentQuestionIndex: number;
  currentInput: string;
  results: RoundResult[];
  score: number;
  totalQuestions: number;
}