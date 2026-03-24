interface FeedbackDisplayProps {
  isCorrect: boolean;
  correctAnswer: number;
  playerAnswer: number | null;
}

export function FeedbackDisplay({ isCorrect, correctAnswer, playerAnswer }: FeedbackDisplayProps) {
  if (isCorrect) {
    return (
      <div className="animate-bounce-in flex flex-col items-center gap-2 py-4">
        <div className="text-6xl sm:text-7xl">🎉</div>
        <p className="text-2xl sm:text-3xl font-extrabold text-green-600">
          Correct! Well done!
        </p>
      </div>
    );
  }

  return (
    <div className="animate-shake flex flex-col items-center gap-2 py-4">
      <div className="text-6xl sm:text-7xl">😅</div>
      <p className="text-2xl sm:text-3xl font-extrabold text-red-500">
        Not quite!
      </p>
      <p className="text-lg sm:text-xl font-semibold text-gray-600">
        You answered{' '}
        <span className="text-red-500 font-bold">{playerAnswer}</span>
        {', '}the answer is{' '}
        <span className="text-green-600 font-bold">{correctAnswer}</span>
      </p>
    </div>
  );
}