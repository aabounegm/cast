import '@testing-library/cypress/add-commands';
import expectPlayingAudio from './expect-playing-audio';
import waitForHydration from './wait-for-hydration';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      expectPlayingAudio(): Chainable<Element>;
      waitForHydration(): Chainable<Promise<void>>;
    }
  }
}

Cypress.Commands.add('expectPlayingAudio', () => {
  expectPlayingAudio();
});

Cypress.Commands.add('waitForHydration', () => {
  return waitForHydration();
});
