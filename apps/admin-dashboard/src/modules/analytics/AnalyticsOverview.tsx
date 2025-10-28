import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useMemo } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

ChartJS.register(ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export function AnalyticsOverview() {
  const { salesTrend, orderDistribution } = useAnalytics();

  const salesData = useMemo(
    () => ({
      labels: salesTrend.map((point) => point.label),
      datasets: [
        {
          label: 'Revenue',
          data: salesTrend.map((point) => point.value),
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.2)'
        }
      ]
    }),
    [salesTrend]
  );

  const ordersData = useMemo(
    () => ({
      labels: orderDistribution.map((point) => point.label),
      datasets: [
        {
          label: 'Orders',
          data: orderDistribution.map((point) => point.value),
          backgroundColor: ['#22c55e', '#eab308', '#f97316', '#ef4444']
        }
      ]
    }),
    [orderDistribution]
  );

  return (
    <div className="grid">
      <section>
        <h2>Sales Trend</h2>
        <Line data={salesData} />
      </section>
      <section>
        <h2>Order Mix</h2>
        <Pie data={ordersData} />
      </section>
    </div>
  );
}
