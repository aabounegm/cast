it('has a password to use', () => {
  const password: string = Cypress.env('testUserPassword');
  expect(password).to.be.a('string');
});
