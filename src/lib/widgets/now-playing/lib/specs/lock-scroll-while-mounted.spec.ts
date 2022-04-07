import { lockScrollWhileMounted } from '../lock-scroll-while-mounted';

it('sets the <body> overflow to hidden when executed', () => {
  expect(document.body).not.toHaveStyle({ overflow: 'hidden' });
  lockScrollWhileMounted();
  expect(document.body).toHaveStyle({ overflow: 'hidden' });
});

it('sets the <body> overflow to hidden on tear-down', () => {
  const tearDown = lockScrollWhileMounted();
  expect(document.body).toHaveStyle({ overflow: 'hidden' });
  tearDown();
  expect(document.body).not.toHaveStyle({ overflow: 'hidden' });
});
