import { user } from '../..';

it('conforms to the Svelte writable store contract', () => {
  expect(user.subscribe).toBeDefined();
  expect(user.set).toBeDefined();
});
