import { describe, expect, it } from 'vitest';
import { amplifyExports } from './index';

describe('amplifyExports', () => {
  it('includes configured endpoints', () => {
    const names = amplifyExports.API.endpoints.map((endpoint) => endpoint.name);
    expect(names).toContain('OrdersService');
    expect(names).toContain('NotificationsService');
  });
});
