import { SvelteComponent, init, safe_not_equal as safeNotEqual } from 'svelte/internal';

/** A minimal Svelte component to use as a placeholder for mocking. */
export class MockComponent extends SvelteComponent {
  constructor(options: unknown) {
    super();
    init(this, options, null, null, safeNotEqual, {}, null, []);
  }
}
