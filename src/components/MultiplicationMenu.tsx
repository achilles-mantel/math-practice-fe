import { useState } from 'react';

interface MultiplicationMenuProps {
  onStartPractice: () => void;
  onStartTimesTable: (multiplier: number) => void;
  onBack: () => void;
}

export function MultiplicationMenu({ onStartPractice, onStartTimesTable, onBack }: MultiplicationMenuProps) {
  const [step, setStep] = useState<'menu' | 'picker'>('menu');

  if (step === 'picker') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-300 to-indigo-400 p-6">
        <div className="w-full max-w-md sm:max-w-lg">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setStep('menu')}
              className="
                flex items-center justify-center
                w-12 h-12 rounded-2xl
                bg-white/30 hover:bg-white/50 active:bg-white/60
                text-white text-2xl font-bold
                shadow transition-transform duration-75
                active:translate-y-0.5
                touch-manipulation
              "
            >
              ←
            </button>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow">
              Which times table?
            </h2>
          </div>

          {/* Number grid 1–9 */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <button
                key={n}
                onClick={() => onStartTimesTable(n)}
                className="
                  flex flex-col items-center justify-center
                  bg-yellow-400 border-b-4 border-yellow-600
                  hover:bg-yellow-500 active:bg-yellow-600
                  rounded-2xl
                  h-24 sm:h-28
                  text-white font-extrabold
                  shadow-lg
                  transition-transform duration-100
                  active:translate-y-1 active:border-b-0
                  select-none touch-manipulation
                "
              >
                <span className="text-4xl sm:text-5xl">{n}</span>
                <span className="text-sm sm:text-base mt-1 opacity-90">× table</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-300 to-indigo-400 p-6">
      <div className="w-full max-w-md sm:max-w-lg">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={onBack}
            className="
              flex items-center justify-center
              w-12 h-12 rounded-2xl
              bg-white/30 hover:bg-white/50 active:bg-white/60
              text-white text-2xl font-bold
              shadow transition-transform duration-75
              active:translate-y-0.5
              touch-manipulation
            "
          >
            ←
          </button>
          <div>
            <div className="text-5xl leading-none">✖️</div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg">
            Multiplication
          </h1>
        </div>

        {/* Mode cards */}
        <div className="flex flex-col gap-5">
          {/* Multiplication Practice */}
          <button
            onClick={onStartPractice}
            className="
              flex items-center gap-5
              bg-yellow-400 border-b-4 border-yellow-600
              hover:bg-yellow-500 active:bg-yellow-600
              rounded-2xl p-6 sm:p-7
              text-white
              shadow-lg
              transition-transform duration-100
              active:translate-y-1 active:border-b-0
              select-none touch-manipulation
              text-left w-full
            "
          >
            <span className="text-5xl sm:text-6xl">🎯</span>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold">Multiplication Practice</p>
              <p className="text-base sm:text-lg font-medium opacity-90 mt-1">10 random questions</p>
            </div>
          </button>

          {/* Times Table */}
          <button
            onClick={() => setStep('picker')}
            className="
              flex items-center gap-5
              bg-yellow-400 border-b-4 border-yellow-600
              hover:bg-yellow-500 active:bg-yellow-600
              rounded-2xl p-6 sm:p-7
              text-white
              shadow-lg
              transition-transform duration-100
              active:translate-y-1 active:border-b-0
              select-none touch-manipulation
              text-left w-full
            "
          >
            <span className="text-5xl sm:text-6xl">📋</span>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold">Times Table</p>
              <p className="text-base sm:text-lg font-medium opacity-90 mt-1">Practice a full times table</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}