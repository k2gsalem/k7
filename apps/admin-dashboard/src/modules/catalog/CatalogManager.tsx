import { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import { z } from 'zod';
import { Product, datastoreModels } from '@k7/shared-models';

const catalogSchema = z.object({
  name: z.string().min(1),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  sku: z.string().min(1)
});

export function CatalogManager() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const subscription = DataStore.observeQuery(datastoreModels.Product).subscribe(({ items }) => {
      setProducts(items);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <h2>Catalog</h2>
      <p>Manage the product catalog, upload images, and sync changes in real-time.</p>
      <StorageManager
        accessLevel="protected"
        acceptedFileTypes={["image/*"]}
        path="catalog/"
        maxFileCount={5}
      />
      <section>
        <h3>Existing Products</h3>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong> — ${product.price.toFixed(2)} ({product.stock} in stock)
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Validation</h3>
        <pre>{catalogSchema.describe()}</pre>
      </section>
    </div>
  );
}
