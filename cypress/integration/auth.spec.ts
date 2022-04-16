/* eslint-disable testing-library/prefer-screen-queries, testing-library/await-async-query  */
it('can log in with the test account', () => {
  cy.login();
  cy.visitAndWaitForHydration('/library');
  cy.findByText('Signed in as', { exact: false }).should('exist');
});
