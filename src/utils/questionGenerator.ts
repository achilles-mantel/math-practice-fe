import type { Operation, Question } from '../types/game.types';

const OPERATION_SYMBOLS: Record<Exclude<Operation, 'mixed'>, string> = {
  addition: '+',
  subtraction: '−',
  multiplication: '×',
  division: '÷',
};

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAddition(): Question {
  const operandA = randomInt(0, 9);
  const operandB = randomInt(0, 9);
  return {
    operandA,
    operandB,
    operation: 'addition',
    answer: operandA + operandB,
    displaySymbol: OPERATION_SYMBOLS.addition,
  };
}

function generateSubtraction(): Question {
  const operandA = randomInt(0, 9);
  const operandB = randomInt(0, operandA); // ensure no negative result
  return {
    operandA,
    operandB,
    operation: 'subtraction',
    answer: operandA - operandB,
    displaySymbol: OPERATION_SYMBOLS.subtraction,
  };
}

function generateMultiplication(): Question {
  const operandA = randomInt(0, 9);
  const operandB = randomInt(0, 9);
  return {
    operandA,
    operandB,
    operation: 'multiplication',
    answer: operandA * operandB,
    displaySymbol: OPERATION_SYMBOLS.multiplication,
  };
}

function generateDivision(): Question {
  // Generate quotient and divisor first to ensure whole-number result
  const quotient = randomInt(1, 9);
  const divisor = randomInt(1, 9);
  const dividend = quotient * divisor;
  return {
    operandA: dividend,
    operandB: divisor,
    operation: 'division',
    answer: quotient,
    displaySymbol: OPERATION_SYMBOLS.division,
  };
}

const generators: Record<Exclude<Operation, 'mixed'>, () => Question> = {
  addition: generateAddition,
  subtraction: generateSubtraction,
  multiplication: generateMultiplication,
  division: generateDivision,
};

const NON_MIXED_OPERATIONS: Array<Exclude<Operation, 'mixed'>> = [
  'addition',
  'subtraction',
  'multiplication',
  'division',
];

export function generateQuestion(operation: Operation): Question {
  if (operation === 'mixed') {
    const randomOperation =
      NON_MIXED_OPERATIONS[randomInt(0, NON_MIXED_OPERATIONS.length - 1)];
    return generators[randomOperation]();
  }
  return generators[operation]();
}

export function generateRound(operation: Operation, count: number): Question[] {
  return Array.from({ length: count }, () => generateQuestion(operation));
}