import { Amplify } from 'aws-amplify';
import { ResourcesConfig } from 'aws-amplify';

let configured = false;

export function configureAmplify(config: ResourcesConfig) {
  if (!configured) {
    Amplify.configure(config);
    configured = true;
  }
}
