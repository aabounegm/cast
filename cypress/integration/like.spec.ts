it('likes an episode then finds it in the library', () => {
  cy.visitAndWaitForHydration('/podcasts/1');

  // Find a card and give it a name
  cy.findAllByTestId('episode-card').first().as('episodeCard');

  // Grab the episode title
  cy.get('@episodeCard')
    .findByRole('heading', { level: 2 })
    .invoke('text')
    .then((title) => {
      // Click the like button
      cy.get('@episodeCard').findByTitle('like', { exact: false }).click();

      // Go to the library
      cy.visitAndWaitForHydration('/library');

      // Expect the episode title to be in the library
      cy.findByLabelText('favorites').contains(title);
    });
});
