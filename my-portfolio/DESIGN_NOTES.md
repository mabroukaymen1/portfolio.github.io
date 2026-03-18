# Design Notes

## Fonts
- **Arcade Mode**: `Inter` (Sans-serif) - Clean, readable, serves as a modern contrast to the pixel art elements.
- **Terminal Mode**: `IBM Plex Mono` / `Share Tech Mono` - Authentic terminal feel.

## Color Palette
### Termminal
- Background: `#04130A` (Deep Green/Black)
- Text: `#7CFC7C` (Phosphor Green)

### Arcade
- Background: `#F6ECD7` (Warm Cream)
- Primary Accent: `#9573C8` (Purple)
- Secondary Accent: `#E6B94F` (Gold/Coin)

## Motion System (`src/design/motion.ts`)
Animations are centralized and mode-aware.
- **Terminal**: Linear, fast, step-based easings. No bounce.
- **Arcade**: Spring-based, bouncy, playful. Scale/Lift on hover.
- **Reduced Motion**: All animations default to simple opacity fades or instant states.

## CRT Effect
The CRT overlay is implemented via CSS in `src/components/TerminalPanel/terminal.css` using `linear-gradient` and `box-shadow` to minimize performance impact compared to Canvas-based shaders.
