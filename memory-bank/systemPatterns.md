# System Patterns

## Architecture
Fully client-side single-page React application. No backend, no API calls.

## State Machine
The game follows a simple phase-based state machine:

```
start → playing → feedback → playing → ... → summary → start
```

Phases:
- `start`: StartScreen shown, user selects operation
- `playing`: QuestionCard + NumberPad shown, digits can be entered
- `feedback`: FeedbackDisplay shown, NumberPad shows "Next →" button
- `summary`: RoundSummary shown after 10 questions

## Component Hierarchy
```
App.tsx
├── StartScreen          (phase: start)
├── [phase: playing/feedback]
│   ├── ProgressBar
│   ├── QuestionCard
│   ├── FeedbackDisplay  (phase: feedback only)
│   └── NumberPad
└── RoundSummary         (phase: summary)
```

## Custom Hook: useGameLogic
Central state management hook. Manages:
- Game phase transitions
- Question bank (pre-generated at round start)
- Current input string
- Results array
- Score

## Question Generation
- Questions pre-generated at round start via `generateRound(operation, 10)`
- Division: `quotient × divisor` first → ensures whole number answers
- Subtraction: `a ≥ b` → no negative results
- Addition/Multiplication: any single-digit operands (0–9)

## Input Rules
- Max 2 digits (max answer = 81 for 9×9)
- Leading zeros blocked
- Only digits 0–9 from on-screen pad (no keyboard input path)