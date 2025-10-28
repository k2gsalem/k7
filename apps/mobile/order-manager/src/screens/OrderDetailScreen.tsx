import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { View, Text, Button } from 'react-native';

interface OrderDetail {
  id: string;
  status: string;
  items: { name: string; quantity: number }[];
}

type OrderRoute = RouteProp<{ OrderDetail: { orderId: string } }, 'OrderDetail'>;

export function OrderDetailScreen() {
  const route = useRoute<OrderRoute>();
  const [order, setOrder] = useState<OrderDetail | null>(null);

  useEffect(() => {
    async function loadOrder() {
      const result = await API.get('OrdersService', `/orders/${route.params.orderId}`, {});
      setOrder(result as OrderDetail);
    }
    loadOrder().catch(console.error);
  }, [route.params.orderId]);

  async function updateStatus(status: string) {
    await API.patch('OrdersService', `/orders/${route.params.orderId}`, {
      body: { status }
    });
    setOrder((current) => (current ? { ...current, status } : current));
  }

  if (!order) {
    return <Text>Loading order...</Text>;
  }

  return (
    <View>
      <Text>Status: {order.status}</Text>
      {order.items.map((item) => (
        <Text key={item.name}>
          {item.name} × {item.quantity}
        </Text>
      ))}
      <Button title="Mark Ready" onPress={() => updateStatus('Ready')} />
    </View>
  );
}
