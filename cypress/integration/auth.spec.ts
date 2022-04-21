it('can log in with the test account', () => {
  cy.login();
  cy.visitAndWaitForHydration('/library');
  cy.findByText('Signed in as', { exact: false }).should('exist');
});
