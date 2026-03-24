import { useState, useCallback } from 'react';
import type { GameState, Operation, RoundResult } from '../types/game.types';
import { generateRound } from '../utils/questionGenerator';

const TOTAL_QUESTIONS = 10;

function createInitialState(): GameState {
  return {
    phase: 'start',
    selectedOperation: 'mixed',
    currentQuestion: null,
    currentQuestionIndex: 0,
    currentInput: '',
    results: [],
    score: 0,
    totalQuestions: TOTAL_QUESTIONS,
  };
}

export function useGameLogic() {
  const [state, setState] = useState<GameState>(createInitialState);
  const [questions, setQuestions] = useState(() => generateRound('mixed', TOTAL_QUESTIONS));

  const startGame = useCallback((operation: Operation) => {
    const newQuestions = generateRound(operation, TOTAL_QUESTIONS);
    setQuestions(newQuestions);
    setState({
      phase: 'playing',
      selectedOperation: operation,
      currentQuestion: newQuestions[0],
      currentQuestionIndex: 0,
      currentInput: '',
      results: [],
      score: 0,
      totalQuestions: TOTAL_QUESTIONS,
    });
  }, []);

  const appendDigit = useCallback((digit: string) => {
    setState((prev) => {
      if (prev.phase !== 'playing') return prev;
      // Limit input length to 2 digits (max single-digit answer is 81 for 9×9)
      if (prev.currentInput.length >= 2) return prev;
      // Prevent leading zeros (except single "0")
      if (prev.currentInput === '0' && digit === '0') return prev;
      return { ...prev, currentInput: prev.currentInput + digit };
    });
  }, []);

  const deleteDigit = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== 'playing') return prev;
      return { ...prev, currentInput: prev.currentInput.slice(0, -1) };
    });
  }, []);

  const checkAnswer = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== 'playing' || !prev.currentQuestion) return prev;
      if (prev.currentInput === '') return prev;

      const playerAnswer = parseInt(prev.currentInput, 10);
      const isCorrect = playerAnswer === prev.currentQuestion.answer;
      const result: RoundResult = {
        question: prev.currentQuestion,
        playerAnswer,
        isCorrect,
      };

      return {
        ...prev,
        phase: 'feedback',
        results: [...prev.results, result],
        score: isCorrect ? prev.score + 1 : prev.score,
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== 'feedback') return prev;

      const nextIndex = prev.currentQuestionIndex + 1;

      if (nextIndex >= prev.totalQuestions) {
        return { ...prev, phase: 'summary', currentQuestion: null };
      }

      return {
        ...prev,
        phase: 'playing',
        currentQuestionIndex: nextIndex,
        currentQuestion: questions[nextIndex],
        currentInput: '',
      };
    });
  }, [questions]);

  const resetGame = useCallback(() => {
    setState(createInitialState());
  }, []);

  return {
    state,
    startGame,
    appendDigit,
    deleteDigit,
    checkAnswer,
    nextQuestion,
    resetGame,
  };
}