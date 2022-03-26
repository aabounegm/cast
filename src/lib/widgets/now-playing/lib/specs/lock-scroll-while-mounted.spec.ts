import { lockScrollWhileMounted } from '../lock-scroll-while-mounted';

it('sets the <body> overflow to hidden when executed', () => {
  expect(document.body.style.overflow).not.toBe('hidden');
  lockScrollWhileMounted();
  expect(document.body.style.overflow).toBe('hidden');
});

it('sets the <body> overflow to hidden on tear-down', () => {
  const tearDown = lockScrollWhileMounted();
  expect(document.body.style.overflow).toBe('hidden');
  tearDown();
  expect(document.body.style.overflow).not.toBe('hidden');
});
