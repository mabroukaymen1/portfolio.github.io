# Portfolio (React + Vite)

A dual-mode (Arcade / Terminal) portfolio application built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features
- **Arcade Mode**: Playful, high-fidelity pixel aesthetic with spring animations.
- **Terminal Mode**: Monospaced, CRT-styled interface with typing effects and keyboard navigation.
- **Mixed Mode**: Best of both worlds (Split screen).
- **Theming**: Dark/Light mode support (persisted).
- **Accessibility**: Reduced motion support, aria-live regions, keyboard navigable.

## Tech Stack
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run development server:**
    ```bash
    npm run dev
    ```

3.  **Run tests:**
    ```bash
    npm test
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## Project Structure
- `src/components`: UI Components broken down by feature.
- `src/design`: Design tokens and centralized motion presets.
- `src/context`: React Contexts (Theme, ViewMode).
- `src/hooks`: Custom hooks (`useTypingEffect`, `usePrefersReducedMotion`).
- `src/pages`: Route components.
- `src/data`: Static content data.

## Deployment
Deploy the `dist/` folder to any static host (GitHub Pages, Vercel, Netlify).
