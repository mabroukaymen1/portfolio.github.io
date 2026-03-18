import { render, screen, fireEvent } from '@testing-library/react';
import TerminalPanel from '../components/TerminalPanel/TerminalPanel';
import { describe, it, expect, vi } from 'vitest';

// Mock clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockImplementation(() => Promise.resolve()),
  },
});

window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('TerminalPanel', () => {
  it('renders terminal container', () => {
    render(<TerminalPanel />);
    const terminal = screen.getByLabelText(/Terminal Output/i);
    expect(terminal).toBeInTheDocument();
  });

  it('displays typing content eventually', async () => {
    render(<TerminalPanel />);
    // Since we can't easily wait for timeout based typing in exact time without fake timers, 
    // we can check if the skip button works to show all text.
    const skipButton = screen.getByText(/SKIP/i);
    fireEvent.click(skipButton);
    
    expect(await screen.findByText(/ACCESS GRANTED/i)).toBeInTheDocument();
  });

  it('allows copying content', () => {
    render(<TerminalPanel />);
    const copyButton = screen.getByText(/COPY_LOG/i);
    fireEvent.click(copyButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
