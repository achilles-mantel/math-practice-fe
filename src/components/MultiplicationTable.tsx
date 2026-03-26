import { useState } from 'react';
import { NumberPad } from './NumberPad';
import { RoundSummary } from './RoundSummary';
import type { Operation, RoundResult } from '../types/game.types';

interface MultiplicationTableProps {
  multiplier: number;
  onHome: () => void;
}

type TablePhase = 'input' | 'results';

function buildQuestions(multiplier: number) {
  return Array.from({ length: 9 }, (_, i) => ({
    operandA: multiplier,
    operandB: i + 1,
    answer: multiplier * (i + 1),
  }));
}

export function MultiplicationTable({ multiplier, onHome }: MultiplicationTableProps) {
  const questions = buildQuestions(multiplier);

  const [answers, setAnswers] = useState<string[]>(Array(9).fill(''));
  const [focusedRow, setFocusedRow] = useState<number>(0);
  const [tablePhase, setTablePhase] = useState<TablePhase>('input');
  const [results, setResults] = useState<RoundResult[]>([]);
  const [score, setScore] = useState(0);

  const handleDigit = (digit: string) => {
    setAnswers((prev) => {
      const current = prev[focusedRow];
      if (current.length >= 2) return prev;
      if (current === '0' && digit === '0') return prev;
      const updated = [...prev];
      updated[focusedRow] = current + digit;
      return updated;
    });
  };

  const handleDelete = () => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[focusedRow] = updated[focusedRow].slice(0, -1);
      return updated;
    });
  };

  const handleCheck = () => {
    const computed: RoundResult[] = questions.map((q, i) => {
      const raw = answers[i];
      const playerAnswer = raw === '' ? null : parseInt(raw, 10);
      const isCorrect = playerAnswer === q.answer;
      return {
        question: {
          operandA: q.operandA,
          operandB: q.operandB,
          operation: 'multiplication' as const,
          answer: q.answer,
          displaySymbol: '×',
        },
        playerAnswer,
        isCorrect,
      };
    });

    const totalScore = computed.filter((r) => r.isCorrect).length;
    setResults(computed);
    setScore(totalScore);
    setTablePhase('results');
  };

  const handlePlayAgain = (_op: Operation) => {
    setAnswers(Array(9).fill(''));
    setFocusedRow(0);
    setTablePhase('input');
    setResults([]);
    setScore(0);
  };

  const hasAnyAnswer = answers.some((a) => a !== '');

  if (tablePhase === 'results') {
    return (
      <RoundSummary
        score={score}
        total={9}
        results={results}
        selectedOperation="multiplication"
        onPlayAgain={handlePlayAgain}
        onHome={onHome}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-300 to-indigo-400">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-5 pb-3">
        <button
          onClick={onHome}
          className="
            flex items-center justify-center
            w-11 h-11 rounded-2xl
            bg-white/30 hover:bg-white/50 active:bg-white/60
            text-white text-xl font-bold
            shadow transition-transform duration-75
            active:translate-y-0.5
            touch-manipulation flex-shrink-0
          "
        >
          ←
        </button>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow">
          {multiplier} × Table
        </h1>
      </div>

      {/* Scrollable table */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {questions.map((q, i) => {
          const isFocused = focusedRow === i;
          const answer = answers[i];
          const displayValue = answer === '' ? '?' : answer;

          return (
            <button
              key={i}
              onClick={() => setFocusedRow(i)}
              className={`
                w-full flex items-center justify-between
                rounded-2xl px-5 py-3
                shadow transition-colors duration-100
                touch-manipulation select-none text-left
                ${isFocused
                  ? 'bg-white border-2 border-indigo-400'
                  : 'bg-white/85 border-2 border-transparent'
                }
              `}
            >
              <span className="text-xl sm:text-2xl font-extrabold text-gray-800">
                {q.operandA}{' '}
                <span className="text-indigo-500">×</span>{' '}
                {q.operandB}{' '}
                <span className="text-gray-400">=</span>
              </span>

              <div
                className={`
                  min-w-[56px] h-12
                  flex items-center justify-center
                  rounded-xl border-2
                  text-xl font-extrabold
                  ml-3
                  ${isFocused
                    ? answer === ''
                      ? 'border-dashed border-indigo-400 bg-indigo-50 text-indigo-300'
                      : 'border-indigo-400 bg-indigo-50 text-indigo-600'
                    : answer === ''
                      ? 'border-dashed border-gray-300 bg-gray-50 text-gray-300'
                      : 'border-gray-300 bg-gray-50 text-gray-700'
                  }
                `}
              >
                {displayValue}
              </div>
            </button>
          );
        })}
      </div>

      {/* NumberPad (digits + delete only) */}
      <NumberPad
        onDigit={handleDigit}
        onDelete={handleDelete}
        onCheck={() => {}}
        phase="playing"
        hasInput={answers[focusedRow] !== ''}
        hideActionButton
      />

      {/* Check button */}
      <div className="w-full max-w-xs sm:max-w-sm mx-auto px-4 pb-6">
        <button
          onClick={handleCheck}
          disabled={!hasAnyAnswer}
          className={`
            w-full h-16 sm:h-20
            rounded-2xl
            text-2xl sm:text-3xl font-extrabold text-white
            shadow-md border-b-4
            transition-transform duration-75
            active:translate-y-1 active:border-b-0
            touch-manipulation
            ${hasAnyAnswer
              ? 'bg-green-500 border-green-700 hover:bg-green-600 active:bg-green-700'
              : 'bg-green-300 border-green-400 cursor-not-allowed opacity-60'
            }
          `}
        >
          ✅ Check
        </button>
      </div>
    </div>
  );
}