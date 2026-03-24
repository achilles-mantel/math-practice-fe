import type { RoundResult, Operation } from '../types/game.types';

interface RoundSummaryProps {
  score: number;
  total: number;
  results: RoundResult[];
  selectedOperation: Operation;
  onPlayAgain: (operation: Operation) => void;
  onHome: () => void;
}

const OPERATION_LABELS: Record<Operation, string> = {
  addition: 'Addition',
  subtraction: 'Subtraction',
  multiplication: 'Multiplication',
  division: 'Division',
  mixed: 'Mixed',
};

function getScoreEmoji(score: number, total: number): string {
  const pct = score / total;
  if (pct === 1) return '🏆';
  if (pct >= 0.8) return '🌟';
  if (pct >= 0.6) return '😊';
  if (pct >= 0.4) return '🙂';
  return '💪';
}

function getScoreMessage(score: number, total: number): string {
  const pct = score / total;
  if (pct === 1) return 'Perfect Score!';
  if (pct >= 0.8) return 'Amazing work!';
  if (pct >= 0.6) return 'Good job!';
  if (pct >= 0.4) return 'Keep practicing!';
  return "You'll get it next time!";
}

export function RoundSummary({
  score,
  total,
  results,
  selectedOperation,
  onPlayAgain,
  onHome,
}: RoundSummaryProps) {
  const emoji = getScoreEmoji(score, total);
  const message = getScoreMessage(score, total);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-sky-300 to-indigo-400 p-4 pb-8 overflow-y-auto">
      <div className="w-full max-w-lg mx-auto pt-6">
        {/* Score card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 text-center mb-4 animate-bounce-in">
          <div className="text-7xl sm:text-8xl mb-3">{emoji}</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-1">
            {message}
          </h2>
          <p className="text-5xl sm:text-6xl font-extrabold text-indigo-600 my-3">
            {score} / {total}
          </p>
          <p className="text-lg text-gray-500 font-medium">
            {OPERATION_LABELS[selectedOperation]}
          </p>
        </div>

        {/* Review */}
        <div className="bg-white/90 rounded-3xl shadow-lg p-4 sm:p-6 mb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-3">Review</h3>
          <div className="space-y-2">
            {results.map((result, idx) => {
              const { question, playerAnswer, isCorrect } = result;
              return (
                <div
                  key={idx}
                  className={`
                    flex items-center justify-between
                    rounded-xl px-4 py-3
                    ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}
                  `}
                >
                  <span className="text-lg sm:text-xl font-bold text-gray-700">
                    {question.operandA} {question.displaySymbol} {question.operandB} ={' '}
                    <span className={isCorrect ? 'text-green-600' : 'text-red-500'}>
                      {question.answer}
                    </span>
                  </span>
                  <div className="flex items-center gap-2">
                    {!isCorrect && (
                      <span className="text-sm text-gray-400 line-through">
                        {playerAnswer}
                      </span>
                    )}
                    <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => onPlayAgain(selectedOperation)}
            className="
              w-full h-16 sm:h-20
              rounded-2xl
              text-2xl sm:text-3xl font-extrabold text-white
              bg-green-500 border-b-4 border-green-700
              hover:bg-green-600 active:bg-green-700
              shadow-lg
              transition-transform duration-75
              active:translate-y-1 active:border-b-0
              touch-manipulation
            "
          >
            🔄 Play Again
          </button>
          <button
            onClick={onHome}
            className="
              w-full h-16 sm:h-20
              rounded-2xl
              text-2xl sm:text-3xl font-extrabold text-white
              bg-indigo-500 border-b-4 border-indigo-700
              hover:bg-indigo-600 active:bg-indigo-700
              shadow-lg
              transition-transform duration-75
              active:translate-y-1 active:border-b-0
              touch-manipulation
            "
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}