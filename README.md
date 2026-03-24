# math-practice-fe

A TypeScript + React math practice app for children aged 7–10. Covers single-digit addition, subtraction, multiplication and division with immediate answer feedback, a 10-question round format, and an on-screen number pad (no keyboard required — tablet-friendly).

**Live:** https://achilles-mantel.github.io/math-practice-fe/

---

## Tech Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [gh-pages](https://github.com/tschaub/gh-pages) for GitHub Pages deployment

---

## Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:achilles-mantel/math-practice-fe.git
cd math-practice-fe
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Or on a specific port:

```bash
npm run dev -- --port 5173
```

The app will be available at http://localhost:5173/math-practice-fe/

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server (hot-reload) |
| `npm run dev -- --port 5173` | Start dev server on a specific port |
| `npm run build` | Type-check with `tsc` then build production bundle into `dist/` |
| `npm run preview` | Serve the production build locally for final check |
| `npm run deploy` | Build and deploy to GitHub Pages (`gh-pages` branch) |
| `npm run lint` | Run ESLint across all `.ts`/`.tsx` files |

---

## Build & Deploy

### Production build

```bash
npm run build
```

Output goes to `dist/`. The base URL is set to `/math-practice-fe/` in `vite.config.ts` for correct GitHub Pages asset paths.

### Deploy to GitHub Pages

```bash
npm run deploy
```

This runs `npm run build && gh-pages -d dist`, which pushes the `dist/` folder to the `gh-pages` branch of the repository. GitHub Pages serves from that branch.

---

## Project Structure

```
math-practice-fe/
├── public/
├── src/
│   ├── components/
│   │   ├── StartScreen.tsx       # Operation picker (+ − × ÷ Mixed)
│   │   ├── QuestionCard.tsx      # Displays question with answer slot
│   │   ├── NumberPad.tsx         # On-screen number-only input pad
│   │   ├── FeedbackDisplay.tsx   # Correct/wrong feedback with emoji
│   │   ├── ProgressBar.tsx       # Q1/10 progress indicator + score
│   │   └── RoundSummary.tsx      # End-of-round score + question review
│   ├── hooks/
│   │   └── useGameLogic.ts       # Central game state machine
│   ├── utils/
│   │   └── questionGenerator.ts  # Generates valid single-digit questions
│   ├── types/
│   │   └── game.types.ts         # Shared TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── memory-bank/                  # Project documentation (Cline memory bank)
├── index.html
├── package.json
├── vite.config.ts                # base: '/math-practice-fe/'
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── tsconfig.node.json
```

---

## Command History (initial setup)

The following commands were used to set up and verify this project from scratch:

```bash
# Install all npm dependencies (after files were manually scaffolded)
npm install

# Verify TypeScript compiles and Vite production build succeeds
npm run build

# Start the development server on port 5173 to test locally
npm run dev -- --port 5173
```

> **Note:** This project was scaffolded manually (no `npm create vite` wizard) so that all configuration files could be version-controlled from the start with the correct GitHub Pages base path and Tailwind CSS setup already in place.