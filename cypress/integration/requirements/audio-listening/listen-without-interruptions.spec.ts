import { uid } from 'uid';

it('allows to navigate the application with no interruptions to playback', () => {
  cy.visitAndWaitForHydration('/');

  const audioElementID = uid();
  const pauseListener = cy.stub();
  cy.get('audio').then(function markAudio(audioElement) {
    // This is to make sure the <audio> element is not re-rendered
    audioElement.attr('id', audioElementID);
    // This is to make sure the audio playback is never paused
    audioElement.on('pause', pauseListener);
  });

  // Go to the first podcast's page
  cy.findAllByRole('article').first().click();
  // Play the first episode
  cy.findAllByRole('button', { name: 'Play' }).first().click();
  cy.expectPlayingAudio();
  // Go back to all podcasts
  cy.findByRole('link', { name: 'All podcasts' }).click();
  // Go to "Your Library"
  cy.findByRole('link', { name: 'Your Library' }).click();

  cy.get('audio').then(function checkAudioIsIntact(audioElement) {
    expect(audioElement.attr('id')).to.be.equal(audioElementID);
    expect(pauseListener).not.to.be.called;
  });
});
