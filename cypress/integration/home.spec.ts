import exampleAudioURL from '../fixtures/example-audio-url.json';

describe('Home page', () => {
  beforeEach(() => {
    cy.visitAndWaitForHydration('/');
  });

  it('plays audio music by typing the link to an audio file', () => {
    cy.get('[data-cy="audio-fetch-form"]')
      .as('form')
      .get('[data-cy="audio-fetch-form"] input')
      .type(exampleAudioURL);
    cy.get('@form').get('button[type=submit]').click();
    // cy.expectPlayingAudio();
  });

  it('plays audio music by playing default sound', () => {
    cy.get('[data-cy="audio-fetch-form"]').get('button[type=button]').click();
    // cy.expectPlayingAudio();
  });
});
