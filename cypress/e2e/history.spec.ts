describe('testing local listening history', () => {
  it('saves 4 entries to history', () => {
    cy.visitAndWaitForHydration('/podcasts/3');
    cy.get('button[title="Play"]').select([0, 1, 2, 3]).click();
    cy.visitAndWaitForHydration('/');
    cy.get('section').children('div').children('a').should('have.length', 4);
  });

  it('ensures no more than 6 entries are stored', () => {
    cy.visitAndWaitForHydration('/podcasts/3');
    cy.get('button[title="Play"]').click();
    cy.visitAndWaitForHydration('/');
    cy.get('section').children('div').children('a').should('have.length', 6);
  });
});
