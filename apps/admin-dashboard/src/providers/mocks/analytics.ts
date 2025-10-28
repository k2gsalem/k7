import { Observable } from 'rxjs';
import type { AnalyticsPoint } from '../../modules/hooks/useAnalytics';

interface AnalyticsState {
  salesTrend: AnalyticsPoint[];
  orderDistribution: AnalyticsPoint[];
}

export function generateAnalyticsMock() {
  return new Observable<AnalyticsState>((subscriber) => {
    const interval = setInterval(() => {
      const salesTrend = Array.from({ length: 7 }).map((_, index) => ({
        label: `Day ${index + 1}`,
        value: Math.floor(Math.random() * 7000) + 3000
      }));

      const orderDistribution = [
        { label: 'Delivery', value: Math.floor(Math.random() * 1000) + 200 },
        { label: 'Pickup', value: Math.floor(Math.random() * 800) + 100 },
        { label: 'Dine-in', value: Math.floor(Math.random() * 500) + 50 },
        { label: 'Scheduled', value: Math.floor(Math.random() * 200) + 20 }
      ];

      subscriber.next({ salesTrend, orderDistribution });
    }, 5_000);

    subscriber.next({
      salesTrend: Array.from({ length: 7 }).map((_, index) => ({
        label: `Day ${index + 1}`,
        value: Math.floor(Math.random() * 7000) + 3000
      })),
      orderDistribution: [
        { label: 'Delivery', value: 800 },
        { label: 'Pickup', value: 420 },
        { label: 'Dine-in', value: 270 },
        { label: 'Scheduled', value: 130 }
      ]
    });

    return () => clearInterval(interval);
  });
}
