describe('App', function () {
  it('renders App with correct footer', () => {
    cy.visit('/');

    cy.get('footer').should('contain', 'visit kit.svelte.dev to learn SvelteKit');
  });
});
