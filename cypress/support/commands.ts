import '@testing-library/cypress/add-commands';
import expectPlayingAudio from './expect-playing-audio';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      expectPlayingAudio(): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('expectPlayingAudio', () => {
  expectPlayingAudio();
});
