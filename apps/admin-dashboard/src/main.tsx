import React from 'react';
import ReactDOM from 'react-dom/client';
import { AmplifyProvider } from '@aws-amplify/ui-react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import awsExports from './providers/aws';
import { configureAmplify } from './providers/configureAmplify';

configureAmplify(awsExports);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AmplifyProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AmplifyProvider>
  </React.StrictMode>
);
