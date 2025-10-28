import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

interface CognitoUserSummary {
  username: string;
  email?: string;
  roles: string[];
}

export function UsersAdmin() {
  const [users, setUsers] = useState<CognitoUserSummary[]>([]);

  useEffect(() => {
    async function loadUsers() {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();
      const response = await fetch('/.amplify/admin/listUsers', {
        headers: {
          Authorization: token
        }
      });
      const data = (await response.json()) as CognitoUserSummary[];
      setUsers(data);
    }

    loadUsers().catch(console.error);
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.email ?? '—'}</td>
              <td>{user.roles.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
