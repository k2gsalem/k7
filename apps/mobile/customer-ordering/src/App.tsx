import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Amplify } from 'aws-amplify';
import awsExports from '@k7/amplify-config';
import * as Notifications from 'expo-notifications';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { HomeScreen } from './screens/HomeScreen';
import { OrderTrackingScreen } from './screens/OrderTrackingScreen';

Amplify.configure(awsExports);

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

export default function App() {
  useEffect(() => {
    Notifications.requestPermissionsAsync().catch(console.error);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
