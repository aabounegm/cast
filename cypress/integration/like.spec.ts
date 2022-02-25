it('likes an episode then finds it in the library', () => {
  cy.visitAndWaitForHydration('/podcasts/1');

  // Find a card and give it a name
  cy.get('[data-cy="episode-card"]').first().as('episodeCard');

  // Grab the episode title
  cy.get('@episodeCard')
    .get('[data-cy="episode-title"]')
    .first()
    .invoke('text')
    .then((title) => {
      expect(title).to.be.a('string');

      // Click the like button
      cy.get('@episodeCard').get('[data-cy="like-button"]').first().click();

      // Go to the library
      cy.visitAndWaitForHydration('/library');

      // Expect the episode title to be in the library
      cy.get('[data-cy="favorites-section"]').contains(title);
    });
});
