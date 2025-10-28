import { Amplify } from 'aws-amplify';
import awsExports from '@k7/amplify-config';
import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { Product, datastoreModels } from '@k7/shared-models';

Amplify.configure(awsExports);

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [draft, setDraft] = useState<Partial<Product>>({});

  useEffect(() => {
    const subscription = DataStore.observeQuery(datastoreModels.Product).subscribe(({ items }) => setProducts(items));
    return () => subscription.unsubscribe();
  }, []);

  async function saveProduct() {
    await DataStore.save({ ...draft, id: Date.now().toString() } as any);
    setDraft({});
  }

  return (
    <View>
      <Text>Catalog Management</Text>
      <TextInput
        placeholder="Name"
        value={draft.name ?? ''}
        onChangeText={(name) => setDraft((prev) => ({ ...prev, name }))}
      />
      <TextInput
        placeholder="Price"
        keyboardType="decimal-pad"
        value={draft.price?.toString() ?? ''}
        onChangeText={(price) => setDraft((prev) => ({ ...prev, price: Number(price) }))}
      />
      <Button title="Save" onPress={saveProduct} />
      <FlatList data={products} renderItem={({ item }) => <Text>{item.name}</Text>} keyExtractor={(item) => item.id} />
    </View>
  );
}
