import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

vi.mock('./modules/security/RequireRole', () => ({
  RequireRole: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

vi.mock('./modules/analytics/AnalyticsOverview', () => ({
  AnalyticsOverview: () => <div>Analytics Module</div>
}));

vi.mock('./components/layout/AppLayout', () => ({
  AppLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('App routing', () => {
  it('renders analytics route by default', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText('Analytics Module')).toBeInTheDocument();
  });
});
