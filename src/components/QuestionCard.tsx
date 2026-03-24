import type { Question } from '../types/game.types';

interface QuestionCardProps {
  question: Question;
  currentInput: string;
  isAnswered: boolean;
}

export function QuestionCard({ question, currentInput, isAnswered }: QuestionCardProps) {
  const displayValue = currentInput === '' ? '?' : currentInput;

  return (
    <div className="flex flex-col items-center w-full max-w-sm sm:max-w-md mx-auto px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 w-full text-center">
        <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
          <span className="text-5xl sm:text-6xl font-extrabold text-gray-800">
            {question.operandA}
          </span>
          <span className="text-5xl sm:text-6xl font-extrabold text-indigo-500">
            {question.displaySymbol}
          </span>
          <span className="text-5xl sm:text-6xl font-extrabold text-gray-800">
            {question.operandB}
          </span>
          <span className="text-5xl sm:text-6xl font-extrabold text-gray-400">=</span>
          <div
            className={`
              min-w-[80px] sm:min-w-[96px] h-[72px] sm:h-[84px]
              flex items-center justify-center
              rounded-2xl border-4
              text-5xl sm:text-6xl font-extrabold
              transition-colors duration-200
              ${isAnswered
                ? 'border-gray-300 bg-gray-100 text-gray-500'
                : currentInput === ''
                  ? 'border-dashed border-indigo-300 bg-indigo-50 text-indigo-300'
                  : 'border-indigo-400 bg-indigo-50 text-indigo-600'
              }
            `}
          >
            {displayValue}
          </div>
        </div>
      </div>
    </div>
  );
}