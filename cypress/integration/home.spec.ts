import { constants } from '../fixtures';

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForHydration();
  });

  it('plays audio music by typing the link to an audio file', () => {
    cy.get('[data-cy="audio-fetch-form"]').as('form').get('input').type(constants.audio_example);
    cy.get('@form').get('button[type=submit]').click();
    cy.expectPlayingAudio();
  });

  it('plays audio music by playing default sound', () => {
    cy.get('[data-cy="audio-fetch-form"]').get('button[type=button]').click();
    cy.expectPlayingAudio();
  });
});
