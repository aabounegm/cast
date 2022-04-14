it('does not expose tables outside the "public" schema', () => {
  cy.createSupabaseClient().then(async (supabase) => {
    const response = await supabase.from('users').select('*').limit(1).single();
    expect(response.status).to.be.gte(400).and.be.lessThan(500);
  });
});
