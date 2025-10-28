import { describe, expect, it } from 'vitest';
import type { Product } from './index';

describe('shared models', () => {
  it('allows creation of typed product', () => {
    const product: Product = {
      id: '1',
      name: 'Sample',
      price: 12,
      stock: 10,
      sku: 'SKU-1'
    };

    expect(product.name).toBe('Sample');
  });
});
