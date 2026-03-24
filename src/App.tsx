import { useGameLogic } from './hooks/useGameLogic';
import { StartScreen } from './components/StartScreen';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { FeedbackDisplay } from './components/FeedbackDisplay';
import { NumberPad } from './components/NumberPad';
import { RoundSummary } from './components/RoundSummary';
import type { Operation } from './types/game.types';

function App() {
  const { state, startGame, appendDigit, deleteDigit, checkAnswer, nextQuestion, resetGame } =
    useGameLogic();

  const { phase, currentQuestion, currentQuestionIndex, currentInput, results, score, totalQuestions, selectedOperation } =
    state;

  // Start screen
  if (phase === 'start') {
    return <StartScreen onStart={startGame} />;
  }

  // Round summary
  if (phase === 'summary') {
    return (
      <RoundSummary
        score={score}
        total={totalQuestions}
        results={results}
        selectedOperation={selectedOperation}
        onPlayAgain={(op: Operation) => startGame(op)}
        onHome={resetGame}
      />
    );
  }

  // Playing or feedback
  if (!currentQuestion) return null;

  const lastResult = results[results.length - 1];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-300 to-indigo-400">
      <ProgressBar
        current={currentQuestionIndex + 1}
        total={totalQuestions}
        score={score}
      />

      <div className="flex flex-col items-center justify-center flex-1 gap-4 py-4">
        <QuestionCard
          question={currentQuestion}
          currentInput={currentInput}
          isAnswered={phase === 'feedback'}
        />

        {phase === 'feedback' && lastResult && (
          <FeedbackDisplay
            isCorrect={lastResult.isCorrect}
            correctAnswer={currentQuestion.answer}
            playerAnswer={lastResult.playerAnswer}
          />
        )}
      </div>

      <NumberPad
        onDigit={appendDigit}
        onDelete={deleteDigit}
        onCheck={checkAnswer}
        onNext={nextQuestion}
        phase={phase}
        hasInput={currentInput.length > 0}
      />
    </div>
  );
}

export default App;