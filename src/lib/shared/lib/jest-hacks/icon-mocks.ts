import { SvelteComponent, init, safe_not_equal as safeNotEqual } from 'svelte/internal';

/** A minimal Svelte component to use as a placeholder for mocking. */
class MockComponent extends SvelteComponent {
  constructor(options: unknown) {
    super();
    init(this, options, null, null, safeNotEqual, {}, null, []);
  }
}

jest.mock('~icons/ic/round-arrow-back', () => ({ default: MockComponent }), {
  virtual: true,
});
jest.mock('~icons/ic/round-play-arrow', () => ({ default: MockComponent }), { virtual: true });
jest.mock('~icons/ic/round-pause', () => ({ default: MockComponent }), { virtual: true });
jest.mock('~icons/ic/round-replay-10', () => ({ default: MockComponent }), { virtual: true });
jest.mock('~icons/ic/round-forward-30', () => ({ default: MockComponent }), { virtual: true });
jest.mock('~icons/ic/sharp-favorite', () => ({ default: MockComponent }), { virtual: true });
jest.mock('~icons/ic/twotone-favorite', () => ({ default: MockComponent }), { virtual: true });
jest.mock('~icons/ic/twotone-subtitles', () => ({ default: MockComponent }), {
  virtual: true,
});
jest.mock('~icons/ic/twotone-subtitles-off', () => ({ default: MockComponent }), {
  virtual: true,
});
jest.mock('~icons/ic/twotone-file-download-done', () => ({ default: MockComponent }), {
  virtual: true,
});
jest.mock('~icons/ic/round-keyboard-arrow-down', () => ({ default: MockComponent }), {
  virtual: true,
});
