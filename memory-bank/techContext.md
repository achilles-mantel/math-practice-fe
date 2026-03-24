# Tech Context

## Technologies
- **React 18** — UI framework
- **TypeScript 5** — type safety
- **Vite 5** — build tool and dev server
- **Tailwind CSS 3** — utility-first CSS styling
- **gh-pages** — GitHub Pages deployment

## Dev Setup
```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:5173
npm run build     # type-check + production build
npm run deploy    # build + push to gh-pages branch
```

## GitHub Pages Config
- `vite.config.ts`: `base: '/math-practice-fe/'`
- Deploy branch: `gh-pages` (created by gh-pages package)
- Live URL: https://achilles-mantel.github.io/math-practice-fe/

## Key Files
| File | Purpose |
|------|---------|
| `src/types/game.types.ts` | Shared TypeScript interfaces |
| `src/utils/questionGenerator.ts` | Question generation logic |
| `src/hooks/useGameLogic.ts` | Central game state hook |
| `src/components/StartScreen.tsx` | Operation picker |
| `src/components/QuestionCard.tsx` | Displays question + answer slot |
| `src/components/NumberPad.tsx` | On-screen numeric input |
| `src/components/FeedbackDisplay.tsx` | Correct/wrong feedback |
| `src/components/ProgressBar.tsx` | Q1/10 progress + score |
| `src/components/RoundSummary.tsx` | End-of-round score + review |

## Fonts
- Nunito from Google Fonts (child-friendly, rounded)

## Browser Compatibility
- Modern mobile/tablet browsers (Safari iOS, Chrome Android)
- `meta viewport` set with `user-scalable=no` to prevent zoom on double-tap