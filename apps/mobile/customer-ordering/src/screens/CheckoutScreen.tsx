import { API } from 'aws-amplify';
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export function CheckoutScreen() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  async function submitOrder() {
    const response = await API.post('OrdersService', '/orders', {
      body: { name }
    });
    setStatus(response.message ?? 'Order placed!');
  }

  return (
    <View>
      <Text>Checkout</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Your name" />
      <Button title="Submit" onPress={submitOrder} />
      {status ? <Text>{status}</Text> : null}
    </View>
  );
}
