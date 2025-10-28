import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { View, Text } from 'react-native';

interface OrderStatus {
  status: string;
  etaMinutes: number;
}

export function OrderTrackingScreen() {
  const [status, setStatus] = useState<OrderStatus>({ status: 'Preparing', etaMinutes: 20 });

  useEffect(() => {
    const interval = setInterval(async () => {
      const latest = await API.get('OrdersService', '/orders/status', {});
      setStatus(latest as OrderStatus);
    }, 10_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text>Order Status: {status.status}</Text>
      <Text>ETA: {status.etaMinutes} minutes</Text>
    </View>
  );
}
