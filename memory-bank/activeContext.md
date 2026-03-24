# Active Context

## Current Status
**MVP complete and verified.** All source files created, dependencies installed, build passes, local dev tested.

## Next Steps
1. Run `npm run deploy` to publish to GitHub Pages when ready

## Recent Changes
- Created full project from scratch:
  - Vite + React + TypeScript configuration
  - Tailwind CSS setup
  - All game components
  - useGameLogic hook
  - Question generator utility
  - Memory bank documentation

## Active Decisions
- Using on-screen NumberPad instead of native HTML input to ensure number-only entry on tablets
- Questions pre-generated at round start (not lazily) to avoid repeat questions mid-round
- Division always produces whole-number answers by generating `quotient × divisor` first
- Tailwind CSS for rapid responsive styling without separate CSS files
- `gh-pages` npm package (not GitHub Actions) for simple deployment

## Known Issues / Watch Points
- Google Fonts requires internet connection; offline fallback is system-ui sans-serif
- Division can produce large dividends (e.g., 81÷9) which is still single-digit division context