import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataStore } from '@aws-amplify/datastore';

export function useOfflineSync() {
  useEffect(() => {
    DataStore.start().catch(console.error);

    return () => {
      DataStore.clear().catch(console.error);
      AsyncStorage.clear().catch(console.error);
    };
  }, []);
}
