import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { CreditAccount } from '@k7/shared-models';

export function CreditManagement() {
  const [accounts, setAccounts] = useState<CreditAccount[]>([]);

  useEffect(() => {
    async function fetchAccounts() {
      const result = await API.get('CreditService', '/accounts', {});
      setAccounts(result.items ?? []);
    }

    fetchAccounts().catch(console.error);
  }, []);

  return (
    <div>
      <h2>Credit Management</h2>
      <p>Monitor in-store credit balances, configure limits, and trigger reminders.</p>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Balance</th>
            <th>Limit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.customerId}</td>
              <td>${account.balance.toFixed(2)}</td>
              <td>${account.limit.toFixed(2)}</td>
              <td>{account.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
