import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

interface UseCurrentUserState {
  roles: string[];
  isLoading: boolean;
}

export function useCurrentUser(): UseCurrentUserState {
  const [state, setState] = useState<UseCurrentUserState>({ roles: [], isLoading: true });

  useEffect(() => {
    async function loadUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const groups = user.signInUserSession.accessToken.payload['cognito:groups'] ?? [];
        setState({ roles: groups, isLoading: false });
      } catch (error) {
        console.error(error);
        setState({ roles: [], isLoading: false });
      }
    }

    loadUser().catch(console.error);
  }, []);

  return state;
}
