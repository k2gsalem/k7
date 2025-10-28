import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

export function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    async function loadMenu() {
      const response = await API.get('CatalogService', '/public-menu', {});
      setItems(response.items ?? []);
    }

    loadMenu().catch(console.error);
  }, []);

  return (
    <main>
      <h1>Menu</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> — ${item.price.toFixed(2)}
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
