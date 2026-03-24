import type { Operation } from '../types/game.types';

interface OperationOption {
  value: Operation;
  label: string;
  emoji: string;
  colorClass: string;
  hoverClass: string;
}

const OPTIONS: OperationOption[] = [
  {
    value: 'addition',
    label: 'Addition',
    emoji: '➕',
    colorClass: 'bg-green-400 border-green-500',
    hoverClass: 'hover:bg-green-500 active:bg-green-600',
  },
  {
    value: 'subtraction',
    label: 'Subtraction',
    emoji: '➖',
    colorClass: 'bg-blue-400 border-blue-500',
    hoverClass: 'hover:bg-blue-500 active:bg-blue-600',
  },
  {
    value: 'multiplication',
    label: 'Multiplication',
    emoji: '✖️',
    colorClass: 'bg-yellow-400 border-yellow-500',
    hoverClass: 'hover:bg-yellow-500 active:bg-yellow-600',
  },
  {
    value: 'division',
    label: 'Division',
    emoji: '➗',
    colorClass: 'bg-purple-400 border-purple-500',
    hoverClass: 'hover:bg-purple-500 active:bg-purple-600',
  },
  {
    value: 'mixed',
    label: 'Mixed',
    emoji: '🎲',
    colorClass: 'bg-orange-400 border-orange-500',
    hoverClass: 'hover:bg-orange-500 active:bg-orange-600',
  },
];

interface StartScreenProps {
  onStart: (operation: Operation) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-300 to-indigo-400 p-6">
      <div className="text-center mb-8 animate-bounce-in">
        <div className="text-7xl mb-3">🧮</div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg mb-2">
          Math Practice
        </h1>
        <p className="text-xl sm:text-2xl text-white/90 font-medium">
          Pick a topic to start!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md sm:max-w-lg">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onStart(opt.value)}
            className={`
              flex flex-col items-center justify-center
              ${opt.colorClass} ${opt.hoverClass}
              border-b-4 rounded-2xl
              p-5 sm:p-6
              text-white font-bold
              text-lg sm:text-xl
              shadow-lg
              transition-transform duration-100
              active:translate-y-1 active:border-b-0
              select-none touch-manipulation
              ${opt.value === 'mixed' ? 'col-span-2' : ''}
            `}
          >
            <span className="text-4xl sm:text-5xl mb-2">{opt.emoji}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      <p className="mt-8 text-white/80 text-base sm:text-lg font-medium">
        10 questions per round
      </p>
    </div>
  );
}