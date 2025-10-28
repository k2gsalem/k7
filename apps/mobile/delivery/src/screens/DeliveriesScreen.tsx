import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface DeliverySummary {
  id: string;
  status: string;
  address: string;
}

export function DeliveriesScreen() {
  const [deliveries, setDeliveries] = useState<DeliverySummary[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await API.get('DeliveryService', '/deliveries', {});
      setDeliveries(result.items ?? []);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text>Assigned Deliveries</Text>
      {deliveries.map((delivery) => (
        <View key={delivery.id}>
          <Text>{delivery.address}</Text>
          <Text>{delivery.status}</Text>
          <Button title="Open" onPress={() => navigation.navigate('DeliveryDetail', { deliveryId: delivery.id })} />
        </View>
      ))}
    </View>
  );
}
