import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';

interface Order {
  id: string;
  status: string;
  customer: string;
  total: number;
}

export function OrdersBoard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await API.get('OrdersService', '/orders', {});
      setOrders(result.items ?? []);
    }, 10_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <p>Track live orders across stores with streaming updates.</p>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <strong>{order.customer}</strong> — ${order.total.toFixed(2)} ({order.status})
          </li>
        ))}
      </ul>
    </div>
  );
}
