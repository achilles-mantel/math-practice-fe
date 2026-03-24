interface ProgressBarProps {
  current: number; // 1-based current question number
  total: number;
  score: number;
}

export function ProgressBar({ current, total, score }: ProgressBarProps) {
  const progressPercent = ((current - 1) / total) * 100;

  return (
    <div className="w-full max-w-lg mx-auto px-4 pt-4 pb-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-base sm:text-lg font-bold text-white/90">
          Question {current} of {total}
        </span>
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