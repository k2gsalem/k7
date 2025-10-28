import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'K7 Customer Ordering',
  slug: 'k7-customer-ordering',
  scheme: 'k7customer',
  runtimeVersion: '1.0.0',
  orientation: 'portrait',
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true
  },
  android: {
    package: 'com.k7.customer',
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
      backgroundColor: '#ffffff'
    }
  },
  extra: {
    amplifyRegion: 'us-east-1'
  }
});
