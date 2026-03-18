import { render, screen } from '@testing-library/react';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import { describe, it, expect } from 'vitest';
import { ViewModeProvider } from '../context/ViewModeContext';
import type { Project } from '../data/projects';

// Mock context hook if needed, or wrap in provider. Wrapping is better.

const mockProject: Project = {
  id: 'test',
  title: 'Test Project',
  summary: 'A test project description.',
  tags: ['React', 'Test'],
  link: 'http://example.com'
};

const renderWithContext = (ui: React.ReactElement) => {
  return render(
    <ViewModeProvider>
      {ui}
    </ViewModeProvider>
  );
};

describe('ProjectCard', () => {
  it('renders project title and summary', () => {
    renderWithContext(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project description.')).toBeInTheDocument();
  });

  it('renders tags', () => {
    renderWithContext(<ProjectCard project={mockProject} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('renders link with correct attributes', () => {
    renderWithContext(<ProjectCard project={mockProject} />);
    const link = screen.getByRole('link', { name: /PLAY|EXECUTE/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'http://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
