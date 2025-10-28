import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { View, Text, Button, FlatList } from 'react-native';
import { Product, datastoreModels } from '@k7/shared-models';
import { useOfflineSync } from '../hooks/useOfflineSync';

type RootStackParamList = {
  Home: undefined;
  Checkout: undefined;
  OrderTracking: { orderId: string };
};

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [products, setProducts] = useState<Product[]>([]);

  useOfflineSync();

  useEffect(() => {
    const subscription = DataStore.observeQuery(datastoreModels.Product).subscribe(({ items }) => setProducts(items));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <View>
      <Text>Browse menu</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>${item.price.toFixed(2)}</Text>
            <Button title="Order" onPress={() => navigation.navigate('Checkout')} />
          </View>
        )}
      />
    </View>
  );
}
