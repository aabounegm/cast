it('offers a way to sign out', () => {
  cy.login().then(() => {
    cy.visitAndWaitForHydration('/library');
    cy.findByRole('button', { name: 'Sign out' }).click();
    cy.findByRole('button', { name: 'Sign in with GitHub' }).then(() => {
      expect(localStorage.getItem('supabase.auth.token')).to.be.null;
    });
  });
});
