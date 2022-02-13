const waitForHydration = () => {
  return cy.wrap<Promise<void>>(
    new Promise<void>((resolve) => {
      cy.window().then((win) => {
        win.addEventListener('sveltekit:start' as keyof WindowEventMap, () => resolve());
      });
    })
  );
};

export default waitForHydration;
