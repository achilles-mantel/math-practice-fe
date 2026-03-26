import { useState } from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import { StartScreen } from './components/StartScreen';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { FeedbackDisplay } from './components/FeedbackDisplay';
import { NumberPad } from './components/NumberPad';
import { RoundSummary } from './components/RoundSummary';
import { MultiplicationMenu } from './components/MultiplicationMenu';
import { MultiplicationTable } from './components/MultiplicationTable';
import type { Operation } from './types/game.types';

type AppScreen = 'main' | 'multiplication-menu' | 'times-table';

function App() {
  const [appScreen, setAppScreen] = useState<AppScreen>('main');
  const [timesTableNumber, setTimesTableNumber] = useState(2);

  const { state, startGame, appendDigit, deleteDigit, checkAnswer, nextQuestion, resetGame } =
    useGameLogic();

  const { phase, currentQuestion, currentQuestionIndex, currentInput, results, score, totalQuestions, selectedOperation } =
    state;

  // Start screen
  if (phase === 'start') {
    if (appScreen === 'multiplication-menu') {
      return (
        <MultiplicationMenu
          onStartPractice={() => {
            startGame('multiplication');
            setAppScreen('main');
          }}
          onStartTimesTable={(n) => {
            setTimesTableNumber(n);
            setAppScreen('times-table');
          }}
          onBack={() => setAppScreen('main')}
        />
      );
    }

    if (appScreen === 'times-table') {
      return (
        <MultiplicationTable
          multiplier={timesTableNumber}
          onHome={() => setAppScreen('multiplication-menu')}
        />
      );
    }

    return (
      <StartScreen
        onStart={(op: Operation) => {
          if (op === 'multiplication') {
            setAppScreen('multiplication-menu');
          } else {
            startGame(op);
          }
        }}
      />
    );
  }

  // Round summary
  if (phase === 'summary') {
    return (
      <RoundSummary
        score={score}
        total={totalQuestions}
        results={results}
        selectedOperation={selectedOperation}
        onPlayAgain={(op: Operation) => {
          resetGame();
          setAppScreen('main');
          startGame(op);
        }}
        onHome={() => {
          resetGame();
          setAppScreen('main');
        }}
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
        onHome={() => {
          resetGame();
          setAppScreen(selectedOperation === 'multiplication' ? 'multiplication-menu' : 'main');
        }}
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