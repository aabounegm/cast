it(
  'rejects logins with an incorrect password',
  {
    env: { testUserPassword: '7amada-bel-ganzabeel' },
  },
  () => {
    cy.login().then(async ([auth]) => {
      const { error } = await auth;
      expect(error).to.not.be.null;
    });
  }
);
