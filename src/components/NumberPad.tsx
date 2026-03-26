interface NumberPadProps {
  onDigit: (digit: string) => void;
  onDelete: () => void;
  onCheck: () => void;
  onNext?: () => void;
  phase: 'playing' | 'feedback';
  hasInput: boolean;
  hideActionButton?: boolean;
}

const DIGIT_ROWS = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['0'],
];

export function NumberPad({ onDigit, onDelete, onCheck, onNext, phase, hasInput, hideActionButton = false }: NumberPadProps) {
  const isPlaying = phase === 'playing';

  return (
    <div className="w-full max-w-xs sm:max-w-sm mx-auto px-4 pb-6 select-none">
      <div className="bg-white/20 rounded-3xl p-3 sm:p-4 shadow-inner space-y-2">
        {DIGIT_ROWS.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`flex gap-2 ${row.length === 1 ? 'justify-center' : 'justify-between'}`}
          >
            {row.map((digit) => (
              <button
                key={digit}
                onClick={() => onDigit(digit)}
                disabled={!isPlaying}
                className={`
                  flex-1 h-16 sm:h-20
                  rounded-2xl
                  text-3xl sm:text-4xl font-bold
                  shadow-md border-b-4
                  transition-transform duration-75
                  active:translate-y-1 active:border-b-0
                  touch-manipulation
                  ${isPlaying
                    ? 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50 active:bg-gray-100'
                    : 'bg-white/40 text-gray-400 border-gray-200 cursor-not-allowed'
                  }
                `}
              >
                {digit}
              </button>
            ))}
            {/* Delete button in the "0" row */}
            {row.length === 1 && (
              <button
                onClick={onDelete}
                disabled={!isPlaying}
                className={`
                  flex-1 h-16 sm:h-20
                  rounded-2xl
                  text-3xl sm:text-4xl
                  shadow-md border-b-4
                  transition-transform duration-75
                  active:translate-y-1 active:border-b-0
                  touch-manipulation
                  ${isPlaying
                    ? 'bg-red-100 text-red-500 border-red-200 hover:bg-red-200 active:bg-red-300'
                    : 'bg-white/40 text-gray-400 border-gray-200 cursor-not-allowed'
                  }
                `}
              >
                ⌫
              </button>
            )}
          </div>
        ))}

        {/* Action button: Check or Next */}
        {!hideActionButton && (
          <div className="pt-1">
            {isPlaying ? (
              <button
                onClick={onCheck}
                disabled={!hasInput}
                className={`
                  w-full h-16 sm:h-20
                  rounded-2xl
                  text-2xl sm:text-3xl font-extrabold text-white
                  shadow-md border-b-4
                  transition-transform duration-75
                  active:translate-y-1 active:border-b-0
                  touch-manipulation
                  ${hasInput
                    ? 'bg-green-500 border-green-700 hover:bg-green-600 active:bg-green-700'
                    : 'bg-green-300 border-green-400 cursor-not-allowed opacity-60'
                  }
                `}
              >
                ✅ Check
              </button>
            ) : (
              <button
                onClick={onNext}
                className="
                  w-full h-16 sm:h-20
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
        )}
      </div>
    </div>
  );
}