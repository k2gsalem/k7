import { describe, expect, it } from 'vitest';
describe('shared models', () => {
    it('allows creation of typed product', () => {
        const product = {
            id: '1',
            name: 'Sample',
            price: 12,
            stock: 10,
            sku: 'SKU-1'
        };
        expect(product.name).toBe('Sample');
    });
});
