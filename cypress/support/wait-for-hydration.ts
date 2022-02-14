const visitAndWaitForHydration = (
  url: string,
  options?: Partial<Omit<Cypress.VisitOptions, 'onBeforeLoad'>>
) => {
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
