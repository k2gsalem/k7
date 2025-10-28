import { useEffect, useState } from 'react';
import { generateAnalyticsMock } from '../../providers/mocks/analytics';

export interface AnalyticsPoint {
  label: string;
  value: number;
}

interface AnalyticsState {
  salesTrend: AnalyticsPoint[];
  orderDistribution: AnalyticsPoint[];
}

export function useAnalytics(): AnalyticsState {
  const [state, setState] = useState<AnalyticsState>({ salesTrend: [], orderDistribution: [] });

  useEffect(() => {
    const subscription = generateAnalyticsMock().subscribe(setState);
    return () => subscription.unsubscribe();
  }, []);

  return state;
}
