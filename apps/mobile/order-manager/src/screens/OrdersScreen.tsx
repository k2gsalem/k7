import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface OrderSummary {
  id: string;
  customer: string;
  status: string;
}

export function OrdersScreen() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await API.get('OrdersService', '/orders', {});
      setOrders(response.items ?? []);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text>Incoming Orders</Text>
      {orders.map((order) => (
        <View key={order.id}>
          <Text>{order.customer}</Text>
          <Text>{order.status}</Text>
          <Button title="Details" onPress={() => navigation.navigate('OrderDetail', { orderId: order.id })} />
        </View>
      ))}
    </View>
  );
}
