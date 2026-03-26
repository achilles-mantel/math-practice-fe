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
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [tablePhase, setTablePhase] = useState<TablePhase>('input');
  const [results, setResults] = useState<RoundResult[]>([]);
  const [score, setScore] = useState(0);

  const allFilled = answers.every((a) => a !== '');

  const handleDigit = (digit: string) => {
    if (activeRow === null) return;
    setAnswers((prev) => {
      const current = prev[activeRow];
      if (current.length >= 2) return prev;
      if (current === '0' && digit === '0') return prev;
      const updated = [...prev];
      updated[activeRow] = current + digit;
      return updated;
    });
  };

  const handleDelete = () => {
    if (activeRow === null) return;
    setAnswers((prev) => {
      const updated = [...prev];
      updated[activeRow] = updated[activeRow].slice(0, -1);
      return updated;
    });
  };

  const handleNext = () => {
    if (activeRow === null) return;
    // Find the next unanswered row, searching forward from current position
    let nextRow = (activeRow + 1) % 9;
    for (let offset = 1; offset <= 9; offset++) {
      const candidate = (activeRow + offset) % 9;
      if (answers[candidate] === '') {
        nextRow = candidate;
        break;
      }
    }
    setActiveRow(nextRow);
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
    setActiveRow(null);
    setTablePhase('results');
  };

  const handlePlayAgain = (_op: Operation) => {
    setAnswers(Array(9).fill(''));
    setActiveRow(null);
    setTablePhase('input');
    setResults([]);
    setScore(0);
  };

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

  const activeAnswer = activeRow !== null ? answers[activeRow] : '';
  const activeQuestion = activeRow !== null ? questions[activeRow] : null;

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

      {/* Table rows */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {questions.map((q, i) => {
          const answer = answers[i];
          const displayValue = answer === '' ? '?' : answer;

          return (
            <button
              key={i}
              onClick={() => setActiveRow(i)}
              className="
                w-full flex items-center justify-between
                rounded-2xl px-5 py-3
                bg-white/85 border-2 border-transparent
                shadow transition-colors duration-100
                touch-manipulation select-none text-left
                hover:bg-white/95
              "
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
                  ${answer === ''
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

      {/* Modal overlay */}
      {activeRow !== null && activeQuestion !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setActiveRow(null)}
        >
          {/* Modal content — stop propagation so tapping inside doesn't close */}
          <div
            className="w-full bg-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Highlighted question card */}
            <div className="mx-4 mb-3">
              <div className="
                flex items-center justify-between
                rounded-2xl px-5 py-4
                bg-white border-2 border-indigo-400
                shadow-2xl
              ">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                  {activeQuestion.operandA}{' '}
                  <span className="text-indigo-500">×</span>{' '}
                  {activeQuestion.operandB}{' '}
                  <span className="text-gray-400">=</span>
                </span>

                <div className={`
                  min-w-[64px] h-14
                  flex items-center justify-center
                  rounded-xl border-2
                  text-2xl font-extrabold
                  ml-3
                  ${activeAnswer === ''
                    ? 'border-dashed border-indigo-400 bg-indigo-50 text-indigo-300'
                    : 'border-indigo-400 bg-indigo-50 text-indigo-600'
                  }
                `}>
                  {activeAnswer === '' ? '?' : activeAnswer}
                </div>
              </div>
            </div>

            {/* NumberPad — digits + delete only */}
            <div className="bg-white/10 pt-3 pb-0 rounded-t-3xl">
              <NumberPad
                onDigit={handleDigit}
                onDelete={handleDelete}
                onCheck={() => {}}
                phase="playing"
                hasInput={activeAnswer !== ''}
                hideActionButton
              />

              {/* Action buttons row */}
              <div className="w-full max-w-xs sm:max-w-sm mx-auto px-4 pb-6 flex gap-3">
                {/* Close button */}
                <button
                  onClick={() => setActiveRow(null)}
                  className="
                    h-16 sm:h-20 px-5
                    rounded-2xl
                    text-2xl sm:text-3xl font-extrabold text-white
                    bg-gray-500 border-b-4 border-gray-700
                    hover:bg-gray-600 active:bg-gray-700
                    shadow-md
                    transition-transform duration-75
                    active:translate-y-1 active:border-b-0
                    touch-manipulation flex-shrink-0
                  "
                >
                  ✕
                </button>

                {/* Next or Check */}
                {allFilled ? (
                  <button
                    onClick={handleCheck}
                    className="
                      flex-1 h-16 sm:h-20
                      rounded-2xl
                      text-2xl sm:text-3xl font-extrabold text-white
                      bg-green-500 border-b-4 border-green-700
                      hover:bg-green-600 active:bg-green-700
                      shadow-md
                      transition-transform duration-75
                      active:translate-y-1 active:border-b-0
                      touch-manipulation
                    "
                  >
                    ✅ Check
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="
                      flex-1 h-16 sm:h-20
                      rounded-2xl
                      text-2xl sm:text-3xl font-extrabold text-white
                      bg-indigo-500 border-b-4 border-indigo-700
                      hover:bg-indigo-600 active:bg-indigo-700
                      shadow-md
                      transition-transform duration-75
                      active:translate-y-1 active:border-b-0
                      touch-manipulation
                    "
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}