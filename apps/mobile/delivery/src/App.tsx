import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Amplify } from 'aws-amplify';
import awsExports from '@k7/amplify-config';
import { DeliveriesScreen } from './screens/DeliveriesScreen';
import { DeliveryDetailScreen } from './screens/DeliveryDetailScreen';

Amplify.configure(awsExports);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Deliveries" component={DeliveriesScreen} />
        <Stack.Screen name="DeliveryDetail" component={DeliveryDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
