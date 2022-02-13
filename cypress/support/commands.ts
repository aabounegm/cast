import '@testing-library/cypress/add-commands';
import expectPlayingAudio from './expect-playing-audio';
import waitForHydration from './wait-for-hydration';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      expectPlayingAudio: typeof expectPlayingAudio;
      visitAndWaitForHydration: typeof waitForHydration;
    }
  }
}

Cypress.Commands.add('expectPlayingAudio', expectPlayingAudio);

Cypress.Commands.add('visitAndWaitForHydration', waitForHydration);
