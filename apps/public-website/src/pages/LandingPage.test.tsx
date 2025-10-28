import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LandingPage } from './LandingPage';

describe('LandingPage', () => {
  it('renders hero section', () => {
    render(<LandingPage />);
    expect(screen.getByText(/Delicious meals/)).toBeInTheDocument();
  });
});
