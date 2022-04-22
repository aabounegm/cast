const visitAndWaitForHydration = (
  url: string,
  options?: Partial<Omit<Cypress.VisitOptions, 'onBeforeLoad'>>
) => {
  // TODO: see if we can replace all of this with `cy.waitFor('sveltekit:start')`
  return cy.wrap<Promise<void>>(
    new Promise<void>((resolve) => {
      cy.visit(url, {
        ...options,
        onBeforeLoad(win) {
          win.addEventListener('sveltekit:start', () => resolve());
        },
      });
    })
  );
};

export default visitAndWaitForHydration;
