import { useState } from 'react';
import { API } from 'aws-amplify';

interface CheckoutForm {
  name: string;
  email: string;
  total: number;
}

const defaultForm: CheckoutForm = {
  name: '',
  email: '',
  total: 0
};

export function CheckoutPage() {
  const [form, setForm] = useState(defaultForm);
  const [status, setStatus] = useState<string | null>(null);

  async function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await API.post('OrdersService', '/orders', {
      body: form
    });
    setStatus(response.message ?? 'Order placed!');
  }

  return (
    <main>
      <h1>Checkout</h1>
      <form onSubmit={submitOrder}>
        <label>
          Name
          <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        </label>
        <label>
          Email
          <input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        </label>
        <label>
          Total
          <input
            type="number"
            value={form.total}
            onChange={(event) => setForm({ ...form, total: Number(event.target.value) })}
          />
        </label>
        <button type="submit">Pay &amp; Place Order</button>
      </form>
      {status && <p>{status}</p>}
    </main>
  );
}
