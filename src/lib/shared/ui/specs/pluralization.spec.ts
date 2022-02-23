import { s } from '..';

it("doesn't add the -s suffix when the amount is 1", () => {
  expect(s(1)).toBe('');
});

it('works with negative numbers, pluralizing everything', () => {
  expect(s(-1)).toBe('s');
  expect(s(-5)).toBe('s');
  expect(s(-10)).toBe('s');
});

it('adds the -s suffix when the amount is not 1', () => {
  expect(s(0)).toBe('s');
  expect(s(2)).toBe('s');
  expect(s(5)).toBe('s');
  expect(s(10)).toBe('s');
});
