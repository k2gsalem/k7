import { Amplify, API } from 'aws-amplify';
import awsExports from '@k7/amplify-config';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { CreditAccount } from '@k7/shared-models';

Amplify.configure(awsExports);

export default function App() {
  const [accounts, setAccounts] = useState<CreditAccount[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    API.get('CreditService', '/accounts', {}).then((response) => setAccounts(response.items ?? [])).catch(console.error);
  }, []);

  async function adjustLimit(account: CreditAccount, limit: number) {
    await API.patch('CreditService', `/accounts/${account.id}`, {
      body: { limit }
    });
    setAccounts((current) => current.map((item) => (item.id === account.id ? { ...item, limit } : item)));
  }

  const filtered = accounts.filter((account) => account.customerId.includes(search));

  return (
    <View>
      <Text>In-Store Credit</Text>
      <TextInput value={search} onChangeText={setSearch} placeholder="Search customer" />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.customerId}</Text>
            <Text>Balance: ${item.balance.toFixed(2)}</Text>
            <Button title="Increase Limit" onPress={() => adjustLimit(item, item.limit + 50)} />
          </View>
        )}
      />
    </View>
  );
}
