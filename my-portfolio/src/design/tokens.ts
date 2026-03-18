export const tokens = {
  colors: {
    terminal: {
      bg: 'var(--terminal-bg)', // #04130A
      text: 'var(--terminal-text)', // #7CFC7C
      dim: 'rgba(124, 252, 124, 0.5)',
      highlight: 'rgba(124, 252, 124, 0.2)',
    },
    arcade: {
      bg: 'var(--arcade-bg)', // #F6ECD7
      card: '#FFFFFF',
      text: '#4B5563', // Gray-600
      primary: 'var(--accent-purple)', // #9573C8
      secondary: 'var(--accent-gold)', // #E6B94F
      accent: '#EF4444', // Red-500 for hearts/errors
    },
    common: {
      black: '#000000',
      white: '#FFFFFF',
      muted: 'var(--muted)', // #6B7280
    }
  },
  fonts: {
    arcade: '"Inter", system-ui, sans-serif',
    terminal: '"IBM Plex Mono", "Share Tech Mono", monospace',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    div: '4rem', // Section divider
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
  },
  transitions: {
    fast: '0.2s ease-in-out',
    med: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
  }
};
