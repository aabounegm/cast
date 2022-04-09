import '@testing-library/cypress/add-commands';
import expectPlayingAudio from './expect-playing-audio';
import visitAndWaitForHydration from './wait-for-hydration';
import login from './login';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      expectPlayingAudio: typeof expectPlayingAudio;
      visitAndWaitForHydration: typeof visitAndWaitForHydration;
      login: typeof login;
    }
  }
}

Cypress.Commands.add('expectPlayingAudio', expectPlayingAudio);

Cypress.Commands.add('visitAndWaitForHydration', visitAndWaitForHydration);

Cypress.Commands.add('login', login);
