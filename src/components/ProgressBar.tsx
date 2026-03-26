interface ProgressBarProps {
  current: number; // 1-based current question number
  total: number;
  score: number;
  onHome?: () => void;
}

export function ProgressBar({ current, total, score, onHome }: ProgressBarProps) {
  const progressPercent = ((current - 1) / total) * 100;

  return (
    <div className="w-full max-w-lg mx-auto px-4 pt-4 pb-2">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {onHome && (
            <button
              onClick={onHome}
              className="
                flex items-center justify-center
                w-9 h-9 rounded-xl
                bg-white/30 hover:bg-white/50 active:bg-white/60
                text-white text-lg font-bold
                shadow transition-transform duration-75
                active:translate-y-0.5
                touch-manipulation
              "
            >
              ←
            </button>
          )}
          <span className="text-base sm:text-lg font-bold text-white/90">
            Question {current} of {total}
          </span>
        </div>
        <span className="text-base sm:text-lg font-bold text-white/90">
          ⭐ {score}
        </span>
      </div>
      <div className="w-full bg-white/30 rounded-full h-4 overflow-hidden shadow-inner">
        <div
          className="bg-yellow-300 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}