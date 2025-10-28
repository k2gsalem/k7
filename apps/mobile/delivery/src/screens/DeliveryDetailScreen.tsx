import { RouteProp, useRoute } from '@react-navigation/native';
import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as Location from 'expo-location';

interface DeliveryDetail {
  id: string;
  status: string;
  address: string;
}

type DeliveryRoute = RouteProp<{ DeliveryDetail: { deliveryId: string } }, 'DeliveryDetail'>;

export function DeliveryDetailScreen() {
  const route = useRoute<DeliveryRoute>();
  const [delivery, setDelivery] = useState<DeliveryDetail | null>(null);

  useEffect(() => {
    async function loadDelivery() {
      const result = await API.get('DeliveryService', `/deliveries/${route.params.deliveryId}`, {});
      setDelivery(result as DeliveryDetail);
    }

    Location.requestForegroundPermissionsAsync().catch(console.error);
    loadDelivery().catch(console.error);
  }, [route.params.deliveryId]);

  async function updateStatus(status: string) {
    await API.patch('DeliveryService', `/deliveries/${route.params.deliveryId}`, {
      body: { status }
    });
    setDelivery((current) => (current ? { ...current, status } : current));
  }

  if (!delivery) {
    return <Text>Loading delivery...</Text>;
  }

  return (
    <View>
      <Text>{delivery.address}</Text>
      <Text>{delivery.status}</Text>
      <Button title="Picked Up" onPress={() => updateStatus('PickedUp')} />
      <Button title="Delivered" onPress={() => updateStatus('Delivered')} />
    </View>
  );
}
